import { nodeRealFactory } from "../../../src/simulator/providers";

import axios from "axios";
import { swapSimulationResultsExample } from "../data/simulation-example";

jest.mock("axios");

describe("Simulator NodeReal Provider", () => {
  it("should return DebugProvider instance for Ethereum network", () => {
    const debugProvider = nodeRealFactory("API-KEY", 1);
    expect(debugProvider.chainId).toEqual(1);
    expect(debugProvider.debugTrace).toBeDefined();
  });

  it("should return DebugProvider instance for BSC network", () => {
    const debugProvider = nodeRealFactory("API-KEY", 56);
    expect(debugProvider.chainId).toEqual(56);
    expect(debugProvider.debugTrace).toBeDefined();
  });

  it("should throw for unsupported network", () => {
    expect(() => nodeRealFactory("API-KEY", 6)).toThrow();
  });

  it("should call NodeReal simulation endpoint if debugTracer is called", async () => {
    const debugProvider = nodeRealFactory("API-KEY", 1);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    axios.post.mockResolvedValueOnce({ data: swapSimulationResultsExample });

    await debugProvider.debugTrace({
      from: "0x2",
      to: "0x1",
      gas: 1,
      calldata: "0xc",
      chainId: 1,
    });

    expect(axios.post).toBeCalledTimes(1);
  });

  it("should Throw is simulation is not successful", async () => {
    const debugProvider = nodeRealFactory("API-KEY", 1);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    axios.post.mockResolvedValueOnce({
      data: {
        errorCode: 1993,
        message: "Some transaction errors",
      },
    });

    await expect(
      debugProvider.debugTrace({
        from: "0x2",
        to: "0x1",
        gas: 1,
        calldata: "0xc",
        chainId: 1,
      })
    ).rejects.toThrow();

    expect(axios.post).toBeCalledTimes(2);
  });
});
