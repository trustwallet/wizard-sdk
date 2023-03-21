import { FALSE, ZERO_ADDRESS, addressFrom32bytesTo20bytes } from "../src/utils";

describe("utils", () => {
  it("should convert 32bytes to 20bytes address", () => {
    expect(addressFrom32bytesTo20bytes(FALSE)).toEqual(ZERO_ADDRESS);
  });
});
