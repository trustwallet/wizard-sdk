export enum Side {
  Buy,
  Sell,
}

export type Fee = {
  rate: string;
  recipient: string;
};

export type Order = {
  trader: string;
  side: Side;
  matchingPolicy: string;
  collection: string;
  tokenId: string;
  amount: string;
  paymentToken: string;
  price: string;
  listingTime: string;
  /* Order expiration timestamp - 0 for oracle cancellations. */
  expirationTime: string;
  fees: Fee[];
  salt: string;
  extraParams: string;
};
