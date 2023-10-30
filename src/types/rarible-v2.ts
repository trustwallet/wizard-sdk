/**
 * @see https://github.com/rarible/sdk/blob/a04dd75832a7110a91371afc8721b034d5b35dea/packages/ethereum/sdk/src/order/eip712.ts
 */

export type RaribleV2AssetType = {
  assetClass: string;
  data: string;
};

export type RaribleV2Asset = {
  assetType: RaribleV2AssetType;
  value: string;
};

export type RaribleV2Order = {
  maker: string;
  makeAsset: RaribleV2Asset;
  taker: string;
  takeAsset: RaribleV2Asset;
  salt: number;
  start: number;
  end: number;
  dataType: string;
  data: string;
};
