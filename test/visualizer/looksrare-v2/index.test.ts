import { LooksRareV2MakerOrder } from "../../../src/types/looksrare-v2";
import { Domain } from "../../../src/types/visualizer";
import visualize from "../../../src/visualizer";
import looksrare from "../../../src/visualizer/looksrare-v2";
import {
  looksrareV2Bid,
  looksrareV2CollectionBid,
  looksrareV2NormalListing,
} from "./data";

describe("looksrare-v2", () => {
  const looksrareDomain: Domain = {
    verifyingContract: "0x0000000000E655fAe4d56241588680F86E3b2377",
    name: "LooksRareProtocol",
    version: "2",
    chainId: "1",
  };

  it("should revert if domain is not recognized by SDK entry", async () => {
    await expect(
      visualize(looksrareV2NormalListing, { ...looksrareDomain, chainId: "11" })
    ).rejects.toThrowError("Unrecognized/Unsupported EIP712Protocol Domain");
  });

  it("should revert at looksrare module level if accessed directly with wrong domain", () => {
    expect(() => {
      looksrare.visualize(looksrareV2NormalListing, {
        ...looksrareDomain,
        verifyingContract: "0x0",
      });
    }).toThrow("wrong looksrare-v2 domain");
  });

  it("should throw for unknown strategy", async () => {
    await expect(
      visualize<LooksRareV2MakerOrder>(
        { ...looksrareV2Bid, strategyId: 3 as any },
        looksrareDomain
      )
    ).rejects.toThrowError("unknown looksrare-v2 strategy with ID: 3");
  });

  it("should successfully visualize sell order", async () => {
    const result = await visualize<LooksRareV2MakerOrder>(
      looksrareV2NormalListing,
      looksrareDomain
    );

    expect(result).toEqual({
      protocol: "LOOKSRARE_EXCHANGE_V2",
      assetsIn: [
        {
          address: "0x0000000000000000000000000000000000000000",
          type: "NATIVE",
          amounts: ["100000000000000000"],
        },
      ],
      assetsOut: [
        {
          address: "0x5f04D47D698F79d76F85E835930170Ff4c4EBdB7",
          type: "ERC721",
          id: "99117",
          amounts: ["1"],
        },
      ],
      approvals: [],
      liveness: { from: 1684302184000, to: 1686893895000 },
    });
  });

  it("should successfully visualize collection bid", async () => {
    const result = await visualize<LooksRareV2MakerOrder>(
      looksrareV2CollectionBid,
      looksrareDomain
    );

    expect(result).toEqual({
      protocol: "LOOKSRARE_EXCHANGE_V2",
      assetsIn: [
        {
          address: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
          type: "ERC721",
          amounts: ["1"],
        },
      ],
      assetsOut: [
        {
          address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          type: "ERC20",
          amounts: ["100000000000000000"],
        },
      ],
      approvals: [],
      liveness: { from: 1684302184000, to: 1686893895000 },
    });
  });

  it("should successfully visualize an ER1155 bid order", async () => {
    const result = await visualize<LooksRareV2MakerOrder>(
      looksrareV2Bid,
      looksrareDomain
    );

    expect(result).toEqual({
      protocol: "LOOKSRARE_EXCHANGE_V2",
      assetsIn: [
        {
          address: "0x005AF388653567Af2F388E6224dC7C4b3241C500",
          type: "ERC1155",
          id: "1500",
          amounts: ["10"],
        },
      ],
      assetsOut: [
        {
          address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          type: "ERC20",
          amounts: ["100000000000000000"],
        },
      ],
      approvals: [],
      liveness: { from: 1684302184000, to: 1686893895000 },
    });
  });
});
