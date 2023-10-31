const _TIME_START_MASK = BigInt(
  "0xFFFFFFFF00000000000000000000000000000000000000000000000000000000"
);
const _DURATION_MASK = BigInt(
  "0x00000000FFFFFF00000000000000000000000000000000000000000000000000"
);
const _TIME_START_SHIFT = BigInt(224);
const _DURATION_SHIFT = BigInt(200);

export const getAuctionStartTime = (salt: string) =>
  (BigInt(salt) & _TIME_START_MASK) >> _TIME_START_SHIFT;

export const getAuctionEndTime = (salt: string) =>
  (getAuctionStartTime(salt) + (BigInt(salt) & _DURATION_MASK)) >> _DURATION_SHIFT;
