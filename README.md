# Overview
```
When users comprehend the content they are signing, their susceptibility to phishing scams decreases.
```
Wizard-SDK, a TypeScript software development kit, is designed to visualize diverse protocol EIP-712 messages and simulate transactions that users sign daily in the web3.0 environment.

The primary goal of the visualization process is to convert EIP-712 payloads into an easily understandable format. Rather than returning a textual description of the message, the SDK provides structured data that outlines the potential impact on the user's assets if the EIP-712 transaction is signed and submitted on the blockchain.

In addition to visualization, the SDK also includes a separate, independent module for simulating transactions. Utilizing the Ethereum Virtual Machine (EVM) debug API (various providers), the simulation extracts information about asset movements from logs and internal calls.

By combining the visualization of the EIP-712 payload and the Transaction simulation, Wizard-SDK provides Developers with a one-in-place tool aims that helps empower users to make informed decisions before signing and submitting transactions. 

Rather than returning a textual description of the message, the SDK offers a clear picture of the potential consequences, ensuring a better understanding of the transaction's implications.

# step-by-step Guide

To use the SDK you must install it using your preferred package manager npm
```
npm install @trustwallet/wizard-sdk
```
or
```
yarn add @trustwallet/wizard-sdk
```

after installing the sdk, import the visualize function
``` typescript
import { visualize } from '@trustwallet/wizard-sdk';
```
The visualize is an async function that accepts two parameters, the `message` as an arbitrary object and `domain` as a strongly typed object aligned with EIP-712 domain structure and returns `Result` promise or can **throw** if the protocol is not handled or wrong message or domain content for example.

```typescript
/**
 * @param {T} message EIP-712 message
 * @param {Domain} domain EIP-712 domain
 * @returns {Result} assets impact and message liveness
 * @throws {Error}
 */
async function visualize<T extends object>(
  message: T,
  domain: Domain
): Promise<Result>;

type Domain = {
  verifyingContract: string;
  name: string;
  chainId: string;
  version: string;
};
```

The returned `Result` will contain some important fields like:
- `assetIn`, an array of of assets that user should receive.
- `assetOut`, an array of the assets that are leaving user wallet.
- `approval`, an array of assets that user is granting an `operator` approval for.
- `liviness`, an optional object that highlight from and till which timestamp the above information is considered valid by the protocol

# Features
- Simplified EIP-712 message visualization
- Transaction simulation for human-readable display ([in-progress](https://github.com/trustwallet/wizard-sdk/issues/18))
- Supports various protocols and EIP-712 schemas

## Visualization
The EIP-712 is a standard for structured data signatures that are widely used in the blockchain industry. However, each protocol uses a different schema, making it difficult for end-users to understand what they are signing. Also, this poses a significant challenge for wallets, who must manually add support for each protocol, making it hard to keep up with the pace of development (Discussed in the #Beyond-SDK section).

To overcome this challenge, our team has developed an SDK that visualizes EIP-712 messages in a human-readable format. Our goal is to simplify the user experience, enabling end-users to easily understand and engage with EIP-712 messages, without needing a technical background or specialized knowledge.

### Supported Protocols
- [OpenSea Seaport](https://docs.opensea.io/reference/seaport-overview)
- [Looksrare](https://docs.looksrare.org/developers/welcome)
- [blur.io](https://docs.blur.foundation/)
- [ERC20 Permit](https://eips.ethereum.org/EIPS/eip-2612)

If you are a project that uses EIP-712 and wants to add your project to the SDK please create a PR with the implementation, here's an example of adding [blur.io support](https://github.com/trustwallet/wizard-sdk/pull/14/files)

To know upcoming support, please refer to the github issues [tracker](https://github.com/trustwallet/wizard-sdk/issues?q=is%3Aissue+is%3Aopen+label%3A%22EIP712+Support%22)

## Simulation
The SDK will simulate a transaction through a node that exposes EVM debug API (you must provide the node endpoint), dry run it and extract and decode minimum required details from internal calls and emitted logs to track user assets(Native, ERC20, ERC721, ERC1155) impact and movement (ins, outs, approvals) 

# How the Wizard-SDK integration in Wallets Helps Crypto
Simplifying the signing process and making it more accessible, improve the overall user experience in the crypto space. also, This helps to attract more users and increase the adoption of cryptocurrencies.

Furthermore, This will enhance security in the crypto space by reducing the risk of phishing attacks. When users can understand what they are signing, they are less likely to fall for phishing scams.

# Beyond SDK
In addition to the SDK, we are also drafting an EIP to address the issue of EIP-712 message visualization. We believe that a solution that can be adopted by the entire crypto community (Dapps and Wallets) will make it easier for wallets to provide a better UX with fewer efforts and maintainability burden, and higher and faster coverage.

This will result at least in users understanding what they are signing, increase security, and improve the overall user experience in the crypto space. This is not about Dapps or Wallets, It's all about users, it's our duty as a community to provide the best we can and it's for our own sake to react now before it's too late (the more the Dapps and Users, the harder to keep up)

Currently, we are experimenting with various approaches to find the most effective solution. We are open to collaborating with other projects and community members to help make this solution a reality. If you are interested in contributing, please reach out to us directly.