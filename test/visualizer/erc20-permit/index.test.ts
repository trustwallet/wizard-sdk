import { PermitMessage } from "../../../src/types";
import visualize from "../../../src/visualizer";
import erc20Permit from "../../../src/visualizer/erc20-permit";

describe("ERC20 Permit", () => {
  const erc20DaiPermitMessage = {
    holder: "0x36C1625E5Ee6FBFa9fadd4f75790275e5eaB7107",
    spender: "0x21C1625E5Ee6FBFa9fadd4f75790275e5eaB7009",
    allowed: true,
    nonce: "1",
    expiry: "167960665",
  };

  const ERC2612Message = {
    owner: "0x36C1625E5Ee6FBFa9fadd4f75790275e5eaB7107",
    spender: "0x21C1625E5Ee6FBFa9fadd4f75790275e5eaB7009",
    value: "100000000000",
    nonce: "1",
    deadline: "167960665",
  };
  const erc20PermitDomain = {
    name: "Dai Stablecoin",
    version: "1.1",
    chainId: "1",
    verifyingContract: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  };

  it("should revert if erc20Permit module called with wrong message payload", () => {
    const deepCopiedMessage = JSON.parse(JSON.stringify(erc20DaiPermitMessage));
    delete deepCopiedMessage["expiry"];

    expect(() => {
      erc20Permit.visualize(deepCopiedMessage, erc20PermitDomain);
    }).toThrowError("wrong ERC20 Permit message schema");
  });

  it("should successfully visualize DAI approval", async () => {
    const result = await visualize<PermitMessage>(
      erc20DaiPermitMessage,
      erc20PermitDomain
    );

    expect(result).toEqual({
      protocol: "ERC20_PERMIT",
      assetIn: [],
      assetOut: [],
      approval: [
        {
          address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          type: "ERC20",
          amounts: [
            "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          ],
          owner: "0x36C1625E5Ee6FBFa9fadd4f75790275e5eaB7107",
          operator: "0x21C1625E5Ee6FBFa9fadd4f75790275e5eaB7009",
          deadline: 167960665000,
        },
      ],
    });
  });

  it("should successfully visualize DAI approval with zero amount", async () => {
    const result = await visualize<PermitMessage>(
      { ...erc20DaiPermitMessage, allowed: false, nonce: "2" },
      erc20PermitDomain
    );

    expect(result).toEqual({
      protocol: "ERC20_PERMIT",
      assetIn: [],
      assetOut: [],
      approval: [
        {
          address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          type: "ERC20",
          amounts: ["0"],
          owner: "0x36C1625E5Ee6FBFa9fadd4f75790275e5eaB7107",
          operator: "0x21C1625E5Ee6FBFa9fadd4f75790275e5eaB7009",
          deadline: 167960665000,
        },
      ],
    });
  });

  it("should successfully visualize ERC2612 approval", async () => {
    const result = await visualize<PermitMessage>(ERC2612Message, erc20PermitDomain);

    expect(result).toEqual({
      protocol: "ERC20_PERMIT",
      assetIn: [],
      assetOut: [],
      approval: [
        {
          address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          type: "ERC20",
          amounts: ["100000000000"],
          owner: "0x36C1625E5Ee6FBFa9fadd4f75790275e5eaB7107",
          operator: "0x21C1625E5Ee6FBFa9fadd4f75790275e5eaB7009",
          deadline: 167960665000,
        },
      ],
    });
  });
});
