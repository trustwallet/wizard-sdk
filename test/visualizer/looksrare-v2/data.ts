const looksrareV2NormalListing = {
  quoteType: 1,
  globalNonce: "0",
  subsetNonce: "0",
  orderNonce: "0",
  strategyId: 0,
  collectionType: 0,
  collection: "0x5f04D47D698F79d76F85E835930170Ff4c4EBdB7",
  currency: "0x0000000000000000000000000000000000000000",
  signer: "0x000075B45Dff84C00Cf597d5C3E766108CeA0000",
  startTime: "1684302184",
  endTime: "1686893895",
  price: "100000000000000000",
  itemIds: ["99117"],
  amounts: ["1"],
  additionalParameters: "0x",
};

const looksrareV2CollectionBid = {
  quoteType: 0,
  globalNonce: "0",
  subsetNonce: "0",
  orderNonce: "0",
  strategyId: 1,
  collectionType: 0,
  collection: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
  currency: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  signer: "0x000075B45Dff84C00Cf597d5C3E766108CeA0000",
  startTime: "1684302184",
  endTime: "1686893895",
  price: "100000000000000000",
  itemIds: [],
  amounts: ["1"],
  additionalParameters: "0x",
};

const looksrareV2Bid = {
  quoteType: 0,
  globalNonce: "0",
  subsetNonce: "0",
  orderNonce: "0",
  strategyId: 0,
  collectionType: 2,
  collection: "0x005AF388653567Af2F388E6224dC7C4b3241C500",
  currency: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  signer: "0x000075B45Dff84C00Cf597d5C3E766108CeA0000",
  startTime: "1684302184",
  endTime: "1686893895",
  price: "100000000000000000",
  itemIds: ["1500"],
  amounts: ["10"],
  additionalParameters: "0x",
};

Object.freeze(looksrareV2NormalListing);
Object.freeze(looksrareV2CollectionBid);
Object.freeze(looksrareV2Bid);

export { looksrareV2NormalListing, looksrareV2CollectionBid, looksrareV2Bid };
