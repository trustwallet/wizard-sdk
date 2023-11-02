/**
 * @see https://github.com/rarible/sdk/blob/a04dd75832a7110a91371afc8721b034d5b35dea/packages/ethereum/sdk/src/order/eip712.ts
 */

export type RaribleV2AssetType = {
  // asset class id, which is a hash value
  assetClass: string;
  // this may include the token address and token id
  data: string;
};

export type RaribleV2Asset = {
  assetType: RaribleV2AssetType;
  // amount of the asset
  value: string;
};

export type RaribleV2Order = {
  // address of the maker
  maker: string;
  // asset to be sold
  makeAsset: RaribleV2Asset;
  // address of the taker
  taker: string;
  // asset to be bought
  takeAsset: RaribleV2Asset;
  // random value to identify order
  salt: number;
  // asset auction's start time
  start: number;
  // asset auction's end time
  end: number;
  dataType: string;
  data: string;
};
