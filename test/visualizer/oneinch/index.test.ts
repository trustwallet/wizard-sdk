import { OneInchFusionOrder } from "../../../src/types/oneinch";
import { Domain } from "../../../src/types/visualizer";
import visualize from "../../../src/visualizer";
import oneinch from "../../../src/visualizer/oneinch";
import { oneinchNormalLimitOrder } from "./data";

describe("oneinch", () => {
  const oneinchDomain: Domain = {
    verifyingContract: "0x1111111254eeb25477b68fb85ed929f73a960582",
    name: "1inch Aggregation Router",
    version: "5",
    chainId: "1",
  };

  it("should revert if domain is not recognized by SDK entry", async () => {
    await expect(
      visualize(oneinchNormalLimitOrder, { ...oneinchDomain, chainId: "32412" })
    ).rejects.toThrowError("Unrecognized/Unsupported EIP712Protocol Domain");
  });

  it("should revert at oneinch module level if accessed directly with wrong domain", () => {
    expect(() => {
      oneinch.visualize(oneinchNormalLimitOrder, {
        ...oneinchDomain,
        verifyingContract: "0x0",
      });
    }).toThrow("wrong oneinch domain");
  });

  it("should successfully visualize oneinch limit order", async () => {
    const result = await visualize<OneInchFusionOrder>(
      oneinchNormalLimitOrder,
      oneinchDomain
    );

    expect(result).toEqual({
      protocol: "ONEINCH_FUSION",
      assetsIn: [
        {
          address: "0x000075B45Dff84C00Cf597d5C3E766108CeA0000",
          amounts: ["990000000000000000"],
          type: "ERC20",
        },
      ],
      assetsOut: [
        {
          address: "0x5f04D47D698F79d76F85E835930170Ff4c4EBdB7",
          amounts: ["25000000000000"],
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
