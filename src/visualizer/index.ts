import { PermitMessage } from "../types";

import { BlurIoOrder } from "../types/blur";
import { LooksrareMakerOrderWithEncodedParams } from "../types/looksrare";
import { OneinchFusionOrder } from "../types/oneinch-fusion";
import { SeaPortPayload } from "../types/seaport";

import blurIo from "./blur-io";
import erc20Permit from "./erc20-permit";
import looksrare from "./looksrare";
import looksrareV2 from "./looksrare-v2";
import oneinchFusion from "./oneinch-fusion";
import seaport from "./seaport";
import { Domain, VisualizationResult } from "../types/visualizer";
import { WizardError } from "../utils";
import { LooksRareV2MakerOrder } from "../types/looksrare-v2";

export enum PROTOCOL_ID {
  OPENSEA_SEAPORT = "OPENSEA_SEAPORT",
  LOOKSRARE_EXCHANGE = "LOOKSRARE_EXCHANGE",
  LOOKSRARE_EXCHANGE_V2 = "LOOKSRARE_EXCHANGE_V2",
  BLUR_IO_MARKETPLACE = "BLUR_IO_MARKETPLACE",
  ERC20_PERMIT = "ERC20_PERMIT",
  ONEINCH_FUSION = "ONEINCH_FUSION",
}

export const getProtocolId = (domain: Domain): PROTOCOL_ID | undefined => {
  if (seaport.isCorrectDomain(domain)) return PROTOCOL_ID.OPENSEA_SEAPORT;
  if (blurIo.isCorrectDomain(domain)) return PROTOCOL_ID.BLUR_IO_MARKETPLACE;
  if (looksrareV2.isCorrectDomain(domain)) return PROTOCOL_ID.LOOKSRARE_EXCHANGE_V2;
  if (looksrare.isCorrectDomain(domain)) return PROTOCOL_ID.LOOKSRARE_EXCHANGE;
  if (oneinchFusion.isCorrectDomain(domain)) return PROTOCOL_ID.ONEINCH_FUSION;

  return;
};

/**
 * @param {T} message EIP-712 message
 * @param {Domain} domain EIP-712 domain
 * @returns {VisualizationResult} assets impact and message liveness
 * @throws {Error}
 */
export default async function visualize<T extends object>(
  message: T,
  domain: Domain
): Promise<VisualizationResult> {
  const protocolId = getProtocolId(domain);

  switch (protocolId) {
    case PROTOCOL_ID.OPENSEA_SEAPORT:
      return seaport.visualize(message as SeaPortPayload, domain);

    case PROTOCOL_ID.LOOKSRARE_EXCHANGE_V2:
      return looksrareV2.visualize(message as LooksRareV2MakerOrder, domain);

    case PROTOCOL_ID.LOOKSRARE_EXCHANGE:
      return looksrare.visualize(message as LooksrareMakerOrderWithEncodedParams, domain);

    case PROTOCOL_ID.BLUR_IO_MARKETPLACE:
      return blurIo.visualize(message as BlurIoOrder, domain);

    case PROTOCOL_ID.ONEINCH_FUSION:
      return oneinchFusion.visualize(message as OneinchFusionOrder, domain);

    default:
      if (erc20Permit.isERC20Permit(message)) {
        return erc20Permit.visualize(message as PermitMessage, domain);
      }

      throw new WizardError("Unrecognized/Unsupported EIP712Protocol Domain");
  }
}
