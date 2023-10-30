import { Domain, EIP712Protocol, VisualizationResult } from "../../types/visualizer";
import { RaribleV2Order } from "../../types/rarible-v2";
import { PROTOCOL_ID } from "..";
import { AssetInOut } from "../../types";
import { decodeAssetType } from "./decodeAssetType";

export const RARIBLE_EXCHANGE_V2_CONTRACTS = {
  1: "0x9757F2d2b135150BBeb65308D4a91804107cd8D6", //Ethereum
  137: "0x12b3897a36fDB436ddE2788C06Eff0ffD997066e", //Polygon
};

export const RARIBLE_SUPPORTED_CHAINS = Object.keys(RARIBLE_EXCHANGE_V2_CONTRACTS).map(
  Number
);

export const isCorrectDomain = (domain: Domain) => {
  const verifyingContracts = RARIBLE_EXCHANGE_V2_CONTRACTS as Record<string, string>;

  return (
    RARIBLE_SUPPORTED_CHAINS.includes(Number(domain.chainId)) &&
    verifyingContracts[domain.chainId] !== undefined &&
    verifyingContracts[domain.chainId].toLocaleLowerCase() ===
      domain.verifyingContract.toLocaleLowerCase()
  );
};

export const visualize = (
  message: RaribleV2Order,
  domain: Domain
): VisualizationResult => {
  if (!isCorrectDomain(domain)) throw new Error("wrong rarible-v2 domain");

  const makeAsset = decodeAssetType(message.makeAsset.assetType);
  const assetsIn: AssetInOut[] = [
    {
      ...makeAsset,
      amounts: [message.makeAsset.value.toString()],
    },
  ];

  const takeAsset = decodeAssetType(message.takeAsset.assetType);
  const assetsOut: AssetInOut[] = [
    {
      ...takeAsset,
      amounts: [message.takeAsset.value.toString()],
    },
  ];

  return {
    protocol: PROTOCOL_ID.RARIBLE_EXCHANGE_V2,
    assetsIn,
    assetsOut,
    liveness: {
      from: message.start * 1000,
      to: message.end * 1000,
    },
    approvals: [],
  };
};

const raribleV2: EIP712Protocol<RaribleV2Order> = {
  isCorrectDomain,
  visualize,
};
export default raribleV2;
