import { RaribleV2Order } from "../../../src/types/rarible-v2";
import { Domain } from "../../../src/types/visualizer";
import visualize from "../../../src/visualizer";
import rarible from "../../../src/visualizer/rarible-v2";
import {
  raribleERC721OrderWithETH,
  raribleERC1155OrderWithETH,
  raribleERC721OrderWithERC20,
  raribleERC1155OrderWithERC20,
} from "./data";

describe("rarible-v2", () => {
  const raribleDomain: Domain = {
    verifyingContract: "0x9757F2d2b135150BBeb65308D4a91804107cd8D6",
    name: "Exchange",
    version: "2",
    chainId: "1",
  };

  it("should revert if domain is not recognized by SDK entry", async () => {
    await expect(
      visualize(raribleERC721OrderWithETH, { ...raribleDomain, chainId: "-1" })
    ).rejects.toThrowError("Unrecognized/Unsupported EIP712Protocol Domain");
  });

  it("should revert at rarible module level if accessed directly with wrong domain", () => {
    expect(() => {
      rarible.visualize(raribleERC721OrderWithETH, {
        ...raribleDomain,
        verifyingContract: "0x0",
      });
    }).toThrow("wrong rarible-v2 domain");
  });

  it("should successfully visualize ERC721 order with ETH", async () => {
    const result = await visualize<RaribleV2Order>(
      raribleERC721OrderWithETH,
      raribleDomain
    );

    expect(result).toEqual({
      protocol: "RARIBLE_EXCHANGE_V2",
      assetsIn: [
        {
          address: "0x0000000000000000000000000000000000000000",
          type: "NATIVE",
          amounts: ["100"],
        },
      ],
      assetsOut: [
        {
          address: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
          type: "ERC721",
          id: "1",
          amounts: ["1"],
        },
      ],
      approvals: [],
      liveness: { from: 1698735398000, to: 1700735398000 },
    });
  });

  it("should successfully visualize ERC721 order with ERC20", async () => {
    const result = await visualize<RaribleV2Order>(
      raribleERC721OrderWithERC20,
      raribleDomain
    );

    expect(result).toEqual({
      protocol: "RARIBLE_EXCHANGE_V2",
      assetsIn: [
        {
          address: "0x44953ab2e88391176576d49cA23df0B8ACD793be",
          type: "ERC20",
          amounts: ["100"],
        },
      ],
      assetsOut: [
        {
          address: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
          type: "ERC721",
          id: "1",
          amounts: ["1"],
        },
      ],
      approvals: [],
      liveness: { from: 1698735398000, to: 1700735398000 },
    });
  });

  it("should successfully visualize ERC1155 order with ETH", async () => {
    const result = await visualize<RaribleV2Order>(
      raribleERC1155OrderWithETH,
      raribleDomain
    );

    expect(result).toEqual({
      protocol: "RARIBLE_EXCHANGE_V2",
      assetsIn: [
        {
          address: "0x0000000000000000000000000000000000000000",
          type: "NATIVE",
          amounts: ["100"],
        },
      ],
      assetsOut: [
        {
          address: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
          type: "ERC1155",
          id: "1",
          amounts: ["1"],
        },
      ],
      approvals: [],
      liveness: { from: 1698735398000, to: 1700735398000 },
    });
  });

  it("should successfully visualize ERC1155 order with ERC20", async () => {
    const result = await visualize<RaribleV2Order>(
      raribleERC1155OrderWithERC20,
      raribleDomain
    );

    expect(result).toEqual({
      protocol: "RARIBLE_EXCHANGE_V2",
      assetsIn: [
        {
          address: "0x44953ab2e88391176576d49cA23df0B8ACD793be",
          type: "ERC20",
          amounts: ["100"],
        },
      ],
      assetsOut: [
        {
          address: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
          type: "ERC1155",
          id: "1",
          amounts: ["1"],
        },
      ],
      approvals: [],
      liveness: { from: 1698735398000, to: 1700735398000 },
    });
  });
});
