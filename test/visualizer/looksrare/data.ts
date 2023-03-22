const looksrareNormalListing = {
  isOrderAsk: true,
  signer: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
  collection: "0x90c70Dc9f3FDa4a1D78a2B7D90CA087088355717",
  price: "200000000000000000",
  tokenId: "12743",
  amount: "1",
  strategy: "0x579af6FD30BF83a5Ac0D636bc619f98DBdeb930c",
  currency: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  nonce: "100",
  startTime: "1677588653",
  endTime: "1680266940",
  minPercentageToAsk: "9800",
  params: "0x",
};

const looksrareCollectionBid = {
  isOrderAsk: "false",
  signer: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
  collection: "0x90c70Dc9f3FDa4a1D78a2B7D90CA087088355717",
  price: "1000000000000000",
  tokenId: "0",
  amount: "10",
  strategy: "0x09F93623019049c76209C26517AcC2aF9d49c69b",
  currency: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  nonce: "100",
  startTime: "1677588943",
  endTime: "1677675336",
  minPercentageToAsk: "9800",
  params: "0x",
};

const looksrareBid = {
  isOrderAsk: false,
  signer: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
  collection: "0x90c70Dc9f3FDa4a1D78a2B7D90CA087088355717",
  price: "1000000000000000",
  tokenId: "9268",
  amount: "1",
  strategy: "0x579af6FD30BF83a5Ac0D636bc619f98DBdeb930c",
  currency: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  nonce: "100",
  startTime: "1677588943",
  endTime: "1677675336",
  minPercentageToAsk: "9800",
  params: "0x",
};

Object.freeze(looksrareNormalListing);
Object.freeze(looksrareCollectionBid);
Object.freeze(looksrareBid);

export { looksrareNormalListing, looksrareCollectionBid, looksrareBid };
