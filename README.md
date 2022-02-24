# COMPLYDEFI SDK

> This package facilitates the interaction with Complydefi stored in the BlockChain.

## Specifications

### Features

- Validate wallet address compliance
- Get required claims

---

### BlockChain Provider

To interact with the BlockChain, you will need to instantiate a Provider.

The SDK is using [Ethers](https://github.com/ethers-io/ethers.js) to connect with Ethereum network.
Thus, any provider supported by Ethers can be used with the SDK.
This means any standard web3 provider should by supported.

Connect to a default provider:

```javascript
// You can use any standard network name
//  - "homestead"
//  - "rinkeby"
//  - "ropsten"
//  - "kovan"
const ethers = require('ethers');

const provider = ethers.getDefaultProvider('ropsten');

const complydefi = await Complydefi.at('0x...', { provider });
```

Connect to JSON RPC:

```javascript
// When using the JSON-RPC API, the network will be automatically detected
// Default: http://localhost:8545
let httpProvider = new ethers.providers.JsonRpcProvider();
```

Connect to any Web3 Provider:

```javascript
// When using a Web3 provider, the network will be automatically detected

// e.g. HTTP provider
let currentProvider = new web3.providers.HttpProvider('http://localhost:8545');

let web3Provider = new ethers.providers.Web3Provider(currentProvider);
```

Connect to metamask:

```javascript
// The network will be automatically detected; if the network is
// changed in MetaMask, it causes a page refresh.

let provider = new ethers.providers.Web3Provider(web3.currentProvider);
```

## Development

- Install dependencies: `yarn`.
- Lint code with `yarn lint`.
- Run unit tests: `yarn test:unit`. You can run unit tests each time you modify a file with `yarn test:unit:watch`.
- Build project with `yarn build`. This will build package into the `dist/` folder from the TypeScript sources.
- Run end to end tests against a builded package: `yarn test:e2e`.
- You can generate type documentation with `yarn build:docs`. This will build the TypeDoc website into `docs/type_doc`.
