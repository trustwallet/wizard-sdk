// @see
// https://github.com/1inch/fusion-sdk/blob/4b76e9c232276742f879f3495e452dfc667b5a3a/src/limit-order/types.ts#L29-L41
// https://github.com/1inch/fusion-sdk/blob/4b76e9c232276742f879f3495e452dfc667b5a3a/src/limit-order/eip712/order-typed-data-builder.ts#L23-L37
export type OneinchFusionOrder = {
  salt: string;
  makerAsset: string;
  takerAsset: string;
  maker: string;
  receiver: string;
  allowedSender: string;
  makingAmount: string;
  takingAmount: string;
  offsets: string;
  interactions: string;
};
