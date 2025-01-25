import { BytesLike } from "ethers";

export type AssetType = {
  assetClass: string;
  data: BytesLike;
};
export type Asset = {
  assetType: AssetType;
  value: string;
};

export type RaribleOrder = {
  maker: string;
  makeAsset: Asset;
  taker: string;
  takeAsset: Asset;
  start: string;
  end: string;
  salt: string;
  dataType: string;
  data: BytesLike;
};
