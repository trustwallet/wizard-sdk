import { Domain } from "../../../src/types";
import { LooksrareMakerOrderWithEncodedParams } from "../../../src/types/looksrare";
import { abiCoder } from "../../../src/utils";
import visualize from "../../../src/visualizer";
import looksrare from "../../../src/visualizer/looksrare";
import { looksrareBid, looksrareCollectionBid, looksrareNormalListing } from "./data";

describe("looksrare", () => {
  const looksrareDomain: Domain = {
    verifyingContract: "0x59728544B08AB483533076417FbBB2fD0B17CE3a",
    name: "LooksRareExchange",
    version: "1",
    chainId: "1",
  };

  it("should revert if domain is not recognized by SDk entry", async () => {
    await expect(
      visualize(looksrareNormalListing, { ...looksrareDomain, chainId: "11" })
    ).rejects.toThrowError("Unrecognized/Unsupported Protocol Domain");
  });

  it("should revert at looksrare module level if accessed directly with wrong domain", () => {
    expect(() => {
      looksrare.visualize(looksrareNormalListing, {
        ...looksrareDomain,
        verifyingContract: "0x0",
      });
    }).toThrow("wrong looksrare domain");
  });

  it("should throw for unknown strategy", async () => {
    await expect(
      visualize<LooksrareMakerOrderWithEncodedParams>(
        { ...looksrareBid, strategy: "0x0" },
        looksrareDomain
      )
    ).rejects.toThrowError("unknown looksrare strategy 0x0");
  });

  it("should successfully visualize sell order", async () => {
    const result = await visualize<LooksrareMakerOrderWithEncodedParams>(
      looksrareNormalListing,
      looksrareDomain
    );

    expect(result).toEqual({
      protocol: "LOOKSRARE_EXCHANGE",
      assetIn: [
        {
          address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          type: "ERC20",
          amounts: ["196000000000000000"],
        },
      ],
      assetOut: [
        {
          address: "0x90c70Dc9f3FDa4a1D78a2B7D90CA087088355717",
          type: "ERC721",
          id: "12743",
          amounts: ["1"],
        },
      ],
      approval: [],
      liveness: { from: 1677588653000, to: 1680266940000 },
    });
  });

  it("should successfully visualize ERC1155 collection bid", async () => {
    const result = await visualize<LooksrareMakerOrderWithEncodedParams>(
      looksrareCollectionBid,
      looksrareDomain
    );

    expect(result).toEqual({
      protocol: "LOOKSRARE_EXCHANGE",
      assetIn: [
        {
          address: "0x90c70Dc9f3FDa4a1D78a2B7D90CA087088355717",
          type: "ERC1155",
          amounts: ["10"],
        },
      ],
      assetOut: [
        {
          address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          type: "ERC20",
          amounts: ["1000000000000000"],
        },
      ],
      approval: [],
      liveness: { from: 1677588943000, to: 1677675336000 },
    });
  });

  it("should successfully visualize a bid order", async () => {
    const result = await visualize<LooksrareMakerOrderWithEncodedParams>(
      looksrareBid,
      looksrareDomain
    );

    expect(result).toEqual({
      protocol: "LOOKSRARE_EXCHANGE",
      assetIn: [
        {
          address: "0x90c70Dc9f3FDa4a1D78a2B7D90CA087088355717",
          type: "ERC721",
          id: "9268",
          amounts: ["1"],
        },
      ],
      assetOut: [
        {
          address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          type: "ERC20",
          amounts: ["1000000000000000"],
        },
      ],
      approval: [],
      liveness: { from: 1677588943000, to: 1677675336000 },
    });
  });

  it("should successfully visualize dutch auction sell order", async () => {
    const result = await visualize<LooksrareMakerOrderWithEncodedParams>(
      {
        ...looksrareNormalListing,
        strategy: "0x3E80795Cae5Ee215EBbDf518689467Bf4243BAe0",
        params: abiCoder.encode(["uint256"], ["210000000000000000"]),
      },
      looksrareDomain
    );

    expect(result).toEqual({
      protocol: "LOOKSRARE_EXCHANGE",
      assetIn: [
        {
          address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          type: "ERC20",
          amounts: ["196000000000000000", "205800000000000000"],
        },
      ],
      assetOut: [
        {
          address: "0x90c70Dc9f3FDa4a1D78a2B7D90CA087088355717",
          type: "ERC721",
          id: "12743",
          amounts: ["1"],
        },
      ],
      approval: [],
      liveness: { from: 1677588653000, to: 1680266940000 },
    });
  });
});
