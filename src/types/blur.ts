export enum BlurIoSide {
  Buy,
  Sell,
}

export type BlurIoFee = {
  rate: string;
  recipient: string;
};

export type BlurIoOrder = {
  trader: string;
  side: BlurIoSide | string | number;
  matchingPolicy: string;
  collection: string;
  tokenId: string;
  amount: string;
  paymentToken: string;
  price: string;
  listingTime: string;
  /* Order expiration timestamp - 0 for oracle cancellations. */
  expirationTime: string;
  fees: BlurIoFee[];
  salt: string;
  extraParams: string;
};
