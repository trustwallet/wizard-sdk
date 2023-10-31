import { BytesLike } from "ethers";

/**
 * @dev type taken from 1inch contract
 * @see https://portal.1inch.dev/documentation/fusion/fusion-sdk/for-resolvers/auction-calculator
 */

export type OneInchFusionOrderV3 = {
  // Contains of auction start time, auction duration, initial rate bump, fee and some unique value
  salt: string;
  // Address of the asset user want to sell
  makerAsset: string;
  // Address of the asset user want to buy
  takerAsset: string;
  // An address of the maker (wallet or contract address)
  maker: string;
  /**
   * If it contains a zero address, which means that taker asset will be sent to the address of the creator of the
   * limit order. If user set any other value, then taker asset will be sent to the specified address
   */
  receiver: string;
  /**
   * If it contains a zero address, which means that a limit order is available for everyone to fill.
   *  If user set any other value, then the limit order will be available for execution only
   *  for the specified address (private limit order)
   */
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
