import { Domain, Result, VisualizationMessage } from "../types";
import { SeaPortPayload } from "../types/seaport";
import seaport from "./seaport";

export enum PROTOCOL_ID {
  OPENSEA_SEAPORT = "OPENSEA_SEAPORT",
  LOOKSRARE_EXCHANGE = "LOOKSRARE_EXCHANGE",
  BLUR_IO_MARKETPLACE = "BLUR_IO_MARKETPLACE",
}

export const getProtocolId = (domain: Domain): PROTOCOL_ID | undefined => {
  if (seaport.isCorrectDomain(domain)) return PROTOCOL_ID.OPENSEA_SEAPORT;
  return;
};

export default async function visualize(
  message: VisualizationMessage,
  domain: Domain
): Promise<Result | undefined> {
  const protocolId = getProtocolId(domain);

  switch (protocolId) {
    case PROTOCOL_ID.OPENSEA_SEAPORT:
      return seaport.visualize(message as SeaPortPayload, domain);
      break;

    default:
      return;
  }
}
