import { BytesLike } from "ethers";

export type AssetType = {
  assetClass: string;
  data: BytesLike;
};
export type Asset = {
  assetType: AssetType;
  value: number;
};

export type RaribleOrder = {
  maker: string;
  makeAsset: Asset;
  taker: string;
  takeAsset: Asset;
  start: number;
  end: number;
  salt: number;
  dataType: string;
  data: BytesLike;
};
