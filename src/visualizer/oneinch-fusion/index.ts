import { Domain, EIP712Protocol, VisualizationResult } from "../../types/visualizer";
import { OneinchFusionOrder } from "../../types/oneinch-fusion";
import { PROTOCOL_ID } from "..";
import { ASSET_TYPE, AssetInOut } from "../../types";
import { ZERO_ADDRESS, getPaymentAssetType } from "../../utils";
import { getAuctionTime } from "./getAuctionTime";

const { NATIVE } = ASSET_TYPE;

// @see https://github.com/1inch/fusion-sdk/blob/4b76e9c232276742f879f3495e452dfc667b5a3a/src/constants.ts#L50
export const ONEINCH_FUSION_VERIFYING_CONTRACT =
  "0x1111111254eeb25477b68fb85ed929f73a960582";

// @see https://github.com/1inch/fusion-sdk/blob/4b76e9c232276742f879f3495e452dfc667b5a3a/src/constants.ts#L6-L15
export const ONEINCH_FUSION_SUPPORTED_CHAINS = [
  1, //Ethereum
  137, //Polygon
  56, //Binance
  42161, //Arbitrum One
  43114, //Avalanche C-Chain
  10, //Optimism
  250, //Fantom
  100, //Gnosis
];

export const isCorrectDomain = (domain: Domain) => {
  return (
    ONEINCH_FUSION_SUPPORTED_CHAINS.includes(Number(domain.chainId)) &&
    addressesBook.includes(domain.verifyingContract.toLocaleLowerCase())
  );
};

export const visualize = (
  message: OneinchFusionOrder,
  domain: Domain
): VisualizationResult => {
  if (!isCorrectDomain(domain)) throw new Error("wrong 1inch-fusion domain");

  const makerAssetType = getPaymentAssetType(message.makerAsset);
  const assetsIn: AssetInOut[] = [
    {
      address: makerAssetType === NATIVE ? ZERO_ADDRESS : message.makerAsset,
      type: makerAssetType,
      amounts: [message.makingAmount],
    },
  ];

  const takerAssetType = getPaymentAssetType(message.takerAsset);
  const assetsOut: AssetInOut[] = [
    {
      address: takerAssetType === NATIVE ? ZERO_ADDRESS : message.takerAsset,
      type: takerAssetType,
      amounts: [message.takingAmount],
    },
  ];

  const { startTime, endTime } = getAuctionTime(message.salt);

  return {
    protocol: PROTOCOL_ID.ONEINCH_FUSION,
    assetsIn,
    assetsOut,
    liveness: {
      from: startTime,
      to: endTime,
    },
    approvals: [],
  };
};

const addressesBook = [ONEINCH_FUSION_VERIFYING_CONTRACT].map((e) =>
  e.toLocaleLowerCase()
);

const oneinchFusion: EIP712Protocol<OneinchFusionOrder> = {
  isCorrectDomain,
  visualize,
};
export default oneinchFusion;
