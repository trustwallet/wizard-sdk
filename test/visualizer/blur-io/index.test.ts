import { BlurIoOrder } from "../../../src/types/blur";
import visualize from "../../../src/visualizer";
import blurIo from "../../../src/visualizer/blur-io";
import { blurIoBid, blurIoCollectionBid, blurIoListing } from "./data";

describe("blur.io", () => {
  const blurIoDomain = {
    name: "Blur Exchange",
    version: "1.1",
    chainId: "1",
    verifyingContract: "0x000000000000ad05ccc4f10045630fb830b95127",
  };

  it("should revert if blurIo module called directly with wrong domain", () => {
    expect(() => {
      blurIo.visualize(blurIoListing, { ...blurIoDomain, chainId: "2" });
    }).toThrow("wrong blur.io domain");
  });

  it("should revert unsupported matching policy", async () => {
    await expect(
      visualize({ ...blurIoListing, matchingPolicy: "0x0" }, blurIoDomain)
    ).rejects.toThrow("unrecognized blur.io matching policy");
  });

  it("should successfully visualize sell order", async () => {
    const result = await visualize<BlurIoOrder>(blurIoListing, blurIoDomain);
    expect(result).toEqual({
      protocol: "BLUR_IO_MARKETPLACE",
      assetsIn: [
        {
          address: "0x0000000000000000000000000000000000000000",
          type: "NATIVE",
          amounts: ["760000000000000000"],
        },
      ],
      assetsOut: [
        {
          address: "0x90c70Dc9f3FDa4a1D78a2B7D90CA087088355717",
          type: "ERC721",
          id: "12743",
          amounts: ["1"],
        },
      ],
      approval: [],
      liveness: { from: 1677736151000, to: 1678340951000 },
    });
  });

  it("should successfully visualize bid order", async () => {
    const result = await visualize<BlurIoOrder>(blurIoBid, blurIoDomain);

    expect(result).toEqual({
      protocol: "BLUR_IO_MARKETPLACE",
      assetsIn: [
        {
          address: "0x90c70Dc9f3FDa4a1D78a2B7D90CA087088355717",
          type: "ERC721",
          id: "12743",
          amounts: ["1"],
        },
      ],
      assetsOut: [
        {
          address: "0x0000000000000000000000000000000000000000",
          type: "NATIVE",
          amounts: ["800000000000000000"],
        },
      ],
      approval: [],
      liveness: { from: 1677736151000, to: 1678340951000 },
    });
  });

  it("should successfully visualize collection bid order with pool ETH", async () => {
    const result = await visualize<BlurIoOrder>(blurIoCollectionBid, blurIoDomain);

    expect(result).toEqual({
      protocol: "BLUR_IO_MARKETPLACE",
      assetsIn: [
        {
          address: "0xf048cbaad26c1a35e7a04e126fdeb9c8045e676b",
          type: "ERC721",
          amounts: ["1"],
        },
      ],
      assetsOut: [
        {
          address: "0x0000000000000000000000000000000000000000",
          type: "NATIVE",
          amounts: ["10000000000000000"],
        },
      ],
      approval: [],
      liveness: { from: 1678461048000, to: 1709997048000 },
    });
  });

  it("should successfully visualize bid order with ERC20 token", async () => {
    const result = await visualize<BlurIoOrder>(
      { ...blurIoBid, paymentToken: "0xSomeERC20" },
      blurIoDomain
    );

    expect(result).toEqual({
      protocol: "BLUR_IO_MARKETPLACE",
      assetsIn: [
        {
          address: "0x90c70Dc9f3FDa4a1D78a2B7D90CA087088355717",
          type: "ERC721",
          id: "12743",
          amounts: ["1"],
        },
      ],
      assetsOut: [
        {
          address: "0xSomeERC20",
          type: "ERC20",
          amounts: ["800000000000000000"],
        },
      ],
      approval: [],
      liveness: { from: 1677736151000, to: 1678340951000 },
    });
  });

  it("should revert if wrong side", async () => {
    await expect(visualize({ ...blurIoListing, side: 3 }, blurIoDomain)).rejects.toThrow(
      "unrecognized blur.io order side"
    );
  });
});
