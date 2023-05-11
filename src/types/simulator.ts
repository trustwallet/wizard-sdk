import { Asset } from ".";

export type SimulationParams = {
  from: string;
  to: string;
  calldata: string;
  gas: number;
  value?: string;
  chainId: number;
};

type DebugCallTracerWithLogsCall = {
  type: "CALL" | "STATICALL";
  from: string;
  to: string;
  value: string;
  gas: string;
  gasUsed: string;
  input: string;
  output: string;
  error?: string;
  logs?: {
    address: string;
    topics: string[];
    data: string;
  }[];
};

type DebugCallTracerWithLog = {
  calls: DebugCallTracerWithLog[];
} & DebugCallTracerWithLogsCall;

export type DebugCallTracerWithLogs = DebugCallTracerWithLog[];

export type Approval = {
  owner: string;
  operator: string;
  amounts?: string[];
  approveForAllStatus?: boolean;
} & Asset;

export type Transfer = {
  from: string;
  to: string;
  amounts?: string[];
  operator?: string;
} & Asset;

export type AssetsTransfersAndApprovalsRes = {
  transfers: Transfer[];
  approvals: Approval[];
};

export type DebugProvider = {
  debugTrace: (input: SimulationParams) => Promise<DebugCallTracerWithLogs>;
  chainId: number;
};
