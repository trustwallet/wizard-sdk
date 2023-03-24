const blurIoListing = {
  trader: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
  side: 1,
  matchingPolicy: "0x0000000000daB4A563819e8fd93dbA3b25BC3495",
  collection: "0x90c70Dc9f3FDa4a1D78a2B7D90CA087088355717",
  tokenId: "12743",
  amount: "1",
  paymentToken: "0x0000000000000000000000000000000000000000",
  price: "800000000000000000",
  listingTime: "1677736151",
  expirationTime: "1678340951",
  fees: [
    {
      rate: "500",
      recipient: "0xc746A9A9C18159be5C29CaF74628c1EbdAEeC6E0",
    },
  ],
  salt: "292406351601814894369438777478694694865",
  extraParams: "0x01",
  nonce: 0,
};

const blurIoBid = {
  trader: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
  side: 0,
  matchingPolicy: "0x0000000000daB4A563819e8fd93dbA3b25BC3495",
  collection: "0x90c70Dc9f3FDa4a1D78a2B7D90CA087088355717",
  tokenId: "12743",
  amount: "1",
  paymentToken: "0x0000000000000000000000000000000000000000",
  price: "800000000000000000",
  listingTime: "1677736151",
  expirationTime: "1678340951",
  fees: [
    {
      rate: "500",
      recipient: "0xc746A9A9C18159be5C29CaF74628c1EbdAEeC6E0",
    },
  ],
  salt: "292406351601814894369438777478694694865",
  extraParams: "0x01",
  nonce: 0,
};

const blurIoCollectionBid = {
  trader: "0x377e19e0d6525f5fabd565bc47dc4e5fc8bafb01",
  side: "0",
  matchingPolicy: "0x0000000000b92d5d043faf7cecf7e2ee6aaed232",
  collection: "0xf048cbaad26c1a35e7a04e126fdeb9c8045e676b",
  tokenId: "0",
  amount: "1",
  paymentToken: "0x0000000000a39bb272e79075ade125fd351887ac",
  price: "10000000000000000",
  listingTime: "1678461048",
  expirationTime: "1709997048",
  fees: [],
  salt: "315013322803695493589111125446364985004",
  extraParams: "0x01",
  nonce: "0",
};

Object.freeze(blurIoListing);
Object.freeze(blurIoBid);
Object.freeze(blurIoCollectionBid);

export { blurIoListing, blurIoBid, blurIoCollectionBid };
