import { DebugCallTracerWithLogs, DebugProvider } from "../../types/simulator";
import axios from "axios";
import { WizardError } from "../../utils";

type CallTracerParams = {
  network_id: string;
  block_number?: number;
  input: string;
  from: string;
  to: string;
  value: string;
  data: string;
  gas: string;
};


export const tenderlyFactory = (apiKey: string, chainId: number , accountID  : string, projectID : string): DebugProvider => {


  const baseURLs = getBaseURL(accountID, projectID);

  return {
    chainId,
    debugTrace: (input) =>
      callTracer(
        {
          network_id: `${chainId.toString()}`,  
          from: input.from,
          block_number: input.blockNumber,
          to: input.to,
          data: input.calldata,
          value: input.value || "0x0",
          gas: `0x${input.gas.toString(16)}`,
          input: input.calldata,
        },
        baseURLs,
        apiKey
      ),
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
  { from, to, value, data, gas , block_number , network_id , input  }: CallTracerParams,
  baseURL: string,
  apiKey: string
): Promise<DebugCallTracerWithLogs> {
  const res = await axios.post(baseURL, 
      {
        network_id,
        block_number,
        from,
        input,
        to,
        gas,
        value,
        data,
      },
      {
        headers: {
            Authorization: `Bearer ${apiKey}`, // Replace <TOKEN> with your actual authorization token
            "Content-Type": "application/json",
          },
      }
  );

  const transaction = res.data.transaction;

  const callTrace = transaction.transaction_info.call_trace;

  const logs = res.data.transaction.transaction_info.logs;

  if (!res.data.result) {
    const errorCode = res.data?.error?.code;
    const message = res.data?.error?.message;
    throw new WizardError(
      `NodeReal: simulation failed with code error: ${errorCode} and message: ${message}`
    );
  }

  /// @dev returned as an array to keep same pattern with internal call facilitate recursive processing
  return [callTrace , logs] as DebugCallTracerWithLogs;
}

function getBaseURL(accountID : string , projectID : string): string {
  const baseURLs = `https://api.tenderly.co/api/v1/account/${accountID}/project/${projectID}/simulate`;

  return baseURLs;
}


};