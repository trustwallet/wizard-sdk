import { Asset, AssetInOut } from ".";
import { PROTOCOL_ID } from "../visualizer";

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

export type Domain = {
  verifyingContract: string;
  name: string;
  chainId: string;
  version: string;
};

export type VisualizationResult = {
  protocol: PROTOCOL_ID;
  liveness?: Liveness;
  assetsIn: AssetInOut[];
  assetsOut: AssetInOut[];
  approval: Approval[];
};

export type EIP712Protocol<T> = {
  /**
   * @param {T} message EIP-712 message
   * @param {Domain} domain EIP-712 domain
   * @returns {VisualizationResult} assets impact and message liveness
   * @throws {Error}
   */
  visualize: (message: T, domain: Domain) => VisualizationResult;
  isCorrectDomain: (domain: Domain) => boolean;
};
