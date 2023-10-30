/**
 * @dev 1inch fusion auction salt mask constants
 * @see https://github.com/1inch/fusion-sdk/blob/4b76e9c232276742f879f3495e452dfc667b5a3a/src/auction-salt/parser/constants.ts
 */
const START_TIME_MASK = BigInt(
  "0xFFFFFFFF00000000000000000000000000000000000000000000000000000000"
);
const DURATION_MASK = BigInt(
  "0x00000000FFFFFF00000000000000000000000000000000000000000000000000"
);
const START_TIME_SHIFT = BigInt(224);
const DURATION_SHIFT = BigInt(200);

/**
 * @dev get the auction start and end time from the salt
 * @see https://github.com/1inch/fusion-sdk/blob/4b76e9c232276742f879f3495e452dfc667b5a3a/src/auction-salt/parser/parser.ts#L15-L27
 */
export const getAuctionTime = (salt: string): { startTime: number; endTime: number } => {
  const startTime = getAuctionStartTime(salt);
  const duration = getAuctionDuration(salt);

  return {
    startTime: Number(startTime),
    endTime: Number(startTime + duration),
  };
};

const getAuctionStartTime = (salt: string) =>
  (BigInt(salt) & START_TIME_MASK) >> START_TIME_SHIFT;

const getAuctionDuration = (salt: string) =>
  (BigInt(salt) & DURATION_MASK) >> DURATION_SHIFT;
