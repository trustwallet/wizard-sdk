export * as blurTypes from "./blur";
export * as looksrareTypes from "./looksrare";
export * as seaportTypes from "./seaport";

export enum ASSET_TYPE {
  NATIVE = "NATIVE",
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

export type Domain = {
  verifyingContract: string;
  name: string;
  chainId: string;
  version: string;
};

export type Asset = {
  address: string;
  type: ASSET_TYPE;
  id?: string;
  amount?: string;
};

export type AssetInOut = {
  amounts: string[];
} & Asset;

type Liveness = {
  from: number;
  to: number;
};

type Approval = {
  amounts: string[];
  operator: string;
  owner: string;
  deadline?: number;
} & Asset;

export type Result = {
  protocol: string;
  liveness?: Liveness;
  assetIn: AssetInOut[];
  assetOut: AssetInOut[];
  approval?: Approval[];
};
