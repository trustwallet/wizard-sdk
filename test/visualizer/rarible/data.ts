import { getAssetClass } from "../../../src/visualizer/rarible/utils";

const raribleERC20InERC1155Out = {
  maker: "0x000075B45Dff84C00Cf597d5C3E766108CeA0000".toLowerCase(),
  makeAsset: {
    assetType: {
      assetClass: getAssetClass("ERC1155"),
      data: "0x000000000000000000000000d9145cce52d386f254917e481eb44e9943f391380000000000000000000000000000000000000000000000000000000000000045",
    },
    value: "6",
  },
  taker: "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8".toLowerCase(),
  takeAsset: {
    assetType: {
      assetClass: getAssetClass("ERC20"),
      data: "0x000000000000000000000000f8e81D47203A594245E36C48e151709F0C19fBe8".toLowerCase(),
    },
    value: "10000000000000000000",
  },
  start: "1698643839",
  end: "1798843839",
  salt: "0",
  dataType: "0x",
  data: "0x",
};

const raribleETHInERC721Out = {
  maker: "0x000075B45Dff84C00Cf597d5C3E766108CeA0000".toLowerCase(),
  makeAsset: {
    assetType: {
      assetClass: getAssetClass("ERC721"),
      data: "0x000000000000000000000000d9145cce52d386f254917e481eb44e9943f391380000000000000000000000000000000000000000000000000000000000000045",
    },
    value: "1",
  },
  taker: "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8".toLowerCase(),
  takeAsset: {
    assetType: {
      assetClass: getAssetClass("ETH"),
      data: "0x0000000000000000000000000000000000000000",
    },
    value: "100000000000000000",
  },
  start: "1698643839",
  end: "1798843839",
  salt: "0",
  dataType: "0x",
  data: "0x",
};

const raribleERC1155InETHOut = {
  maker: "0x000075B45Dff84C00Cf597d5C3E766108CeA0000".toLowerCase(),
  makeAsset: {
    assetType: {
      assetClass: getAssetClass("ETH"),
      data: "0x0000000000000000000000000000000000000000",
    },
    value: "100000000000000000",
  },
  taker: "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8".toLowerCase(),
  takeAsset: {
    assetType: {
      assetClass: getAssetClass("ERC1155"),
      data: "0x000000000000000000000000d9145cce52d386f254917e481eb44e9943f391380000000000000000000000000000000000000000000000000000000000000045",
    },
    value: "6",
  },
  start: "1698643839",
  end: "1798843839",
  salt: "0",
  dataType: "0x",
  data: "0x",
};

Object.freeze(raribleERC1155InETHOut);
Object.freeze(raribleERC20InERC1155Out);
Object.freeze(raribleETHInERC721Out);

export { raribleERC1155InETHOut, raribleERC20InERC1155Out, raribleETHInERC721Out };
