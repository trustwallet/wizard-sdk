import {
  SeaPortItemType,
  SeaPortOrderType,
  SeaPortPayload,
} from "../../../src/types/seaport";

export const seaportSellMessagePayload: SeaPortPayload = {
  offerer: "0x377e19e0D6525f5fABd565bc47dc4e5FC8Bafb01",
  offer: [
    {
      itemType: "1" as unknown as SeaPortItemType,
      token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      identifierOrCriteria: "0",
      startAmount: "4000000000000000",
      endAmount: "4000000000000000",
    },
  ],
  consideration: [
    {
      itemType: "2" as unknown as SeaPortItemType,
      token: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
      identifierOrCriteria: "16344",
      startAmount: "1",
      endAmount: "1",
      recipient: "0x377e19e0D6525f5fABd565bc47dc4e5FC8Bafb01",
    },
    {
      itemType: "1" as unknown as SeaPortItemType,
      token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      identifierOrCriteria: "0",
      startAmount: "20000000000000",
      endAmount: "20000000000000",
      recipient: "0xA858DDc0445d8131daC4d1DE01f834ffcbA52Ef1",
    },
  ],
  startTime: "1678465649",
  endTime: "1678724843",
  orderType: "0" as unknown as SeaPortOrderType,
  zone: "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
  zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  salt: "24446860302761739304752683030156737591518664810215442929810547765953287839034",
  conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  totalOriginalConsiderationItems: "2",
  counter: "0",
};

export const seaportCollectionOfferSpecificTrait: SeaPortPayload = {
  offerer: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
  offer: [
    {
      itemType: 1,
      token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      identifierOrCriteria: "0",
      startAmount: "100000000000000000",
      endAmount: "100000000000000000",
    },
  ],
  consideration: [
    {
      itemType: 4,
      token: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
      identifierOrCriteria:
        "9848554199140811149870763349705212036797166272663670499290191072726618628958",
      startAmount: "5",
      endAmount: "5",
      recipient: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
    },
    {
      itemType: 1,
      token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      identifierOrCriteria: "0",
      startAmount: "500000000000000",
      endAmount: "500000000000000",
      recipient: "0xB4D24DAcbdFfA1BBf9A624044484b3FEeB7fdF74",
    },
  ],
  startTime: "1677592745",
  endTime: "1678197528",
  orderType: 3,
  zone: "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
  zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  salt: "24446860302761739304752683030156737591518664810215442929816102484229612266059",
  conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  counter: "0",
  totalOriginalConsiderationItems: "2",
};

export const seaportCollectionOfferAnyToken: SeaPortPayload = {
  offerer: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
  offer: [
    {
      itemType: 1,
      token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      // make sure type casting is implemented at SDK level
      identifierOrCriteria: 0 as unknown as string,
      startAmount: "90000000000000000",
      endAmount: "90000000000000000",
    },
  ],
  consideration: [
    {
      itemType: 4,
      token: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
      identifierOrCriteria:
        "14799781183100188210202243431852105861384467789347511679617608642702840254566",
      startAmount: "3",
      endAmount: "3",
      recipient: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
    },
    {
      itemType: 1,
      token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      identifierOrCriteria: "0",
      startAmount: "450000000000000",
      endAmount: "450000000000000",
      recipient: "0xB4D24DAcbdFfA1BBf9A624044484b3FEeB7fdF74",
    },
  ],
  startTime: "1677592745",
  endTime: "1678197528",
  orderType: 3,
  zone: "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
  zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  salt: "24446860302761739304752683030156737591518664810215442929810474369608190814752",
  conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  counter: "0",
  totalOriginalConsiderationItems: "2",
};

export const seaportBundleListing: SeaPortPayload = {
  offerer: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
  offer: [
    {
      itemType: 2,
      token: "0x2d33Bfe1c867346543Ac245396DFc6c3EBc8534F",
      identifierOrCriteria: "1223",
      startAmount: "1",
      endAmount: "1",
    },
    {
      itemType: 2,
      token: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
      identifierOrCriteria:
        "28055722494445081938143406270964393509249427241382713345351022514386455812231",
      startAmount: "1",
      endAmount: "1",
    },
  ],
  consideration: [
    {
      itemType: 0,
      token: "0x0000000000000000000000000000000000000000",
      identifierOrCriteria: "0",
      startAmount: "4975000000000000000",
      endAmount: "4975000000000000000",
      recipient: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
    },
    {
      itemType: 0,
      token: "0x0000000000000000000000000000000000000000",
      identifierOrCriteria: "0",
      startAmount: "25000000000000000",
      endAmount: "25000000000000000",
      recipient: "0xF250d5584d682ba2F555197Bd26B58E83d7CA4C6",
    },
  ],
  startTime: "1677130860",
  endTime: "1677303660",
  orderType: 2,
  zone: "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
  zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  salt: "24446860302761739304752683030156737591518664810215442929812777166268842166793",
  conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  counter: "0",
  totalOriginalConsiderationItems: "2",
};

export const seaportBid: SeaPortPayload = {
  offerer: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
  offer: [
    {
      itemType: 1,
      token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      identifierOrCriteria: "0",
      startAmount: "100000000000000000",
      endAmount: "100000000000000000",
    },
  ],
  consideration: [
    {
      itemType: 2,
      token: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
      identifierOrCriteria: "7649",
      startAmount: "1",
      endAmount: "1",
      recipient: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
    },
    {
      itemType: 1,
      token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      identifierOrCriteria: "0",
      startAmount: "500000000000000",
      endAmount: "500000000000000",
      recipient: "0xB4D24DAcbdFfA1BBf9A624044484b3FEeB7fdF74",
    },
  ],
  startTime: "1677130860",
  endTime: "1677303660",
  orderType: 1,
  zone: "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
  zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  salt: "24446860302761739304752683030156737591518664810215442929811534318769560104922",
  conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  counter: "0",
  totalOriginalConsiderationItems: "2",
};

export const seaportEnglishAuction: SeaPortPayload = {
  offerer: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
  offer: [
    {
      itemType: 2,
      token: "0x2d33Bfe1c867346543Ac245396DFc6c3EBc8534F",
      identifierOrCriteria: "1223",
      startAmount: "1",
      endAmount: "1",
    },
  ],
  consideration: [
    {
      itemType: 1,
      token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      identifierOrCriteria: "0",
      startAmount: "950000000000000000",
      endAmount: "950000000000000000",
      recipient: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
    },
  ],
  startTime: "1677130860",
  endTime: "1677303660",

  orderType: 2,
  zone: "0x110b2B128A9eD1be5Ef3232D8e4E41640dF5c2Cd",
  zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  salt: "24446860302761739304752683030156737591518664810215442929812926154305752507071",
  conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  counter: "0",
  totalOriginalConsiderationItems: "1",
};

export const seaportDutchAuction: SeaPortPayload = {
  offerer: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
  offer: [
    {
      itemType: 2,
      token: "0x2d33Bfe1c867346543Ac245396DFc6c3EBc8534F",
      identifierOrCriteria: "1223",
      startAmount: "1",
      endAmount: "1",
    },
  ],
  consideration: [
    {
      itemType: 0,
      token: "0x0000000000000000000000000000000000000000",
      identifierOrCriteria: "0",
      startAmount: "950000000000000000",
      endAmount: "760000000000000000",
      recipient: "0x900175B45Dcc84C23Cf597d5C3E766108CeA5bB0",
    },
    {
      itemType: 0,
      token: "0x0000000000000000000000000000000000000000",
      identifierOrCriteria: "0",
      startAmount: "50000000000000000",
      endAmount: "40000000000000000",
      recipient: "0x000000e1c867346543Ac245396DFc6c3EB000000",
    },
  ],
  startTime: "1680010140",
  endTime: "1680269340",
  orderType: 2,
  zone: "0x0000000000000000000000000000000000000000",
  zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  salt: "24446860302761739304752683030156737591518664810215442929817290465896680966316",
  conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  counter: "0",
  totalOriginalConsiderationItems: "2",
};

Object.freeze(seaportSellMessagePayload);
Object.freeze(seaportCollectionOfferSpecificTrait);
Object.freeze(seaportCollectionOfferAnyToken);
Object.freeze(seaportBundleListing);
Object.freeze(seaportBid);
Object.freeze(seaportEnglishAuction);
Object.freeze(seaportDutchAuction);
