import { Domain } from "../../../src/types/visualizer";
import visualizer from "../../../src/visualizer";
import seaport from "../../../src/visualizer/seaport";

import {
  seaportBid,
  seaportBundleListing,
  seaportCollectionOfferAnyToken,
  seaportCollectionOfferSpecificTrait,
  seaportDutchAuction,
  seaportEnglishAuction,
  seaportReverseDutchAuction,
  seaportReverseEnglishAuction,
  seaportSellMessagePayload,
  sellAnyERC1155WithCriteria,
  sellAnyERC721WithCriteria,
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
      await expect(
        visualizer(seaportSellMessagePayload, {
          chainId: "3",
          verifyingContract: seaPortDomainVersion2.verifyingContract,
          name: seaPortDomainVersion2.name,
          version: seaPortDomainVersion2.version,
        })
      ).rejects.toThrowError("Unrecognized/Unsupported EIP712Protocol Domain");
    });

    it("should throw with wrong chain id if seaport module used directly", async () => {
      expect(() => {
        seaport.visualize(seaportSellMessagePayload, {
          chainId: "3",
          verifyingContract: seaPortDomainVersion2.verifyingContract,
          name: seaPortDomainVersion2.name,
          version: seaPortDomainVersion2.version,
        });
      }).toThrow("wrong seaport domain");
    });

    it("should successfully visualize two sided Dutch auction", async () => {
      const result = await visualizer(seaportReverseDutchAuction, seaPortDomainVersion2);

      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        liveness: { from: 1680010140000, to: 1680269340000 },
        assetsIn: [
          {
            address: "0x0000000000000000000000000000000000000000",
            type: "NATIVE",
            amounts: ["760000000000000000", "950000000000000000"],
          },
        ],
        assetsOut: [
          {
            address: "0x2d33Bfe1c867346543Ac245396DFc6c3EBc8534F",
            type: "ERC1155",
            id: "1223",
            amounts: ["50", "100"],
          },
        ],
        approval: [],
      });
    });

    it("should successfully visualize two sided English auction", async () => {
      const result = await visualizer(
        seaportReverseEnglishAuction,
        seaPortDomainVersion2
      );

      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        liveness: { from: 1680010140000, to: 1680269340000 },
        assetsIn: [
          {
            address: "0x0000000000000000000000000000000000000000",
            type: "NATIVE",
            amounts: ["760000000000000000", "950000000000000000"],
          },
        ],
        assetsOut: [
          {
            address: "0x2d33Bfe1c867346543Ac245396DFc6c3EBc8534F",
            type: "ERC1155",
            id: "1223",
            amounts: ["50", "100"],
          },
        ],
        approval: [],
      });
    });

    /**
     * @dev This is an edge case and as far as i know seaport still doest support this
     * Indeed, as it's possible to create it, i added implementation for it
     * @note should check at the smart contact level if this is possible
     */
    it("should successfully visualize ERC721 sell order with specific traits", async () => {
      const result = await visualizer(sellAnyERC721WithCriteria, seaPortDomainVersion2);

      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        liveness: { from: 1680010140000, to: 1680269340000 },
        assetsIn: [
          {
            address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
            type: "ERC721",
            amounts: ["1"],
            id: "",
          },
        ],
        assetsOut: [
          {
            address: "0x2d33Bfe1c867346543Ac245396DFc6c3EBc8534F",
            type: "ERC721",
            amounts: ["1"],
          },
        ],
        approval: [],
      });
    });

    /**
     * @dev This is an edge case and as far as i know seaport still doest support this
     * Indeed, as it's possible to create it, i added implementation for it
     * @note should check at the smart contact level if this is possible
     */
    it("should successfully visualize ERC1155 sell order with specific traits", async () => {
      const result = await visualizer(sellAnyERC1155WithCriteria, seaPortDomainVersion2);

      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        liveness: { from: 1680010140000, to: 1680269340000 },
        assetsIn: [
          {
            address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
            type: "ERC1155",
            amounts: ["50", "100"],
            id: "",
          },
        ],
        assetsOut: [
          {
            address: "0x2d33Bfe1c867346543Ac245396DFc6c3EBc8534F",
            type: "ERC1155",
            amounts: ["50", "100"],
          },
        ],
        approval: [],
      });
    });

    it("should successfully visualize sell order", async () => {
      const result = await visualizer(seaportSellMessagePayload, seaPortDomainVersion2);

      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        liveness: { from: 1678465649000, to: 1678724843000 },
        assetsIn: [
          {
            address: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
            type: "ERC721",
            id: "16344",
            amounts: ["1"],
          },
        ],
        assetsOut: [
          {
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            type: "ERC20",
            amounts: ["4000000000000000"],
          },
        ],
        approval: [],
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
        assetsIn: [
          {
            address: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
            type: "ERC721",
            id: "",
            amounts: ["5"],
          },
        ],
        assetsOut: [
          {
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            type: "ERC20",
            amounts: ["100000000000000000"],
          },
        ],
        approval: [],
      });
    });

    it("should successfully visualize collection offer on any token", async () => {
      const result = await visualizer(
        seaportCollectionOfferAnyToken,
        seaPortDomainVersion2
      );
      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        assetsIn: [
          {
            address: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
            type: "ERC721",
            id: "",
            amounts: ["3"],
          },
        ],
        assetsOut: [
          {
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            type: "ERC20",
            amounts: ["90000000000000000"],
          },
        ],
        liveness: {
          from: 1677592745000,
          to: 1678197528000,
        },
        approval: [],
      });
    });

    it("should successfully visualize bundle listing", async () => {
      const result = await visualizer(seaportBundleListing, seaPortDomainVersion2);

      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        assetsIn: [
          {
            address: "0x0000000000000000000000000000000000000000",
            type: "NATIVE",
            amounts: ["4975000000000000000"],
          },
        ],
        assetsOut: [
          {
            address: "0x2d33Bfe1c867346543Ac245396DFc6c3EBc8534F",
            type: "ERC721",
            id: "1223",
            amounts: ["1"],
          },
          {
            address: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
            type: "ERC721",
            id: "28055722494445081938143406270964393509249427241382713345351022514386455812231",
            amounts: ["1"],
          },
        ],
        liveness: {
          from: 1677130860000,
          to: 1677303660000,
        },
        approval: [],
      });
    });

    it("should successfully visualize seaport bid", async () => {
      const result = await visualizer(seaportBid, seaPortDomainVersion2);

      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        assetsIn: [
          {
            address: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
            type: "ERC721",
            id: "7649",
            amounts: ["1"],
          },
        ],
        assetsOut: [
          {
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            type: "ERC20",
            amounts: ["100000000000000000"],
          },
        ],
        liveness: {
          from: 1677130860000,
          to: 1677303660000,
        },
        approval: [],
      });
    });

    it("should successfully visualize English auction", async () => {
      const result = await visualizer(seaportEnglishAuction, seaPortDomainVersion2);

      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        assetsIn: [
          {
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            type: "ERC20",
            amounts: ["950000000000000000"],
          },
        ],
        assetsOut: [
          {
            address: "0x2d33Bfe1c867346543Ac245396DFc6c3EBc8534F",
            type: "ERC721",
            id: "1223",
            amounts: ["1"],
          },
        ],
        liveness: {
          from: 1677130860000,
          to: 1677303660000,
        },
        approval: [],
      });
    });

    it("should successfully visualize Dutch auction", async () => {
      const result = await visualizer(seaportDutchAuction, seaPortDomainVersion2);

      expect(result).toEqual({
        protocol: "OPENSEA_SEAPORT",
        assetsIn: [
          {
            address: "0x0000000000000000000000000000000000000000",
            type: "NATIVE",
            amounts: ["760000000000000000", "950000000000000000"],
          },
        ],
        assetsOut: [
          {
            address: "0x2d33Bfe1c867346543Ac245396DFc6c3EBc8534F",
            type: "ERC721",
            id: "1223",
            amounts: ["1"],
          },
        ],
        liveness: {
          from: 1680010140000,
          to: 1680269340000,
        },
        approval: [],
      });
    });
  });
});
