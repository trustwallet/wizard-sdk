import { BytesLike } from "ethers";

/**
 * @dev all types are taken from rarible contracts
 * BigNumberish is casted to string as the EIP-712 doesn't have BigInt (all BigInt will be transformed with .toString())
 * @see https://github.com/rarible/protocol-contracts/blob/master/exchange-v2/contracts/libraries/LibOrder.sol#L21
 */

/** Type for Asset Type */
export type AssetType = {
  /** Asset type, ETH, ERC20, ERC721, ERC1155 etc */
  assetClass: BytesLike;
  /** Asset address and tokenId encoded */
  data: BytesLike;
};

/** Type for Asset */
export type Asset = {
  /** Type for Asset Type */
  assetType: AssetType;
  /** Amount of tokens or value of the order */
  value: string;
};

/** Type for order */
export type RaribleOrder = {
  /** Maker of the order */
  maker: string;
  /** Asset of the maker */
  makeAsset: Asset;
  /** Taker of the order */
  taker: string;
  /** Asset of the taker */
  takeAsset: Asset;
  /** Starting timestamp of the order */
  start: string;
  /** Ending timestamp of the order */
  end: string;
  /** Order salt */
  salt: string;
  /** Type of the order in Bytes4 */
  dataType: BytesLike;
  /** Order metadata */
  data: BytesLike;
};
