import { DebugCallTracerWithLogs, DebugProvider } from "../../types/simulator";
import axios from "axios";
import { WizardError } from "../../utils";

type CallTracerParams = {
  from: string;
  to: string;
  value: string;
  data: string;
  gas: string;
};

const baseURLs: { [chainId: number]: string } = {};

export const nodeRealFactory = (apiKey: string, chainId: number): DebugProvider => {
  if (chainId !== 1 && chainId !== 56) {
    throw new Error(`NodeReal: unsupported chainId: ${chainId}`);
  }

  baseURLs[chainId] = getBaseURL(chainId, apiKey);
  return {
    chainId,
    debugTrace: (input) =>
      callTracer(
        {
          from: input.from,
          to: input.to,
          data: input.calldata,
          value: input.value || "0x0",
          gas: `0x${input.gas.toString(16)}`,
        },
        baseURLs[chainId]
      ),
  };
};

/**
 *
 * @param {string} param.from sender of transaction, most oif the time this is an EOA (wallet)
 * @param {string} param.to receiver of transaction, most of the time this is a protocol smart contract
 * @param {hexString} param.value  ETH value encoded as hexadecimal string
 * @param {hexString} param.data transaction calldata encoded as hexadecimal string
 * @returns {DebugCallTracerWithLogs} debugCallTracerWithLogs
 * @see https://geth.ethereum.org/docs/developers/evm-tracing/built-in-tracers#config to understand better the tracers config
 * @see
 */
async function callTracer(
  { from, to, value, data, gas }: CallTracerParams,
  baseURL: string
): Promise<DebugCallTracerWithLogs> {
  const res = await axios.post(baseURL, {
    id: 1,
    jsonrpc: "2.0",
    method: "debug_traceCall",
    params: [
      {
        from,
        to,
        value,
        data,
        gas,
      },
      /**
       * @dev ethereum commitment tags: latest | safe | finalized | earliest | pending
       *      earliest ≤ finalized ≤ safe ≤ latest ≤ pending
       * @see https://docs.alchemy.com/reference/ethereum-developer-guide-to-the-merge#what-are-safe-and-finalized
       */
      "latest",
      {
        /**
         * @dev callTracer accepts two options
         *      - onlyTopCall: true instructs the tracer to only process the main (top-level) call and none of the sub-calls.
         *      This avoids extra processing for each call frame if only the top-level call info are required.
         *      - withLog: true instructs the tracer to also collect the logs emitted during each call.
         */
        tracer: "callTracer",
        tracerConfig: {
          withLog: true,
        },
      },
    ],
  });

  if (!res.data.result) {
    const errorCode = res.data?.error?.code;
    const message = res.data?.error?.message;
    throw new WizardError(
      `NodeReal: simulation failed with code error: ${errorCode} and message: ${message}`
    );
  }

  /// @dev returned as an array to keep same pattern with internal call facilitate recursive processing
  return [res.data.result] as DebugCallTracerWithLogs;
}

function getBaseURL(chainId: 1 | 56, apiKey: string): string {
  const baseURLs = {
    1: `https://eth-mainnet.nodereal.io/v1/${apiKey}`,
    56: `https://bsc-mainnet.nodereal.io/v1/${apiKey}`,
  };

  return baseURLs[chainId];
}
