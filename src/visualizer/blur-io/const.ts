/// @dev fees denominator
export const BLUR_IO_INVERSE_BASIS_POINT = 10_000;

/// @dev native ETH bidding pool address
export const BLUR_IO_POOL_ADDRESS =
  "0x0000000000a39bb272e79075ade125fd351887ac".toLocaleLowerCase();

// blur.io policies
const BLUR_IO_STANDARD_POLICY_ERC721 =
  "0x00000000006411739da1c40b106f8511de5d1fac".toLocaleLowerCase();
const BLUR_IO_STANDARD_POLICY_ERC721_WITH_ORACLE =
  "0x0000000000dab4a563819e8fd93dba3b25bc3495".toLocaleLowerCase();
export const BLUR_IO_COLLECTION_BID_POLICY =
  "0x0000000000b92d5d043faf7cecf7e2ee6aaed232".toLocaleLowerCase();
/**
 * @dev make sure that the address key is lower case
 */
const validPolicies = {
  [BLUR_IO_STANDARD_POLICY_ERC721]: true,
  [BLUR_IO_STANDARD_POLICY_ERC721_WITH_ORACLE]: true,
  [BLUR_IO_COLLECTION_BID_POLICY]: true,
};

/**
 * @dev blur.io order matching policies
 *      - MUST make sure that addresses are lower case to avoid False Positive caused by checksum
 * @see https://www.notion.so/trustwallet/Blur-8afbcb6a262d488181a8c9ea417e7ce6?pvs=4#0ce31761c4d940d2bfeecfb268bb702d
 * @param {HexaString} address the patching policy address, this param will get lower cased internally
 * @returns {boolean} true if valid, false if not
 */
export const isValidBlurIoPolicy = (address: string): boolean => {
  return validPolicies[address.toLocaleLowerCase()];
};
