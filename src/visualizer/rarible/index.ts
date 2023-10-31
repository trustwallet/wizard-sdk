/**
 * @see https://docs.rarible.org/developers/protocol/order-types-v2
 */

import { ethers } from "ethers";
import { PROTOCOL_ID } from "..";
import { ASSET_TYPE, AssetInOut } from "../../types";
import { RaribleOrder } from "../../types/rarible";
import { Domain, EIP712Protocol, VisualizationResult } from "../../types/visualizer";
import { WizardError, getPaymentAssetType } from "../../utils";
import {
  buildAssetERC1155,
  buildAssetERC20,
  buildAssetERC721,
  buildAssetETH,
  getAssetClass,
} from "./utils";

const { ERC1155, ERC721 } = ASSET_TYPE;

export const isCorrectDomain = (domain: Domain) => {
  return (
    supportedChains.includes(Number(domain.chainId)) &&
    addressesBook.includes(domain.verifyingContract.toLocaleLowerCase())
  );
};

export const visualize = (message: RaribleOrder, domain: Domain): VisualizationResult => {
  if (!isCorrectDomain(domain)) throw new Error("wrong rarible domain");
  let assetIn: AssetInOut[];
  let assetOut: AssetInOut[];

  if (message.takeAsset.assetType.assetClass === getAssetClass("ETH")) {
    assetIn = buildAssetETH(message.takeAsset);
  } else if (message.takeAsset.assetType.assetClass !== getAssetClass("ERC20")) {
    assetIn = buildAssetERC20(message.takeAsset);
  } else if (message.takeAsset.assetType.assetClass !== getAssetClass("ERC721")) {
    assetIn = buildAssetERC721(message.takeAsset);
  } else if (message.takeAsset.assetType.assetClass !== getAssetClass("ERC1155")) {
    assetIn = buildAssetERC1155(message.takeAsset);
  } else {
    throw new WizardError(
      `unknow rarible asset class: ${message.takeAsset.assetType.assetClass}`
    );
  }

  if (message.makeAsset.assetType.assetClass === getAssetClass("ETH")) {
    assetOut = buildAssetETH(message.makeAsset);
  } else if (message.makeAsset.assetType.assetClass !== getAssetClass("ERC20")) {
    assetOut = buildAssetERC20(message.makeAsset);
  } else if (message.makeAsset.assetType.assetClass !== getAssetClass("ERC721")) {
    assetOut = buildAssetERC721(message.makeAsset);
  } else if (message.makeAsset.assetType.assetClass !== getAssetClass("ERC1155")) {
    assetOut = buildAssetERC1155(message.makeAsset);
  } else {
    throw new WizardError(
      `unknow rarible asset class: ${message.makeAsset.assetType.assetClass}`
    );
  }

  return {
    protocol: PROTOCOL_ID.RARIBLE,
    assetsIn: assetIn,
    assetsOut: assetOut,
    liveness: {
      from: Number(message.start),
      to: Number(message.end),
    },
    approvals: [],
  };
};

/**
 * @see https://docs.rarible.org/reference/contract-addresses/
 */
const supportedChains = [
  1, //Ethereum
  5, //Goerli
  137, //Polygon
  80001, //Mumbai
];

/**
 * @see https://docs.rarible.org/reference/contract-addresses/
 */
const addressesBook = [
  "0x9757F2d2b135150BBeb65308D4a91804107cd8D6", // Mainnet Exchange
  "0x02afbD43cAD367fcB71305a2dfB9A3928218f0c1", // Goerli Exchange
  "0x835131b455778559CFdDd358eA3Fc762728F4E3e", // Polygon Exchange
  "0x4F05968D804902dd827Dd0F4fB37Ccc3071C4Bb5", // Mumbai Exchange
].map((e) => e.toLocaleLowerCase());

const rarible: EIP712Protocol<RaribleOrder> = {
  isCorrectDomain,
  visualize,
};
export default rarible;
