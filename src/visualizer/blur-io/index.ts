import { PROTOCOL_ID } from "..";
import { ASSET_TYPE, AssetInOut, Domain, EIP712Protocol, VisualizationResult } from "../../types";
import { BlurIoOrder, BlurIoSide } from "../../types/blur";
import { ZERO_ADDRESS, getPaymentAssetType, isSameAddress } from "../../utils";
import {
  BLUR_IO_COLLECTION_BID_POLICY,
  BLUR_IO_INVERSE_BASIS_POINT,
  isValidBlurIoPolicy,
} from "./const";

const { ERC721, NATIVE } = ASSET_TYPE;
export const isCorrectDomain = (domain: Domain) => {
  return (
    supportedChains.includes(Number(domain.chainId)) &&
    addressesBook.includes(domain.verifyingContract.toLocaleLowerCase())
  );
};

export const visualize = (message: BlurIoOrder, domain: Domain): VisualizationResult => {
  if (!isCorrectDomain(domain)) throw new Error("wrong blur.io domain");
  if (!isValidBlurIoPolicy(message.matchingPolicy))
    throw new Error("unrecognized blur.io matching policy");

  // Fees and Price calculation
  const price = BigInt(message.price);
  const feesDivider = BigInt(BLUR_IO_INVERSE_BASIS_POINT);
  let accumulatedFees = BigInt(0);
  message.fees.forEach((fee) => {
    const rate = BigInt(fee.rate);
    accumulatedFees += (price * rate) / feesDivider;
  });
  const netPrice = price - accumulatedFees;

  /**
   * @dev only ERC721 is supported by blur.io (at least for now).
   *      - MUST handle nftAsset.type if an ERC1155 policy is added
   */
  const nftAsset: AssetInOut = {
    address: message.collection,
    type: ERC721,
    id: message.tokenId,
    amounts: [message.amount],
  };

  const paymentAssetType = getPaymentAssetType(message.paymentToken);
  const paymentAsset: AssetInOut = {
    address: paymentAssetType === NATIVE ? ZERO_ADDRESS : message.paymentToken,
    type: paymentAssetType,
    amounts: [],
  };

  // if it's a collection Bid
  if (isSameAddress(message.matchingPolicy, BLUR_IO_COLLECTION_BID_POLICY))
    delete nftAsset.id;

  const assetIn: AssetInOut[] = [];
  const assetOut: AssetInOut[] = [];
  const tradeSide = Number(message.side);
  if (tradeSide === BlurIoSide.Sell) {
    paymentAsset.amounts.push(netPrice.toString());

    assetOut.push(nftAsset);
    assetIn.push(paymentAsset);
  } else if (tradeSide === BlurIoSide.Buy) {
    paymentAsset.amounts.push(price.toString());

    assetOut.push(paymentAsset);
    assetIn.push(nftAsset);
  } else {
    throw new Error("unrecognized blur.io order side");
  }

  return {
    protocol: PROTOCOL_ID.BLUR_IO_MARKETPLACE,
    assetIn,
    assetOut,
    liveness: {
      from: Number(message.listingTime) * 1000,
      to: Number(message.expirationTime) * 1000,
    },
    approval: [],
  };
};

const supportedChains = [1];
const addressesBook = [
  "0x000000000000ad05ccc4f10045630fb830b95127", // Mainnet
].map((e) => e.toLocaleLowerCase());

const blurIo: EIP712Protocol<BlurIoOrder> = {
  isCorrectDomain,
  visualize,
};
export default blurIo;
