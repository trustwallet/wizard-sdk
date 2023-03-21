import { Domain } from "../../../src/types";
import visualizer from "../../../src/visualizer";
import {
  seaportBid,
  seaportBundleListing,
  seaportCollectionOfferAnyToken,
  seaportCollectionOfferSpecificTrait,
  seaportDutchAuction,
  seaportEnglishAuction,
  seaportSellMessagePayload,
} from "./data";

describe("visualizer", () => {
  describe("seaport v1.1", () => {
    const seaPortDomainVersion2: Domain = {
      verifyingContract: "0x00000000006c3852cbEf3e08E8dF289169EdE581",
      name: "Seaport",
      version: "1.1",
      chainId: "1",
    };

    it("should return undefined with wrong chain id", async () => {
      const result = await visualizer(seaportSellMessagePayload, {
        chainId: "3",
        verifyingContract: seaPortDomainVersion2.verifyingContract,
        name: seaPortDomainVersion2.name,
        version: seaPortDomainVersion2.version,
      });
      expect(result).toBeUndefined();
    });

    it("should successfully visualize sell order", async () => {
      const result = await visualizer(seaportSellMessagePayload, seaPortDomainVersion2);

      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        liveness: { from: 1678465649000, to: 1678724843000 },
        assetIn: [
          {
            address: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
            type: "ERC721",
            id: "16344",
            amount: "1",
            amounts: ["1"],
          },
        ],
        assetOut: [
          {
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            type: "ERC20",
            amount: "4000000000000000",
            amounts: ["4000000000000000"],
          },
        ],
      });
    });

    it("should successfully visualize collection offer on a specific trait", async () => {
      const result = await visualizer(
        seaportCollectionOfferSpecificTrait,
        seaPortDomainVersion2
      );

      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        liveness: {
          from: 1677592745000,
          to: 1678197528000,
        },
        assetIn: [
          {
            address: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
            type: "ERC721",
            id: "",
            amount: "5",
            amounts: ["5"],
          },
        ],
        assetOut: [
          {
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            type: "ERC20",
            amount: "100000000000000000",
            amounts: ["100000000000000000"],
          },
        ],
      });
    });

    it("should successfully visualize collection offer on any token", async () => {
      const result = await visualizer(
        seaportCollectionOfferAnyToken,
        seaPortDomainVersion2
      );
      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        assetIn: [
          {
            address: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
            type: "ERC721",
            id: "",
            amount: "3",
            amounts: ["3"],
          },
        ],
        assetOut: [
          {
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            type: "ERC20",
            amount: "90000000000000000",
            amounts: ["90000000000000000"],
          },
        ],
        liveness: {
          from: 1677592745000,
          to: 1678197528000,
        },
      });
    });

    it("should successfully visualize bundle listing", async () => {
      const result = await visualizer(seaportBundleListing, seaPortDomainVersion2);

      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        assetIn: [
          {
            address: "0x0000000000000000000000000000000000000000",
            type: "NATIVE",
            amount: "4975000000000000000",
            amounts: ["4975000000000000000"],
          },
        ],
        assetOut: [
          {
            address: "0x2d33Bfe1c867346543Ac245396DFc6c3EBc8534F",
            type: "ERC721",
            id: "1223",
            amount: "1",
            amounts: ["1"],
          },
          {
            address: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
            type: "ERC721",
            id: "28055722494445081938143406270964393509249427241382713345351022514386455812231",
            amount: "1",
            amounts: ["1"],
          },
        ],
        liveness: {
          from: 1677130860000,
          to: 1677303660000,
        },
      });
    });

    it("should successfully visualize seaport bid", async () => {
      const result = await visualizer(seaportBid, seaPortDomainVersion2);

      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        assetIn: [
          {
            address: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
            type: "ERC721",
            id: "7649",
            amount: "1",
            amounts: ["1"],
          },
        ],
        assetOut: [
          {
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            type: "ERC20",
            amount: "100000000000000000",
            amounts: ["100000000000000000"],
          },
        ],
        liveness: {
          from: 1677130860000,
          to: 1677303660000,
        },
      });
    });

    it("should successfully visualize English auction", async () => {
      const result = await visualizer(seaportEnglishAuction, seaPortDomainVersion2);

      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        assetIn: [
          {
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            type: "ERC20",
            amount: "950000000000000000",
            amounts: ["950000000000000000"],
          },
        ],
        assetOut: [
          {
            address: "0x2d33Bfe1c867346543Ac245396DFc6c3EBc8534F",
            type: "ERC721",
            id: "1223",
            amount: "1",
            amounts: ["1"],
          },
        ],
        liveness: {
          from: 1677130860000,
          to: 1677303660000,
        },
      });
    });

    it("should successfully visualize Dutch auction", async () => {
      const result = await visualizer(seaportDutchAuction, seaPortDomainVersion2);

      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        assetIn: [
          {
            address: "0x0000000000000000000000000000000000000000",
            type: "NATIVE",
            amount: "760000000000000000",
            amounts: ["760000000000000000", "950000000000000000"],
          },
        ],
        assetOut: [
          {
            address: "0x2d33Bfe1c867346543Ac245396DFc6c3EBc8534F",
            type: "ERC721",
            id: "1223",
            amount: "1",
            amounts: ["1"],
          },
        ],
        liveness: {
          from: 1680010140000,
          to: 1680269340000,
        },
      });
    });
  });
});
