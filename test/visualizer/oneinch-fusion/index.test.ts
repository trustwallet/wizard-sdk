import { Domain } from "../../../src/types/visualizer";
import visualize from "../../../src/visualizer";
import oneinchFusion from "../../../src/visualizer/oneinch-fusion";

import { oneinchFusionOrder } from "./data";

describe("oneinch-fusion", () => {
  const oneinchFusionDomain: Domain = {
    chainId: "1",
    name: "1inch Aggregation Router",
    verifyingContract: "0x1111111254eeb25477b68fb85ed929f73a960582",
    version: "5",
  };

  it("should revert if domain is not recognized by SDK entry", async () => {
    await expect(
      visualize(oneinchFusionOrder, { ...oneinchFusionDomain, chainId: "-1" })
    ).rejects.toThrowError("Unrecognized/Unsupported EIP712Protocol Domain");
  });

  it("should revert at oneinch-fusion module level if the domain verifyingContract is wrong", () => {
    expect(() => {
      oneinchFusion.visualize(oneinchFusionOrder, {
        ...oneinchFusionDomain,
        verifyingContract: "0x0",
      });
    }).toThrow("wrong 1inch-fusion domain");
  });

  it("should revert at oneinch-fusion module level if the domain chainId is wrong", () => {
    expect(() => {
      oneinchFusion.visualize(oneinchFusionOrder, {
        ...oneinchFusionDomain,
        chainId: "-1",
      });
    }).toThrow("wrong 1inch-fusion domain");
  });

  it("should successfully visualize oneinch-fusion order", async () => {
    const result = await visualize(oneinchFusionOrder, oneinchFusionDomain);

    expect(result).toEqual({
      protocol: "ONEINCH_FUSION",
      assetsIn: [
        {
          address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          amounts: ["1000000000000000000"],
          type: "ERC20",
        },
      ],
      assetsOut: [
        {
          address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          amounts: ["1420000000"],
          type: "ERC20",
        },
      ],
      liveness: {
        from: 1673548149,
        to: 1673548329,
      },
      approvals: [],
    });
  });
});
