import ethers from "ethers";
import { ASSET_TYPE, AssetInOut } from "../../types";
import { Asset } from "../../types/rarible";

export function getAssetClass(assetType: string): string {
  return ethers.keccak256(ethers.toUtf8Bytes(assetType)).slice(0, 10);
}

export function buildAssetETH(asset: Asset): AssetInOut[] {
  return [
    {
      type: ASSET_TYPE.NATIVE,
      amounts: [asset.value],
      address: ethers.ZeroAddress,
    },
  ];
}

export function buildAssetERC20(asset: Asset): AssetInOut[] {
  const abiCoder = ethers.AbiCoder.defaultAbiCoder();

  const address = abiCoder.decode(["address"], asset.assetType.data)[0];
  return [
    {
      type: ASSET_TYPE.ERC20,
      amounts: [asset.value],
      address: address,
    },
  ];
}

export function buildAssetERC721(asset: Asset): AssetInOut[] {
  const abiCoder = ethers.AbiCoder.defaultAbiCoder();

  const decodedData = abiCoder.decode(["address", "uint256"], asset.assetType.data);
  const address = decodedData[0];
  const tokenId = decodedData[1];
  return [
    {
      type: ASSET_TYPE.ERC721,
      amounts: ["1"],
      id: tokenId.toString(),
      address: address,
    },
  ];
}

export function buildAssetERC1155(asset: Asset): AssetInOut[] {
  const abiCoder = ethers.AbiCoder.defaultAbiCoder();

  const decodedData = abiCoder.decode(["address", "uint256"], asset.assetType.data);
  const address = decodedData[0];
  const tokenId = decodedData[1];
  return [
    {
      type: ASSET_TYPE.ERC1155,
      amounts: [asset.value],
      id: tokenId.toString(),
      address: address,
    },
  ];
}
