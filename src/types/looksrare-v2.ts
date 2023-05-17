import { BytesLike } from "ethers";

/**
 * @dev all types are taken from looksrare-sdk-v2
 * BigNumberish is casted to string as the EIP-712 doesn't have BigInt (all BigInt will be transformed with .toString())
 * @see https://github.com/LooksRare/sdk-v2/releases/tag/0.9.0
 */

/** Type for maker order */
export enum QuoteType {
  Bid = 0,
  Ask = 1,
}

/** List of collection types supported by the protocol */
export enum CollectionType {
  ERC721 = 0,
  ERC1155 = 1,
}

/** List of trading strategies */
export enum StrategyType {
  standard = 0,
  collection = 1,
  collectionWithMerkleTree = 2,
}

export type LooksRareV2MakerOrder = {
  /** Bid (0) or Ask (1) */
  quoteType: QuoteType;
  /** User's current bid / ask nonce */
  globalNonce: string;
  /** Subset nonce used to group an arbitrary number of orders under the same nonce */
  subsetNonce: string;
  /** Nonce for this specific order */
  orderNonce: string;
  /** Strategy ID, 0: Standard, 1: Collection, etc*/
  strategyId: StrategyType;
  /** Asset type, 0: ERC-721, 1:ERC-1155, etc */
  collectionType: CollectionType;
  /** Collection address */
  collection: string;
  /** Currency address (zero address for ETH) */
  currency: string;
  /** Signer address */
  signer: string;
  /** Timestamp in second of the time when the order starts to be valid */
  startTime: string;
  /** Timestamp in second of the time when the order becomes invalid */
  endTime: string;
  /** Minimum price to be received after the trade */
  price: string;
  /** List of item IDS */
  itemIds: string[];
  /** List of amount for each item ID (1 for ERC721) */
  amounts: string[];
  /** Additional parameters for complex orders */
  additionalParameters: BytesLike;
};
