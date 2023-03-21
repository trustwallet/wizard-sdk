import { AbiCoder } from "ethers";

const REQUIRE_ERROR_SIGNATURE = "0x08c379a0";
/// @dev lower case both addresses before checking
/// to avoid negative result of same addresses when one is chucksumed and the other is not
export const isSameAddress = (address1: string, address2: string): boolean => {
  return (
    Boolean(address1) &&
    Boolean(address2) &&
    address1.toLocaleLowerCase() === address2.toLocaleLowerCase()
  );
};

export const abiCoder = new AbiCoder();

// export const decodeErrorMessage = (output: string): string => {
//   if (output.indexOf(REQUIRE_ERROR_SIGNATURE) === 0) {
//     const errorMessage = output.slice(REQUIRE_ERROR_SIGNATURE.length);
//     return abiCoder.decode(["string"], `0x${errorMessage}`)[0];
//   }
//   return output;
// };

/// @dev assets ERCs event index hashes
export const ERC721_ERC1155_APPROVE_ALL_TOPIC =
  "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31";
export const ERC20_ERC721_TRANSFER_TOPIC =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
export const ERC20_ERC721_APPROVE_TOPIC =
  "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925";
export const ERC1155_TRANSFER_SINGLE_TOPIC =
  "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62";
export const ERC1155_TRANSFER_BATCH_TOPIC =
  "0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb";

/// @dev 32bytes boolean true (1)
export const TRUE = "0x0000000000000000000000000000000000000000000000000000000000000001";
/// @dev 32bytes boolean false (0)
export const FALSE = "0x0000000000000000000000000000000000000000000000000000000000000000";
/// @dev null address
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

/// @dev use this to fast convert an address as 32bytes (in events or data slots) to 20bytes address
export const addressFrom32bytesTo20bytes = (address32bytes: string) => {
  return `0x${address32bytes.slice(26)}`;
};

/// @dev Wrapped ETH contract address
export const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2".toLocaleLowerCase();

// export const deepCopy = <T>(obj: T): T => {
//   return JSON.parse(JSON.stringify(obj));
// };
