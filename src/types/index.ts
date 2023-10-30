export * as blurTypes from "./blur";
export * as looksrareTypes from "./looksrare";
export * as seaportTypes from "./seaport";
export * as visualizer from "./visualizer";
export * as oneinchFusionTypes from "./oneinch-fusion";

export enum ASSET_TYPE {
  NATIVE = "NATIVE",
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

export type Asset = {
  address: string;
  type: ASSET_TYPE;
  id?: string;
};

export type AssetInOut = {
  amounts: string[];
} & Asset;

export type PermitMessage = {
  owner?: string;
  holder?: string;
  spender: string;
  nonce: string;
  value?: string;
  deadline?: string;
  expiry?: string;
  allowed?: boolean | string;
};
