import { Web3Provider } from '@ethersproject/providers';
import { ethers } from "ethers";
import { InvalidProviderError } from "../../../dist/core/errors/Errors";
import { InvalidAddressError } from "../../../src/core/utils/ENS";
import { ComplyDefiSDK } from '../../../src';
import { getTestProvider } from "../helpers/ganache.helper";

jest.mock('ethers');

describe('Test compliance on ComplyDefi', () => {
  let provider: Web3Provider;

  beforeEach(async () => {
    provider = await getTestProvider();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ethers.Contract = jest.fn().mockReturnValue({ isComply() {
      return true;
    },
    requiredClaims() {
      return ['test1', 'test2'];
    }}
    );
  });

  describe('.isComply', () => {
    let complyDefi: ComplyDefiSDK.ComplyDefi;
    beforeEach(async () => {
      complyDefi = await ComplyDefiSDK.ComplyDefi.at('0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d', { provider } )
    });

    describe('provider is not given', () => {
      it('should throw an InvalidProviderError', async () => {
        await expect(complyDefi.isComply('test.eth')).rejects.toThrow(new InvalidProviderError('Given provider or SDK provider must be a valid Provider to resolve ENS, or a Signer with a provider.'));
      });
    });
    describe.skip('address is wrong', () => {
      it('should throw an InvalidAddressError', async () => {
        await expect(complyDefi.isComply('test.test')).rejects.toThrow(new InvalidAddressError({ message: 'Could not resolve the ENS to an ethereum address.' }));
      });
    });

    describe('when all parameters are correct', () => {
      it('returns isComply result', async () => {
        await expect(await complyDefi.isComply('0x71C7656EC7ab88b098defB751B7401B5f6d8976F')).toBeTruthy();
      });
    });
  });

  describe('.getRequiredClaims', () => {
    let complyDefi: ComplyDefiSDK.ComplyDefi;
    beforeEach(async () => {
      complyDefi = await ComplyDefiSDK.ComplyDefi.at('0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d', { provider } )
    });

    describe('when all parameters are correct', () => {
      it('returns getRequiredClaims array result', async () => {
        await expect(await complyDefi.getRequiredClaims()).toEqual(["test1", "test2"]);
      });
    });
  });
});
