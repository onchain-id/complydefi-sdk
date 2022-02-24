import { Complydefi } from './complydefi/Complydefi';
import { SignerModule } from './core/SignerModule';
import * as utils from "./utils-module";

const constants = {
  implementationAuthorities: {
    ropsten: '0x95c0242daa0b3113a3d9cA45b4E6421a10DB77b6',
    kovan: '0x95c0242daa0b3113a3d9cA45b4E6421a10DB77b6',
    homestead: '0xB4B1767eF6f1ce65DeEBa3F0AeFa67E6CFd40639',
  },
};

export {
  Complydefi,
  SignerModule,
  utils,
  constants,
};
