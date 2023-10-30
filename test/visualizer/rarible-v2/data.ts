import { RaribleV2Order } from "../../../src/types/rarible-v2";
import { raribleAssetClassId } from "../../../src/visualizer/rarible-v2/decodeAssetType";

export const raribleERC721OrderWithETH: RaribleV2Order = {
  maker: "0x",
  makeAsset: {
    assetType: {
      assetClass: raribleAssetClassId("ETH"),
      data: "0x",
    },
    value: "100",
  },
  taker: "0x",
  takeAsset: {
    assetType: {
      assetClass: raribleAssetClassId("ERC721"),
      data: "0x000000000000000000000000b47e3cd837ddf8e4c57f05d70ab865de6e193bbb0000000000000000000000000000000000000000000000000000000000000001",
    },
    value: "1",
  },
  salt: 10,
  start: 1698735398,
  end: 1698735398 + 2000000,
  dataType: "0x",
  data: "0x",
};

export const raribleERC721OrderWithERC20: RaribleV2Order = {
  maker: "0x",
  makeAsset: {
    assetType: {
      assetClass: raribleAssetClassId("ERC20"),
      data: "0x00000000000000000000000044953ab2e88391176576d49ca23df0b8acd793be",
    },
    value: "100",
  },
  taker: "0x",
  takeAsset: {
    assetType: {
      assetClass: raribleAssetClassId("ERC721"),
      data: "0x000000000000000000000000b47e3cd837ddf8e4c57f05d70ab865de6e193bbb0000000000000000000000000000000000000000000000000000000000000001",
    },
    value: "1",
  },
  salt: 10,
  start: 1698735398,
  end: 1698735398 + 2000000,
  dataType: "0x",
  data: "0x",
};

export const raribleERC1155OrderWithETH: RaribleV2Order = {
  maker: "0x",
  makeAsset: {
    assetType: {
      assetClass: raribleAssetClassId("ETH"),
      data: "0x",
    },
    value: "100",
  },
  taker: "0x",
  takeAsset: {
    assetType: {
      assetClass: raribleAssetClassId("ERC1155"),
      data: "0x000000000000000000000000b47e3cd837ddf8e4c57f05d70ab865de6e193bbb0000000000000000000000000000000000000000000000000000000000000001",
    },
    value: "1",
  },
  salt: 10,
  start: 1698735398,
  end: 1698735398 + 2000000,
  dataType: "0x",
  data: "0x",
};

export const raribleERC1155OrderWithERC20: RaribleV2Order = {
  maker: "0x",
  makeAsset: {
    assetType: {
      assetClass: raribleAssetClassId("ERC20"),
      data: "0x00000000000000000000000044953ab2e88391176576d49ca23df0b8acd793be",
    },
    value: "100",
  },
  taker: "0x",
  takeAsset: {
    assetType: {
      assetClass: raribleAssetClassId("ERC1155"),
      data: "0x000000000000000000000000b47e3cd837ddf8e4c57f05d70ab865de6e193bbb0000000000000000000000000000000000000000000000000000000000000001",
    },
    value: "1",
  },
  salt: 10,
  start: 1698735398,
  end: 1698735398 + 2000000,
  dataType: "0x",
  data: "0x",
};
