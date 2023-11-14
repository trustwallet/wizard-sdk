import { RaribleOrder } from "../../../src/types/rarible";
import { Domain } from "../../../src/types/visualizer";
import visualize from "../../../src/visualizer";
import rarible from "../../../src/visualizer/rarible";
import { getAssetClass } from "../../../src/visualizer/rarible/utils";
import {
  raribleERC1155InETHOut,
  raribleERC20InERC1155Out,
  raribleETHInERC721Out,
} from "./data";

describe("rarible", () => {
  const raribleDomain: Domain = {
    verifyingContract: "0x9757F2d2b135150BBeb65308D4a91804107cd8D6".toLowerCase(),
    name: "Exchange",
    version: "2",
    chainId: "1",
  };

  it("should revert if domain is not recognized by SDK entry", async () => {
    await expect(
      visualize(raribleERC1155InETHOut, { ...raribleDomain, chainId: "32412" })
    ).rejects.toThrowError("Unrecognized/Unsupported EIP712Protocol Domain");
  });

  it("should revert at rarible module level if accessed directly with wrong domain", () => {
    expect(() => {
      rarible.visualize(raribleETHInERC721Out, {
        ...raribleDomain,
        verifyingContract: "0x0",
      });
    }).toThrow("wrong rarible domain");
  });

  it("should throw for unknown AssetType", async () => {
    await expect(
      visualize<RaribleOrder>(
        {
          ...raribleERC20InERC1155Out,
          makeAsset: {
            assetType: {
              assetClass: getAssetClass("XYZ"),
              data: "0x0000000000000000000000000000000000000000",
            },
            value: "1",
          },
        },
        raribleDomain
      )
    ).rejects.toThrowError(`unknown rarible asset class: ${getAssetClass("XYZ")}`);
  });

  it("should successfully visualize ERC20 In ERC1155 Out order", async () => {
    const result = await visualize<RaribleOrder>(raribleERC20InERC1155Out, raribleDomain);

    expect(result).toEqual({
      protocol: "EXCHANGE",
      assetsIn: [
        {
          address: "0xf8e81D47203A594245E36C48e151709F0C19fBe8".toLowerCase(),
          type: "ERC20",
          amounts: ["10000000000000000000"],
        },
      ],
      assetsOut: [
        {
          address: "0xd9145cce52d386f254917e481eb44e9943f39138".toLowerCase(),
          type: "ERC1155",
          id: "69",
          amounts: ["6"],
        },
      ],
      approvals: [],
      liveness: { from: 1698643839, to: 1798843839 },
    });
  });

  it("should successfully visualize ETH In ERC721 Out order", async () => {
    const result = await visualize<RaribleOrder>(raribleETHInERC721Out, raribleDomain);

    expect(result).toEqual({
      protocol: "EXCHANGE",
      assetsIn: [
        {
          address: "0x0000000000000000000000000000000000000000",
          type: "NATIVE",
          amounts: ["100000000000000000"],
        },
      ],
      assetsOut: [
        {
          address: "0xd9145cce52d386f254917e481eb44e9943f39138".toLowerCase(),
          type: "ERC721",
          id: "69",
          amounts: ["1"],
        },
      ],
      approvals: [],
      liveness: { from: 1698643839, to: 1798843839 },
    });
  });

  it("should successfully visualize ERC1155 In ETH Out order", async () => {
    const result = await visualize<RaribleOrder>(raribleERC1155InETHOut, raribleDomain);

    expect(result).toEqual({
      protocol: "EXCHANGE",
      assetsIn: [
        {
          address: "0xd9145cce52d386f254917e481eb44e9943f39138".toLowerCase(),
          type: "ERC1155",
          id: "69",
          amounts: ["6"],
        },
      ],
      assetsOut: [
        {
          address: "0x0000000000000000000000000000000000000000",
          type: "NATIVE",
          amounts: ["100000000000000000"],
        },
      ],
      approvals: [],
      liveness: { from: 1698643839, to: 1798843839 },
    });
  });
});
