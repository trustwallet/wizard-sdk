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
 * @see https://github.com/1inch/fusion-sdk/blob/main/src/constants.ts
 */
const supportedChains = [
  1, // Ethereum Mainnet
  137, // Polygon
  56, // Binance Smart Chain
  42161, // Arbitrum
  43114, // Avalanche
  10, // Optimism
  250, // Fantom
  100, // Gnosis
];

/**
 * @see https://github.com/1inch/fusion-sdk/blob/main/src/constants.ts
 */
const addressesBook = [
  "0xa88800cd213da5ae406ce248380802bd53b47647", // Ethereum Mainnet Settlement
  "0x1d0ae300eec4093cee4367c00b228d10a5c7ac63", // Binance Smart Chain Settlement
  "0x1e8ae092651e7b14e4d0f93611267c5be19b8b9f", // Polygon Settlement
  "0x4bc3e539aaa5b18a82f6cd88dc9ab0e113c63377", // Arbitrum Settlement
  "0x7731f8df999a9441ae10519617c24568dc82f697", // Avalanche Settlement
  "0xd89adc20c400b6c45086a7f6ab2dca19745b89c2", // Optimism Settlement
  "0xa218543cc21ee9388fa1e509f950fd127ca82155", // Fantom Settlement
  "0xcbdb7490968d4dbf183c60fc899c2e9fbd445308", // Gnosis Settlement
].map((e) => e.toLocaleLowerCase());

const looksrare: EIP712Protocol<LooksRareV2MakerOrder> = {
  isCorrectDomain,
  visualize,
};
export default looksrare;
