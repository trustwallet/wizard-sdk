import { PROTOCOL_ID } from "..";
import { ASSET_TYPE, AssetInOut } from "../../types";
import { OneInchFusionOrder } from "../../types/oneinch";
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
  message: OneInchFusionOrder,
  domain: Domain
): VisualizationResult => {
  /** Verifies the domain of the oneinch limit order */
  if (!isCorrectDomain(domain)) throw new Error("wrong oneinch domain");

  /** Returns the ERC6865 format of the order */
  return {
    protocol: PROTOCOL_ID.ONEINCH_FUSION,
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
  "0x1111111254eeb25477b68fb85ed929f73a960582", // Consistent address for all chains
].map((e) => e.toLocaleLowerCase());

const oneinch: EIP712Protocol<OneInchFusionOrder> = {
  isCorrectDomain,
  visualize,
};
export default oneinch;
