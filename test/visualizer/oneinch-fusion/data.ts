import { oneinchFusionTypes } from "../../../src/types";

/**
 * @dev test data for 1inch fusion successful order
 * @see https://github.com/1inch/fusion-sdk/blob/4b76e9c232276742f879f3495e452dfc667b5a3a/src/fusion-order/fusion-order.spec.ts#L12-L61
 */
const oneinchFusionOrder: oneinchFusionTypes.OneinchFusionOrder = {
  salt: "45118768841948961586167738353692277076075522015101619148498725069326976558864",
  makerAsset: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  takerAsset: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  maker: "0x00000000219ab540356cbb839cbe05303d7705fa",
  receiver: "0x0000000000000000000000000000000000000000",
  allowedSender: "0xa88800cd213da5ae406ce248380802bd53b47647",
  makingAmount: "1000000000000000000",
  takingAmount: "1420000000",
  offsets: "0",
  interactions: "0x000c004e200000000000000000219ab540356cbb839cbe05303d7705faf486570009",
};

Object.freeze(oneinchFusionOrder);

export { oneinchFusionOrder };
