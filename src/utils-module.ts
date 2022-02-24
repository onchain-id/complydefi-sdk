import { interfaces as solidityInterfaces } from '@onchain-id/solidity';
import * as crypto from './crypto-module';

const contracts = {
  ERC734: solidityInterfaces.IERC734,
  ERC735: solidityInterfaces.IERC735,
};

export { crypto, contracts };
export * from './core/utils/Utils';



