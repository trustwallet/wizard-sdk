/**
 * @dev The order type used by 1inch Fusion sdks.
 * @see https://portal.1inch.dev/documentation/fusion/fusion-sdk/for-resolvers/auction-calculator
 * @see https://github.com/1inch/fusion-sdk/blob/4b76e9c232276742f879f3495e452dfc667b5a3a/src/limit-order/types.ts#L29-L41
 * @see https://github.com/1inch/fusion-sdk/blob/4b76e9c232276742f879f3495e452dfc667b5a3a/src/limit-order/eip712/order-typed-data-builder.ts#L34
 */
export type OneinchFusionOrder = {
  // this includes the auction's start time, duration.
  salt: string;
  // the address of the asset user want to sell (address of a token contract)
  makerAsset: string;
  // the address of the asset user want to buy (address of a token contract)
  takerAsset: string;
  // the address of the maker
  maker: string;
  // If it contains a zero address, which means that taker asset will be sent to the address of the creator of the order. If user set any other value, then taker asset will be sent to the specified address
  receiver: string;
  // If it contains a zero address, which means that a limit order is available for everyone to fill. If user set any other value, then the limit order will be available for execution only for the specified address (private limit order)
  allowedSender: string;
  // amount of the token to sell
  makingAmount: string;
  // amount of taker asset
  takingAmount: string;
  // every 32's bytes represents offset of the n'ths interaction
  offsets: string;
  // used to encode fusion specific data. But it's not used in the wizard-sdk.
  interactions: string;
};
