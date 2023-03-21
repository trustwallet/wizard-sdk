# TLDR
When users can understand what they are signing, they are less likely to fall for phishing scams.

# wizard-sdk
Currently, we are migrating the internal code into this repo, if your protocol uses EIP-712 and you want it to be supported by the SDK, please create an issue and one of the maintainers will look into it and provide more details on how you can add support (mainly through PR to this SDK)

# Features
- Simplified EIP-712 message visualization
- Transaction simulation for human-readable display
- Supports various protocols and EIP-712 schemas

## Visualization
The EIP-712 is a standard for structured data signatures that is widely used in the blockchain industry. However, each protocol uses a different schema, making it difficult for end-users to understand what they are signing. Also this poses a significant challenge for wallets, who must manually add support for each protocol, making it hard to keep up with the pace of development (Discussed in #Beyond-SDK section).

To overcome this challenge, our team has developed an SDK that visualizes EIP-712 messages into a human-readable format. Our goal is to simplify the user experience, enabling end-users to easily understand and engage with EIP-712 messages, without needing a technical background or specialized knowledge.

## Simulation
The SDK will simulate a transaction through a node that expose EVM debug API (you must provide the node endpoint), dry run it and extract and decode minimum required details from internal calls and emitted logs to track user assets(Native, ERC20, ERC721, ERC1155) impact and movement (ins, outs, approvals) 

# How the Wizard-SDK integration in Wallets Helps Crypto
By simplifying the signing process and making it more accessible, this improve overall user experience in the crypto space.also This helps to attract more users and increase adoption of cryptocurrencies.

Furthermore, This will enhances security in the crypto space by reducing the risk of phishing attacks. When users can understand what they are signing, they are less likely to fall for phishing scams.

# Beyond SDK
In addition to the SDK, we are also drafting an EIP to address the issue of EIP-712 message visualization. We believe that a solution that can be adopted by the entire crypto community (Dapps and Wallets) will make it easier for wallets to provide a better UX with less efforts and maintainability burden, higher and faster coverage.

This will result at least in users understanding what they are signing, increase security, and improve the overall user experience in the crypto space. This is not about Dapps or Wallets, Its all about users, it's our duty as a community to provide the best we can and it's for our own sake to react now before it's too late (the more the Dapps and Users, the harder to keep-up)

Currently, we are experimenting with various approaches to find the most effective solution. We are open to collaborating with other projects and community members to help make this solution a reality. If you are interested in contributing, please reach out to us directly.