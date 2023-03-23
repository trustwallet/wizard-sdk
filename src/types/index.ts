import { PROTOCOL_ID } from "../visualizer";

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
  protocol: PROTOCOL_ID;
  liveness?: Liveness;
  assetIn: AssetInOut[];
  assetOut: AssetInOut[];
  approval?: Approval[];
};

export type Protocol<T> = {
  /**
   * @param {T} message EIP-712 message
   * @param {Domain} domain EIP-712 domain
   * @returns {Result} assets impact and message liveness
   * @throws {Error}
   */
  visualize: (message: T, domain: Domain) => Result;
  isCorrectDomain: (domain: Domain) => boolean;
};
