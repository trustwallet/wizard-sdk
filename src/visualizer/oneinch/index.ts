import { PROTOCOL_ID } from "..";
import { ASSET_TYPE, AssetInOut } from "../../types";
import { OneInchFusionOrderV3 } from "../../types/oneinch";
import { Domain, EIP712Protocol, VisualizationResult } from "../../types/visualizer";
import { WizardError, ZERO_ADDRESS, getPaymentAssetType } from "../../utils";
import { getAuctionEndTime, getAuctionStartTime } from "./utils";

export const isCorrectDomain = (domain: Domain) => {
  return (
    supportedChains.includes(Number(domain.chainId)) &&
    addressesBook.includes(domain.verifyingContract.toLocaleLowerCase())
  );
};

/**
 *
 * @param message The decoded message of the oneinch limit order to be visualized
 * @param domain Domain of the oneinch limit order
 * @returns Returns the visualization result in the ERC6865 format
 */
export const visualize = (
  message: OneInchFusionOrderV3,
  domain: Domain
): VisualizationResult => {
  /** Verifies the domain of the oneinch limit order */
  if (!isCorrectDomain(domain)) throw new Error("wrong oneinch domain");

  /** Returns the ERC6865 format of the order */
  return {
    protocol: PROTOCOL_ID.ONE_INCH_FUSION,
    assetsIn: [
      {
        address: message.takerAsset,
        type: message.takerAsset == ZERO_ADDRESS ? ASSET_TYPE.NATIVE : ASSET_TYPE.ERC20,
        amounts: [message.takingAmount],
      },
    ],
    assetsOut: [
      {
        address: message.makerAsset,
        type: message.makerAsset == ZERO_ADDRESS ? ASSET_TYPE.NATIVE : ASSET_TYPE.ERC20,
        amounts: [message.makingAmount],
      },
    ],
    liveness: {
      from: Number(getAuctionStartTime(message.salt)),
      to: Number(getAuctionEndTime(message.salt)),
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
  "0xa88800cd213da5ae406ce248380802bd53b47647", // Ethereum Mainnet LimitOrderProtocol
  "0x1d0ae300eec4093cee4367c00b228d10a5c7ac63", // Binance Smart Chain LimitOrderProtocol
  "0x1e8ae092651e7b14e4d0f93611267c5be19b8b9f", // Polygon LimitOrderProtocol
  "0x4bc3e539aaa5b18a82f6cd88dc9ab0e113c63377", // Arbitrum LimitOrderProtocol
  "0x7731f8df999a9441ae10519617c24568dc82f697", // Avalanche LimitOrderProtocol
  "0xd89adc20c400b6c45086a7f6ab2dca19745b89c2", // Optimism LimitOrderProtocol
  "0xa218543cc21ee9388fa1e509f950fd127ca82155", // Fantom LimitOrderProtocol
  "0xcbdb7490968d4dbf183c60fc899c2e9fbd445308", // Gnosis LimitOrderProtocol
].map((e) => e.toLocaleLowerCase());

const oneinch: EIP712Protocol<OneInchFusionOrderV3> = {
  isCorrectDomain,
  visualize,
};
export default oneinch;
