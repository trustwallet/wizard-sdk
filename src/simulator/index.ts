import { ASSET_TYPE } from "../types";
import {
  Approval,
  AssetsTransfersAndApprovalsRes,
  DebugCallTracerWithLogs,
  DebugProvider,
  SimulationParams,
  Transfer,
} from "../types/simulator";
import {
  ERC1155_TRANSFER_BATCH_TOPIC,
  ERC1155_TRANSFER_SINGLE_TOPIC,
  ERC20_ERC721_APPROVE_TOPIC,
  ERC20_ERC721_TRANSFER_TOPIC,
  ERC721_ERC1155_APPROVE_ALL_TOPIC,
  TRUE,
  ZERO_ADDRESS,
  abiCoder,
  addressFrom32bytesTo20bytes,
  decodeErrorMessage,
} from "../utils";
import { nodeRealFactory } from "./providers";

const { ERC1155, ERC20, ERC721, NATIVE } = ASSET_TYPE;
export default class Simulator {
  private providers: {
    [chainId: number]: DebugProvider["debugTrace"];
  } = {};

  constructor(providerInstances: DebugProvider[]) {
    providerInstances.forEach((p) => {
      this.providers[p.chainId] = p.debugTrace;
    });
  }

  async simulate(params: SimulationParams): Promise<AssetsTransfersAndApprovalsRes> {
    if (!params.chainId) throw new Error("undefined chainId param");

    if (!params.from) throw new Error("undefined from param");

    if (!params.to) throw new Error("undefined to param");

    if (!params.calldata) throw new Error("undefined to calldata");

    const debugTraceCall = this.providers[params.chainId];

    if (!debugTraceCall) {
      throw new Error(`Simulator: no debugProvider found for chainId: ${params.chainId}`);
    }

    const trace = await debugTraceCall(params);
    const transfers: Transfer[] = [];
    const approvals: Approval[] = [];

    this.processTraceCallData(trace, transfers, approvals);
    return {
      transfers,
      approvals,
    };
  }

  /**
   * @dev recursive function to precess top and internal calls
   *      and mutably append records to both `transfers` and `approvals` arrays
   *      the function classify and decode data according to EVM specification and Ethereum EIPs
   * @see https://eips.ethereum.org/EIPS/eip-721
   * @see https://eips.ethereum.org/EIPS/eip-20
   * @see https://eips.ethereum.org/EIPS/eip-1155
   * @see https://docs.soliditylang.org/en/v0.8.13/abi-spec.html
   * @param {DebugCallTracerWithLogs} data data to be processed recursively
   * @param {Transfer[]} transfersReference mutable array to append transfer records
   * @param {Approval[]} approvalsReference mutable array to append approval records
   */
  private processTraceCallData = (
    data: DebugCallTracerWithLogs,
    transfersReference: Transfer[],
    approvalsReference: Approval[]
  ) => {
    data?.forEach((call) => {
      if (call.error) {
        throw new Error(
          `Transaction will fail with error: '${decodeErrorMessage(call.output)}'`
        );
      }
      // handle native ETH transfers
      if (call.value && call.value !== "0x0") {
        transfersReference.push({
          address: ZERO_ADDRESS,
          type: NATIVE,
          from: call.from,
          to: call.to,
          amount: call.value,
          id: "",
        });
      }

      // handle logs
      call.logs?.forEach((event) => {
        const eventHash = event.topics[0];

        // ERC20 and ERC721 Transfer events
        // keccak256(Transfer(address,address,uint256))
        if (eventHash === ERC20_ERC721_TRANSFER_TOPIC) {
          // ERC20 Transfer event have a topics array of 3 elements (eventHash, and 2 indexed addresses)
          if (event.topics.length === 3) {
            const [, _from, _to] = event.topics;
            const from = addressFrom32bytesTo20bytes(_from);
            const to = addressFrom32bytesTo20bytes(_to);
            const amount = BigInt(event.data).toString();
            transfersReference.push({
              address: event.address,
              type: ERC20,
              from,
              to,
              amount,
            });
          }
          // ERC721 Transfer event have a topics array of 4 elements (eventHash, and 2 indexed addresses and an indexed tokenId)
          else {
            const [, _from, _to, _tokenId] = event.topics;
            const from = addressFrom32bytesTo20bytes(_from);
            const to = addressFrom32bytesTo20bytes(_to);
            const tokenId = BigInt(_tokenId).toString();
            transfersReference.push({
              address: event.address,
              type: ERC721,
              from,
              to,
              id: tokenId,
            });
          }
        }
        // ERC20 and ERC721 Approval events
        // keccak256(Approval(address,address,uint256))
        else if (eventHash === ERC20_ERC721_APPROVE_TOPIC) {
          // ERC20 Approval event have a topics array of 3 elements (eventHash, and 2 indexed addresses)
          if (event.topics.length === 3) {
            const [, _owner, _operator] = event.topics;
            const owner = addressFrom32bytesTo20bytes(_owner);
            const operator = addressFrom32bytesTo20bytes(_operator);

            const amount = BigInt(event.data).toString();
            approvalsReference.push({
              address: event.address,
              type: ERC20,
              owner,
              operator,
              amount,
            });
          }
          // ERC721 Approval event have a topics array of 4 elements (eventHash, and 2 indexed addresses and an indexed tokenId)
          else if (event.topics.length === 4) {
            const [, _owner, _operator, _tokenId] = event.topics;
            const owner = addressFrom32bytesTo20bytes(_owner);
            const operator = addressFrom32bytesTo20bytes(_operator);
            const tokenId = BigInt(_tokenId).toString();
            approvalsReference.push({
              address: event.address,
              type: ERC721,
              owner,
              operator,
              id: tokenId,
            });
          }
        }
        // ERC721 and ERC1155 ApprovalForAll event
        // keccak256(ApprovalForAll(address,address,bool))
        else if (eventHash === ERC721_ERC1155_APPROVE_ALL_TOPIC) {
          const [, _owner, _operator] = event.topics;
          const owner = addressFrom32bytesTo20bytes(_owner);
          const operator = addressFrom32bytesTo20bytes(_operator);
          const isApprove = event.data === TRUE;
          approvalsReference.push({
            address: event.address,
            type: ERC721,
            owner,
            operator,
            approveForAllStatus: isApprove,
          });
        }

        // ERC1155 TransferSingle event
        // keccak256(TransferSingle(address,address,address,uint256,uint256))
        else if (eventHash === ERC1155_TRANSFER_SINGLE_TOPIC) {
          const [, _operator, _from, _to] = event.topics;
          const operator = addressFrom32bytesTo20bytes(_operator);
          const from = addressFrom32bytesTo20bytes(_from);
          const to = addressFrom32bytesTo20bytes(_to);
          const [id, amount] = abiCoder.decode(["uint256", "uint256"], event.data);
          transfersReference.push({
            address: event.address,
            type: ERC1155,
            from,
            to,
            operator,
            amount: BigInt(amount).toString(),
            id: BigInt(id).toString(),
          });
        }

        // ERC1155 TransferBatch event
        // keccak256(TransferBatch(address,address,address,uint256[],uint256[]))
        else if (eventHash === ERC1155_TRANSFER_BATCH_TOPIC) {
          const [, _operator, _from, _to] = event.topics;
          const operator = addressFrom32bytesTo20bytes(_operator);
          const from = addressFrom32bytesTo20bytes(_from);
          const to = addressFrom32bytesTo20bytes(_to);
          const [ids, amounts] = abiCoder.decode(["uint256[]", "uint256[]"], event.data);

          (ids as bigint[]).forEach((id, index) => {
            const amount = amounts[index];
            transfersReference.push({
              address: event.address,
              type: ERC1155,
              from,
              to,
              operator,
              amount: BigInt(amount).toString(),
              id: BigInt(id).toString(),
            });
          });
        }
      });

      // recursive call to process internal calls, since the EVM use gas and the call stack deterministic there's no risk of infinite looping
      this.processTraceCallData(call.calls, transfersReference, approvalsReference);
    });
  };

  static nodeRealFactory = nodeRealFactory;
}
