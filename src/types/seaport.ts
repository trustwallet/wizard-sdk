/**
 * @dev opensea seaport struct types
 * @see https://docs.opensea.io/v2.0/reference/seaport-structs
 */
export type SeaPortPayload = {
  offerer: string;
  zone: string;
  offer: {
    itemType: SeaPortItemType;
    token: string;
    identifierOrCriteria: string;
    startAmount: string;
    endAmount: string;
  }[];
  consideration: {
    itemType: SeaPortItemType;
    token: string;
    identifierOrCriteria: string;
    startAmount: string;
    endAmount: string;
    recipient: string;
  }[];
  orderType: SeaPortOrderType;
  startTime: string;
  endTime: string;
  zoneHash: string;
  salt: string;
  conduitKey: string;
  counter: string;
};

export enum SeaPortItemType {
  NATIVE = 0,
  ERC20 = 1,
  ERC721 = 2,
  ERC1155 = 3,
  ERC721_WITH_CRITERIA = 4,
  ERC1155_WITH_CRITERIA = 5,
}

export enum SeaPortOrderType {
  FULL_OPEN = 0,
  PARTIAL_OPEN = 1,
  FULL_RESTRICTED = 2,
  PARTIAL_RESTRICTED = 3,
}
