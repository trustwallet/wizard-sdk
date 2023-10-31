/**
 * @see https://docs.looksrare.org/developers/protocol/order-types-v2
 */

import { PROTOCOL_ID } from "..";
import { ASSET_TYPE, AssetInOut } from "../../types";
import { OneInchLimitOrderV3 } from "../../types/oneinch";
import { Domain, EIP712Protocol, VisualizationResult } from "../../types/visualizer";
import { WizardError, getPaymentAssetType } from "../../utils";
import { getAuctionEndTime, getAuctionStartTime } from "./utils";

const { ERC1155, ERC721 } = ASSET_TYPE;

export const isCorrectDomain = (domain: Domain) => {
  return (
    supportedChains.includes(Number(domain.chainId)) &&
    addressesBook.includes(domain.verifyingContract.toLocaleLowerCase())
  );
};

export const visualize = (
  message: OneInchLimitOrderV3,
  domain: Domain
): VisualizationResult => {
  if (!isCorrectDomain(domain)) throw new Error("wrong looksrare-v2 domain");

  return {
    protocol: PROTOCOL_ID.ONE_INCH,
    // If order is an ask, user is selling an NFT for an asset in return
    assetsIn: [],
    assetsOut: [],
    liveness: {
      from: getAuctionStartTime(message.salt),
      to: getAuctionEndTime(message.salt),
    },
    approvals: [],
  };
};

/**
 * @see https://github.com/1inch/fusion-sdk/blob/main/src/constants.ts
 */
const supportedChains = [
  1, // Ethereum Mainnet
  137, // Polygon
  56, // Binance Smart Chain
  42161, // Arbitrum
  43114, // Avalanche
  10, // Optimism
  250, // Fantom
  100, // Gnosis
  1313161554, // Aurora,
  8217, // Klaytn
  42, // Kovan
];

/**
 * @see https://github.com/1inch/fusion-sdk/blob/main/src/constants.ts
 */
const addressesBook = [
  "0x119c71D3BbAC22029622cbaEc24854d3D32D2828", // Ethereum Mainnet LimitOrderProtocol
  "0x1e38Eff998DF9d3669E32f4ff400031385Bf6362", // Binance Smart Chain LimitOrderProtocol
  "0x94Bc2a1C732BcAd7343B25af48385Fe76E08734f", // Polygon LimitOrderProtocol
  "0x7F069df72b7A39bCE9806e3AfaF579E54D8CF2b9", // Arbitrum LimitOrderProtocol
  "0x0F85A912448279111694F4Ba4F85dC641c54b594", // Avalanche LimitOrderProtocol
  "0x11431a89893025D2a48dCA4EddC396f8C8117187", // Optimism LimitOrderProtocol
  "0x11DEE30E710B8d4a8630392781Cc3c0046365d4c", // Fantom LimitOrderProtocol
  "0x54431918cEC22932fCF97E54769F4E00f646690F", // Gnosis LimitOrderProtocol
  "0xA31bB36c5164B165f9c36955EA4CcBaB42B3B28E", // Aurora LimitOrderProtocol
  "0xE295aD71242373C37C5FdA7B57F26f9eA1088AFe", // Klaytn LimitOrderProtocol
  "0xa218543cc21ee9388Fa1E509F950FD127Ca82155", // Kovan LimitOrderProtocol
].map((e) => e.toLocaleLowerCase());

const looksrare: EIP712Protocol<LooksRareV2MakerOrder> = {
  isCorrectDomain,
  visualize,
};
export default looksrare;
