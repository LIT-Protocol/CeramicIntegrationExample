# Lit Ceramic Integration

## Welcome!

Welcome to the [Lit Ceramic Integration](https://github.com/LIT-Protocol/CeramicIntegration) web playground. This is a playground for the [lit-ceramic-sdk](https://www.npmjs.com/package/lit-ceramic-sdk) module, to show anyone who's interested what it looks like in practice! It uses this module to encrypt (with Lit) and store (with Cermamic) any string the user wants to store. It will be accessible only to those who control the wallet of the user that made it. It appears on the ceramic network as encrypted data.

## Quick and Dirty Instructions for running in dev

Make sure to run `yarn` to install everything at first.

Run `yarn start` to start the server.

## [Ceramic Web Playground](https://ceramicstudio.github.io/web-playground/)

Test the full stack of [Ceramic Network](https://ceramic.network/) components in a web browser. This project is based off of the above ceramic playground.

## Technologies

- [Lit Protocol Encryption](https://developer.litprotocol.com/docs/intro/): an open source, decentralized utility that uses encryption to provide blockchain users access to digital and real world experiences. The network acts as a decentralized access control list (ACL) which leverages on-chain data to grant users access to content, software, and other decentralized networks.
- [Ceramic HTTP Client](https://developers.ceramic.network/reference/javascript/clients/#http-client): Provides access to the Ceramic Network via a remote node running Ceramic (and IPFS).
- [3ID Connect](https://developers.ceramic.network/build/authentication/#did-provider-or-wallet): Provides authentication to a DID (used by Ceramic) from a blockchain wallet, and stores a link from this blockchain account to your DID in IDX.

## Usage

The app is configured to only let users with at least 0.000001 ETH decrypt the content. This access control condition can be changed to anything you want. You can find some examples here: https://developer.litprotocol.com/docs/SDK/accessControlConditionExamples

1. Open the [Playground page, often localhost:1234 when running parcel](http://localhost:1234)
2. Open your browser's console by inspecting the page
3. Click Encrypt w/ Lit + Send button to begin process!
4. Authenticate by clicking "Connect wallet"
5. Approve prompts in your Web3 wallet for both Ceramic and Lit
6. Wait to see "Connected with DID" in your console
7. Write and read Lit-Encrypted documents on the Ceramic Network from the console using the referenced API methods

## License

Apache-2.0 OR MIT
