import { AbiCoder, keccak256, toUtf8Bytes, Result } from "ethers";

import { RaribleV2AssetType } from "../../types/rarible-v2";
import { ASSET_TYPE, Asset } from "../../types/index";
import { ZERO_ADDRESS } from "../../utils";

/**
 * @see https://github.com/rarible/sdk/blob/a04dd75832a7110a91371afc8721b034d5b35dea/packages/ethereum/sdk/src/order/asset-type-to-struct.ts#L5
 */
export const decodeAssetType = (assetType: RaribleV2AssetType): Asset => {
  const rarribleAssetType = getRarribleAssetType(assetType);

  let data: Result;
  switch (rarribleAssetType) {
    case "ETH":
      return {
        type: ASSET_TYPE.NATIVE,
        address: ZERO_ADDRESS,
      };
    case "ERC20":
      return {
        type: ASSET_TYPE.ERC20,
        address: AbiCoder.defaultAbiCoder().decode(["address"], assetType.data)[0],
      };
    case "ERC721":
    case "CRYPTO_PUNKS":
      data = AbiCoder.defaultAbiCoder().decode(["address", "uint256"], assetType.data);

      return {
        type: ASSET_TYPE.ERC721,
        address: data[0],
        id: data[1].toString(),
      };
    case "ERC1155":
      data = AbiCoder.defaultAbiCoder().decode(["address", "uint256"], assetType.data);

      return {
        type: ASSET_TYPE.ERC1155,
        address: data[0],
        id: data[1].toString(),
      };
    case "GEN_ART":
    case "COLLECTION":
      return {
        type: ASSET_TYPE.ERC721,
        address: AbiCoder.defaultAbiCoder().decode(["address"], assetType.data)[0],
      };
    case "ERC721_LAZY":
      data = AbiCoder.defaultAbiCoder().decode(
        [
          "address",
          "tuple(uint256,string,tuple(address, uint96)[],tuple(address,uint96)[],bytes[])",
        ],
        assetType.data
      );

      return {
        type: ASSET_TYPE.ERC721,
        address: data[0],
        id: data[1][0].toString(),
      };
    case "ERC1155_LAZY":
      data = AbiCoder.defaultAbiCoder().decode(
        [
          "address",
          "tuple(uint256,string,uint256,tuple(address, uint96)[],tuple(address,uint96)[],bytes[])",
        ],
        assetType.data
      );

      return {
        type: ASSET_TYPE.ERC1155,
        address: data[0],
        id: data[1][0].toString(),
      };
    default:
      throw new Error("Unsupported asset type");
  }
};

const getRarribleAssetType = (raribleAssetType: RaribleV2AssetType) => {
  const rarribleAssetType = RARIBLE_ASSET_TYPES[raribleAssetType.assetClass];
  if (!rarribleAssetType) {
    throw new Error("Unsupported asset type");
  }

  return rarribleAssetType;
};

export const raribleAssetClassId = (type: string) => {
  return keccak256(toUtf8Bytes(type)).toLowerCase().slice(0, 10);
};

const RARIBLE_ASSET_TYPES = {
  [raribleAssetClassId("ETH")]: "ETH",
  [raribleAssetClassId("ERC20")]: "ERC20",
  [raribleAssetClassId("ERC721")]: "ERC721",
  [raribleAssetClassId("ERC721_LAZY")]: "ERC721_LAZY",
  [raribleAssetClassId("ERC1155")]: "ERC1155",
  [raribleAssetClassId("ERC1155_LAZY")]: "ERC1155_LAZY",
  [raribleAssetClassId("CRYPTO_PUNKS")]: "CRYPTO_PUNKS",
  [raribleAssetClassId("GEN_ART")]: "GEN_ART",
  [raribleAssetClassId("COLLECTION")]: "COLLECTION",
};
