import { getDefaultProvider, Wallet } from 'ethers';
import { InvalidAddressError } from '../../../src/core/utils/ENS';
import { Provider } from '@ethersproject/providers';
import { Complydefi } from "../../../dist/complydefi/Complydefi";

describe('Complydefi ❖ Initializer and Resolver', function() {
  let provider: Provider;
  beforeAll(() => {
    provider = getDefaultProvider('homestead');
  });

  describe('new - Complydefi Constructor', function() {
    describe('when string is a valid ETH address', function() {
      it('should instantiate a new Complydefi object', async function() {
        const complydefi = new Complydefi('0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d', provider);

        expect(complydefi).toHaveProperty('address', '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d');
      });
    });

    describe('when string is not a valid ETH address', function() {
      it('should throw an InvalidAddressError', async function() {
        expect(() => new Complydefi('adazd.eth', provider)).toThrow(new InvalidAddressError());
      });
    });
  });

  describe('at() - Complydefi from address or ENS', function() {
    describe('when string is a valid ETH address', function() {
      describe('when using a provider', function() {
        it('should instantiate a new Complydefi object', async function() {
          const complydefi = await Complydefi.at('0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d', { provider: provider });

          expect(complydefi).toHaveProperty('address', '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d');
        });
      });
    });

    describe('when string is not a valid ETH address', function() {
      describe('when ENS does not resolve', function() {
        it('should throw an error', async function() {
          await expect(Complydefi.at('test.test', { provider: provider })).rejects.toThrow(new InvalidAddressError({ message: 'Could not resolve the ENS to an ethereum address.' }));
        });
      });

      describe('when ENS does resolve', function() {
        describe('when using a signer with a provider',  function() {
          it('should instantiate a new Complydefi object to the resolved address', async function() {
            const signer = new Wallet('0x7636C9F40D8DE5C022AF21ABB368923992A26E2C55EB5ABE597626906A018BAF', provider);
            const complydefi = await Complydefi.at('test.eth', { signer });

            expect(complydefi).toHaveProperty('address', '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d');
          });
        });

        describe('when using a provider',  function() {
          it('should instantiate a new Complydefi object to the resolved address', async function() {
            const complydefi = await Complydefi.at('test.eth', { provider: provider });

            expect(complydefi).toHaveProperty('address', '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d');
          });
        });
      });
    });
  });
});
