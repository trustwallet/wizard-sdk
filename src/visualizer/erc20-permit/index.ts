import { ASSET_TYPE, PermitMessage } from "../../types";
import { PROTOCOL_ID } from "..";
import { MaxUint256 } from "../../utils";
import { Domain, VisualizationResult } from "../../types/visualizer";

export const visualize = (
  message: PermitMessage,
  domain: Domain
): VisualizationResult => {
  if (!isERC20Permit(message)) throw new Error("wrong ERC20 Permit message schema");
  const amount =
    message.value?.toString() ||
    (message.allowed?.toString() === "true" ? MaxUint256.toString() : "0");

  return {
    protocol: PROTOCOL_ID.ERC20_PERMIT,
    assetsIn: [],
    assetsOut: [],
    approvals: [
      {
        address: domain.verifyingContract,
        type: ASSET_TYPE.ERC20,
        amounts: [amount],
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        owner: message.owner || message.holder!, // isERC20Permit makes sure one of theme exist at least
        operator: message.spender,
        deadline: Number(message.deadline || message.expiry) * 1000,
      },
    ],
  };
};

/**
 * @dev a function that return if a message is an ERC2612 or pseudo-ERC2612 (DAI example)
 *      This function handles ERC2612 Permit and DAI Permit
 * @see https://eips.ethereum.org/EIPS/eip-2612
 * @param message EIP-712 message
 * @returns Boolean
 */
export const isERC20Permit = (message: object): boolean => {
  if (Object.keys(message).length !== 5) return false;
  const hasOwnProperty = Object.prototype.hasOwnProperty.bind(message);
  return (
    (hasOwnProperty("owner") || hasOwnProperty("holder")) &&
    hasOwnProperty("spender") &&
    (hasOwnProperty("value") || hasOwnProperty("allowed")) &&
    hasOwnProperty("nonce") &&
    (hasOwnProperty("deadline") || hasOwnProperty("expiry"))
  );
};

const erc20Permit = {
  visualize,
  isERC20Permit,
};

export default erc20Permit;
