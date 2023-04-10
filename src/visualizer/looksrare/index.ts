/**
 * @see https://docs.looksrare.org/developers/maker-orders
 */

import { PROTOCOL_ID } from "..";
import { ASSET_TYPE, AssetInOut } from "../../types";
import { LooksrareMakerOrderWithEncodedParams, STRATEGY } from "../../types/looksrare";
import { Domain, EIP712Protocol, VisualizationResult } from "../../types/visualizer";
import { abiCoder, getPaymentAssetType } from "../../utils";
import { strategiesLookup } from "./const";

const { ERC1155, ERC721 } = ASSET_TYPE;

export const isCorrectDomain = (domain: Domain) => {
  return (
    supportedChains.includes(Number(domain.chainId)) &&
    addressesBook.includes(domain.verifyingContract.toLocaleLowerCase())
  );
};

export const visualize = (
  message: LooksrareMakerOrderWithEncodedParams,
  domain: Domain
): VisualizationResult => {
  if (!isCorrectDomain(domain)) throw new Error("wrong looksrare domain");

  const strategy = getExecutionStrategy(message.strategy);
  if (strategy === STRATEGY.UNKNOWN)
    throw new Error(`unknown looksrare strategy ${message.strategy}`);

  const nftAsset: AssetInOut = {
    address: message.collection,
    type: message.amount === "1" ? ERC721 : ERC1155,
    id: message.tokenId,
    amounts: [message.amount],
  };

  // remove tokenId if strategy is collection bid
  if (strategy === STRATEGY.FIXED_PRICE_COLLECTION) delete nftAsset.id;

  // insure tape safety if case param passed as Boolean
  // Whether the order is an ask (sending a passive order to sell a NFT) or a bid (sending a passive order to buy an NFT).
  const isOrderAsk = message.isOrderAsk.toString() === "true";

  // if it's an ask order(listing), we calculate the minimum amount that user could get {Min((amount - fees),minAmount)}
  const minPrice = isOrderAsk
    ? (
        (BigInt(message.price) * BigInt(message.minPercentageToAsk)) /
        BigInt(10_000)
      ).toString()
    : message.price;

  const paymentAsset: AssetInOut = {
    address: message.currency,
    type: getPaymentAssetType(message.currency),
    amounts: [minPrice],
  };

  /**
   * @dev there's a restriction at contract level to prevent the opposite way where the bid is that in dutch auction fashion which make sense
   * @see https://etherscan.io/address/0x3E80795Cae5Ee215EBbDf518689467Bf4243BAe0#code#L302
   */
  if (strategy === STRATEGY.AUCTION_DUTCH && isOrderAsk) {
    let startPrice = abiCoder.decode(["uint256"], message.params)[0] as bigint;

    // if it's an ask order(listing), we calculate the minimum amount that user could get {Min((amount - fees),minAmount)}
    startPrice = (startPrice * BigInt(message.minPercentageToAsk)) / BigInt(10_000);
    paymentAsset.amounts.push(startPrice.toString());
  }

  return {
    protocol: PROTOCOL_ID.LOOKSRARE_EXCHANGE,
    // If order is an ask, user is selling an NFT for an asset in return
    assetsIn: [isOrderAsk ? paymentAsset : nftAsset],
    assetsOut: [isOrderAsk ? nftAsset : paymentAsset],
    liveness: {
      from: Number(message.startTime) * 1000,
      to: Number(message.endTime) * 1000,
    },
    approval: [],
  };
};

/**
 * @see https://docs.looksrare.org/developers/deployed-contract-addresses
 */
const supportedChains = [
  1, //Ethereum
  5, //Goerli
];

/**
 * @see https://docs.looksrare.org/developers/deployed-contract-addresses
 */
const addressesBook = [
  "0x59728544B08AB483533076417FbBB2fD0B17CE3a", // Mainnet Exchange
  "0xD112466471b5438C1ca2D218694200e49d81D047", // Goerli Exchange
].map((e) => e.toLocaleLowerCase());

const getExecutionStrategy = (strategyAddress: string): STRATEGY => {
  return strategiesLookup[strategyAddress.toLocaleLowerCase()] || STRATEGY.UNKNOWN;
};

const looksrare: EIP712Protocol<LooksrareMakerOrderWithEncodedParams> = {
  isCorrectDomain,
  visualize,
};
export default looksrare;
