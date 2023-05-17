/**
 * @see https://docs.looksrare.org/developers/protocol/order-types-v2
 */

import { PROTOCOL_ID } from "..";
import { ASSET_TYPE, AssetInOut } from "../../types";
import { LooksRareV2MakerOrder } from "../../types/looksrare-v2";
import { Domain, EIP712Protocol, VisualizationResult } from "../../types/visualizer";
import { WizardError, getPaymentAssetType } from "../../utils";

const { ERC1155, ERC721 } = ASSET_TYPE;

export const isCorrectDomain = (domain: Domain) => {
  return (
    supportedChains.includes(Number(domain.chainId)) &&
    addressesBook.includes(domain.verifyingContract.toLocaleLowerCase())
  );
};

export const visualize = (
  message: LooksRareV2MakerOrder,
  domain: Domain
): VisualizationResult => {
  if (!isCorrectDomain(domain)) throw new Error("wrong looksrare-v2 domain");

  const strategyId = Number(message.strategyId);
  if (strategyId > 2)
    throw new WizardError(`unknown looksrare-v2 strategy with ID: ${message.strategyId}`);

  const nftAssets: AssetInOut[] = message.amounts.map((amount, index) => {
    const item: AssetInOut = {
      address: message.collection,
      type: Number(message.collectionType) === 0 ? ERC721 : ERC1155,
      id: message.itemIds[index],
      amounts: [amount.toString()],
    };

    // If it's a collection offer, remove tokenId
    if (strategyId !== 0) delete item.id;
    return item;
  });

  // insure tape safety if case param passed as string ("0" or "1")
  // Whether the order is an ask (sending a passive order to sell a NFT) or a bid (sending a passive order to buy an NFT).
  const isOrderAsk = Number(message.quoteType) === 1;

  const paymentAsset: AssetInOut = {
    address: message.currency,
    type: getPaymentAssetType(message.currency),
    amounts: [message.price],
  };

  return {
    protocol: PROTOCOL_ID.LOOKSRARE_EXCHANGE_V2,
    // If order is an ask, user is selling an NFT for an asset in return
    assetsIn: isOrderAsk ? [paymentAsset] : nftAssets,
    assetsOut: isOrderAsk ? nftAssets : [paymentAsset],
    liveness: {
      from: Number(message.startTime) * 1000,
      to: Number(message.endTime) * 1000,
    },
    approvals: [],
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
  "0x0000000000E655fAe4d56241588680F86E3b2377", // Mainnet Exchange
  "0x35C2215F2FFe8917B06454eEEaba189877F200cf", // Goerli Exchange
].map((e) => e.toLocaleLowerCase());

const looksrare: EIP712Protocol<LooksRareV2MakerOrder> = {
  isCorrectDomain,
  visualize,
};
export default looksrare;
