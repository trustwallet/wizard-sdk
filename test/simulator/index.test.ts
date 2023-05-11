import { Simulator } from "../../src";
import { swapSimulationResultsExample } from "./data/simulation-example";

describe("Simulator", () => {
  it("should process trace data for ERC20, Native, ERC1155 and ERC721", async () => {
    const debugTrace = async () => {
      return [swapSimulationResultsExample.result as any];
    };
    const simulator = new Simulator([{ chainId: 1, debugTrace }]);

    const result = await simulator.simulate({
      from: "0x377e19e0D6525f5fABd565bc47dc4e5FC8Bafb01",
      to: "0x1111111254eeb25477b68fb85ed929f73a960582",
      calldata: "0x",
      gas: 1,
      value: "0x82F79CD9000",
      chainId: 1,
    });

    expect(result).toEqual({
      transfers: [
        {
          address: "0x0000000000000000000000000000000000000000",
          type: "NATIVE",
          from: "0x377e19e0d6525f5fabd565bc47dc4e5fc8bafb01",
          to: "0x1111111254eeb25477b68fb85ed929f73a960582",
          amounts: ["9000000000000"],
          id: "",
        },
        {
          address: "0x0000000000000000000000000000000000000000",
          type: "NATIVE",
          from: "0x1111111254eeb25477b68fb85ed929f73a960582",
          to: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          amounts: ["9000000000000"],
          id: "",
        },
        {
          address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          type: "ERC20",
          from: "0x1111111254eeb25477b68fb85ed929f73a960582",
          to: "0xc3d03e4f041fd4cd388c549ee2a29a9e5075882f",
          amounts: ["9000000000000"],
        },
        {
          address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          type: "ERC721",
          from: "0x1111111254eeb25477b68fb85ed929f73a960582",
          to: "0xc3d03e4f041fd4cd388c549ee2a29a9e5075882f",
          id: "9000000000000",
        },
        {
          address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          type: "ERC1155",
          from: "0x377e19e0d6525f5fabd565bc47dc4e5fc8bafb01",
          to: "0x377e19e0d6525f5fabd565bc47dc4e5fc8bafb01",
          operator: "0xc3d03e4f041fd4cd388c549ee2a29a9e5075882f",
          amounts: ["16404456013677256"],
          id: "16404456013677256",
        },
        {
          address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          type: "ERC1155",
          from: "0x377e19e0d6525f5fabd565bc47dc4e5fc8bafb01",
          to: "0x377e19e0d6525f5fabd565bc47dc4e5fc8bafb01",
          operator: "0xc3d03e4f041fd4cd388c549ee2a29a9e5075882f",
          amounts: ["1"],
          id: "1",
        },
      ],
      approvals: [
        {
          address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          type: "ERC721",
          owner: "0x1111111254eeb25477b68fb85ed929f73a960582",
          operator: "0x1111111254eeb25477b68fb85ed929f73a960582",
          approveForAllStatus: true,
        },
        {
          address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          type: "ERC20",
          owner: "0xc3d03e4f041fd4cd388c549ee2a29a9e5075882f",
          operator: "0x377e19e0d6525f5fabd565bc47dc4e5fc8bafb01",
          amounts: ["16404456013677256"],
        },
        {
          address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          type: "ERC721",
          owner: "0xc3d03e4f041fd4cd388c549ee2a29a9e5075882f",
          operator: "0x377e19e0d6525f5fabd565bc47dc4e5fc8bafb01",
          id: "16404456013677256",
        },
      ],
    });
  });

  it("should throw if there's a simulation error", async () => {
    const debugTrace = async () => {
      return [{ error: {}, output: "0x0000" } as any];
    };
    const simulator = new Simulator([{ chainId: 1, debugTrace }]);

    await expect(
      simulator.simulate({
        from: "0x377e19e0D6525f5fABd565bc47dc4e5FC8Bafb01",
        to: "0x1111111254eeb25477b68fb85ed929f73a960582",
        calldata: "0x",
        gas: 1,
        value: "0x82F79CD9000",
        chainId: 1,
      })
    ).rejects.toThrow("Transaction will fail with error: '0x0000'");
  });

  it("should throw if chain is not supported", async () => {
    const debugTrace = async () => {
      return [{ error: {} } as any];
    };
    const simulator = new Simulator([{ chainId: 1, debugTrace }]);

    await expect(
      simulator.simulate({
        from: "0x377e19e0D6525f5fABd565bc47dc4e5FC8Bafb01",
        to: "0x1111111254eeb25477b68fb85ed929f73a960582",
        calldata: "0x",
        gas: 1,
        value: "0x82F79CD9000",
        chainId: 2,
      })
    ).rejects.toThrow("unsupported chain_id: 2");
  });

  it("should throw if 'chainId' is undefined", async () => {
    const debugTrace = async () => {
      return [{} as any];
    };
    const simulator = new Simulator([{ chainId: 1, debugTrace }]);

    await expect(
      simulator.simulate({
        from: "0x377e19e0D6525f5fABd565bc47dc4e5FC8Bafb01",
        to: "0x1111111254eeb25477b68fb85ed929f73a960582",
        calldata: "0x",
        gas: 1,
        value: "0x82F79CD9000",
        chainId: undefined as any,
      })
    ).rejects.toThrow("undefined chainId param");
  });

  it("should throw if 'from' is undefined", async () => {
    const debugTrace = async () => {
      return [{} as any];
    };
    const simulator = new Simulator([{ chainId: 1, debugTrace }]);

    await expect(
      simulator.simulate({
        from: "",
        to: "0x1111111254eeb25477b68fb85ed929f73a960582",
        calldata: "0x",
        gas: 1,
        value: "0x82F79CD9000",
        chainId: 1,
      })
    ).rejects.toThrow("undefined from param");
  });

  it("should throw if 'to' is undefined", async () => {
    const debugTrace = async () => {
      return [{} as any];
    };
    const simulator = new Simulator([{ chainId: 1, debugTrace }]);

    await expect(
      simulator.simulate({
        to: "",
        from: "0x1111111254eeb25477b68fb85ed929f73a960582",
        calldata: "0x",
        gas: 1,
        value: "0x82F79CD9000",
        chainId: 1,
      })
    ).rejects.toThrow("undefined to param");
  });

  it("should throw if 'calldata' is undefined", async () => {
    const debugTrace = async () => {
      return [{} as any];
    };
    const simulator = new Simulator([{ chainId: 1, debugTrace }]);

    await expect(
      simulator.simulate({
        to: "0x1111111254eeb25477b68fb85ed929f73a960582",
        from: "0x1111111254eeb25477b68fb85ed929f73a960582",
        calldata: "",
        gas: 1,
        value: "0x82F79CD9000",
        chainId: 1,
      })
    ).rejects.toThrow("undefined calldata param");
  });
});
