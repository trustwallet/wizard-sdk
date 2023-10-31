import { BytesLike } from "ethers";

/**
 * @dev type taken from 1inch contract
 * @see https://portal.1inch.dev/documentation/fusion/fusion-sdk/for-resolvers/auction-calculator
 */
export type OneInchLimitOrderV3 = {
  //a unique value necessary to be able to create limit orders with the same parameters and different hashes
  salt: string;
  // token contract address of the asset user want to sell
  makerAsset: string;
  // token contract address of the asset user want to buy
  takerAsset: string;
  // the address of the limit order creator
  maker: string;
  /* If it contains a zero address, which means that taker asset will be sent to the address
   * of the creator of the limit order. If user set any other value, then taker asset will
   * be sent to the specified address */
  receiver: string;
  /* If it contains a zero address, which means that a limit order is available for everyone to fill. 
    If user set any other value, then the limit order will be available for execution only for the 
    specified address (private limit order) */
  allowedSender: string;
  // amount of maker asset
  makingAmount: string;
  // amount of taker asset
  takingAmount: string;
  // every 32's bytes represents offset of the n'ths interaction
  offsets: string;
  // used to encode fusion specific data
  interactions: BytesLike;
};
