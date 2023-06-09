import { PROTOCOL_ID } from "..";
import { ASSET_TYPE, AssetInOut } from "../../types";
import { SeaPortItemType, SeaPortPayload } from "../../types/seaport";
import { Domain, EIP712Protocol, VisualizationResult } from "../../types/visualizer";
import { isSameAddress } from "../../utils";

export const isCorrectDomain = (domain: Domain) => {
  return (
    supportedChains.includes(Number(domain.chainId)) &&
    addressesBook.includes(domain.verifyingContract.toLocaleLowerCase())
  );
};

export const visualize = (
  message: SeaPortPayload,
  domain: Domain
): VisualizationResult => {
  if (!isCorrectDomain(domain)) throw new Error("wrong seaport domain");

  const assetsOut: AssetInOut[] = [];
  const assetsIn: AssetInOut[] = [];

  // Offers logic
  message.offer.forEach((offer) => {
    const amounts = [offer.startAmount];

    // Auction case, endAmount and startAmount might not be equal
    if (offer.endAmount !== offer.startAmount) {
      // English Auction(Highest bid)
      if (BigInt(offer.endAmount) > BigInt(offer.startAmount)) {
        amounts.push(offer.endAmount);
      }
      // Dutch Auction(decreasing price)
      else {
        amounts.unshift(offer.endAmount);
      }
    }

    const offerType = Number(offer.itemType);
    const assetType = getSeaportAssetType(offerType);

    switch (offerType) {
      case SeaPortItemType.ERC1155:
      case SeaPortItemType.ERC721:
        assetsOut.push({
          address: offer.token,
          type: assetType,
          id: offer.identifierOrCriteria,
          amounts,
        });
        break;

      case SeaPortItemType.ERC20:
        assetsOut.push({
          address: offer.token,
          type: assetType,
          amounts,
        });
        break;

      case SeaPortItemType.ERC1155_WITH_CRITERIA:
      case SeaPortItemType.ERC721_WITH_CRITERIA:
        assetsOut.push({
          address: offer.token,
          type: assetType,
          amounts,
        });
        break;
    }
  });

  // Price logic
  message.consideration.forEach((item) => {
    // consider on the assets where the offerer is the receiver
    if (!isSameAddress(item.recipient, message.offerer)) return;

    const amounts = [item.startAmount];

    // Auction case, endAmount and startAmount might not be equal
    if (item.endAmount !== item.startAmount) {
      // English Auction(Highest bid)
      if (BigInt(item.endAmount) > BigInt(item.startAmount)) {
        amounts.push(item.endAmount);
      }
      // Dutch Auction(decreasing price)
      else {
        amounts.unshift(item.endAmount);
      }
    }
    const considerationType = Number(item.itemType);
    const assetType = getSeaportAssetType(considerationType);

    switch (considerationType) {
      case SeaPortItemType.ERC1155:
      case SeaPortItemType.ERC721:
        assetsIn.push({
          address: item.token,
          type: assetType,
          id: item.identifierOrCriteria,
          amounts,
        });
        break;

      case SeaPortItemType.ERC20:
      case SeaPortItemType.NATIVE:
        assetsIn.push({
          address: item.token,
          type: assetType,
          amounts,
        });
        break;

      case SeaPortItemType.ERC1155_WITH_CRITERIA:
      case SeaPortItemType.ERC721_WITH_CRITERIA:
        assetsIn.push({
          address: item.token,
          type: assetType,
          id: "",
          amounts,
        });
        break;
    }
  });

  return {
    protocol: PROTOCOL_ID.OPENSEA_SEAPORT,
    liveness: {
      from: Number(message.startTime) * 1000,
      to: Number(message.endTime) * 1000,
    },
    assetsIn,
    assetsOut,
    approvals: [],
  };
};

const getSeaportAssetType = (seaportItemType: SeaPortItemType): ASSET_TYPE => {
  switch (seaportItemType) {
    case SeaPortItemType.ERC1155:
    case SeaPortItemType.ERC1155_WITH_CRITERIA:
      return ASSET_TYPE.ERC1155;

    case SeaPortItemType.ERC721:
    case SeaPortItemType.ERC721_WITH_CRITERIA:
      return ASSET_TYPE.ERC721;

    case SeaPortItemType.ERC20:
      return ASSET_TYPE.ERC20;

    case SeaPortItemType.NATIVE:
      return ASSET_TYPE.NATIVE;
  }
};

const supportedChains = [
  1, //Ethereum
  5, //Goerli
  56, //BSC
  97, //BSC Testnet
  11155111, //Sepolia
  137, //Polygon
  80001, //Mumbai
  10, //Optimism
  69, //Optimism Goerli
  42161, //Arbitrum One
  421613, //Arbitrum Goerli
  42170, //Arbitrum Nova
  43114, //Avalanche C-Chain
  43113, //Avalanche Fuji Testnet
  100, //Gnosis
  8217, //Klaytn
  1001, //Baobab
];

/**
 * @dev both v1.2 and v1.3 are not mentioned in the seaport deployment github repo nor in the seaport-js SDK
 * and there's a note regarding some limitation so we decided to not support them
 * @see https://github.com/ProjectOpenSea/seaport#deployments-by-evm-chain
 * @see https://github.com/ProjectOpenSea/seaport-js/blob/main/src/constants.ts#L5
 * @see https://docs.opensea.io/changelog/seaport-1-5-release
 */
const addressesBook = [
  "0x00000000000000adc04c56bf30ac9d3c0aaf14dc", //v1.5 https://docs.opensea.io/changelog/seaport-1-5-release
  "0x00000000000001ad428e4906aE43D8F9852d0dD6", //v1.4
  "0x00000000006c3852cbEf3e08E8dF289169EdE581", //v1.1
].map((e) => e.toLocaleLowerCase());

const seaport: EIP712Protocol<SeaPortPayload> = {
  isCorrectDomain,
  visualize,
};
export default seaport;
