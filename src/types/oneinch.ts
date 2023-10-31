import { BytesLike } from "ethers";

/**
 * @dev type taken from 1inch contract
 * @see https://portal.1inch.dev/documentation/fusion/fusion-sdk/for-resolvers/auction-calculator
 */
export type LimitOrderV3Struct = {
  // Contains of auction start time, auction duration, initial rate bump, fee and some unique value
  salt: string;
  // Address of the maker asset
  makerAsset: string;
  // Address of the taker asset
  takerAsset: string;
  // An address of the maker (wallet or contract address)
  maker: string;
  /* An address of the wallet or contract who will receive filled amount. If it contains a zero address, 
   * which means that taker asset will be sent to the address of the creator of the limit order. 
     If user set any other value, then taker asset will be sent to the specified address */
  receiver: string;
  // An address of the settlement contract
  allowedSender: string;
  // Order maker's token amount
  makingAmount: string;
  // Order taker's token amount
  takingAmount: string;
  // Merged offsets of each field in interactions
  offsets: string;
  // An interaction call data. ABI encoded set of makerAssetData, takerAssetData, getMakingAmount, getTakingAmount, predicate, permit, preInteraction, postInteraction
  interactions: BytesLike;
};
