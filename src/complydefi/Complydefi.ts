import { Signer, ethers, Contract, BigNumber } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { normalizeAddress, resolveENS } from '../core/utils/ENS';
import { InvalidProviderError } from '../core/errors/Errors';
import { BlockchainOptions } from '../core/utils/blockchain-options';
import { ComplydefiInterface } from "./complydefi.interface";

export class InvalidClaimError extends Error {
  public constructor({ message = 'Definition of the Claim is not valid.' }: { message?: string } = {}) {
    super(message);
    this.name = 'InvalidClaimError';

    Object.setPrototypeOf(this, InvalidClaimError.prototype);
  }
}

export class Complydefi implements ComplydefiInterface {
  public address: string;
  public provider?: Provider | Signer;
  private deploymentContract?: Contract;

  /**
   * Instantiate a new Complydefi with the provided address or ENS string that will be resolved.
   * @param addressOrENS Must be a valid Ethereum address, checksumed, all lower-case or all uppercase.
   * @param options
   * @params options.provider If provided, the identity will use this provider for all blockchain operation (unless override) instead of the SDK default provider.
   */
  public static async at(addressOrENS: string, options?: BlockchainOptions): Promise<Complydefi> {
    let address: string;

    if (!addressOrENS.includes('.')) {
      address = normalizeAddress(addressOrENS);
    } else {
      if (Provider.isProvider(options?.provider)) {
        address = await resolveENS(addressOrENS, options?.provider as Provider);
      } else if (Signer.isSigner(options?.signer) && Provider.isProvider(options?.signer.provider)) {
        address = await resolveENS(addressOrENS, options?.signer.provider as Provider);
      } else {
        throw new InvalidProviderError('Resolving ENS requires a Provider.');
      }
    }

    return new Complydefi(address, options?.signer || options?.provider);
  }

  /**
   * Instantiate an Identity.
   * @param address A valid Ethereum address (not an ENS, use `Identity#at(ens)`.).
   * @param provider Override the default provider of SDK, and use for all operation of this Identity.
   */
  public constructor(address: string, provider?: Provider | Signer) {
    this.address = normalizeAddress(address);
    this.provider = provider;
  }

  /**
   * Check if wallet address is compliant.
   * @param addressOrENS wallet address to be checked
   * @param [options]
   */
  public async isComply(addressOrENS: string, options?: BlockchainOptions): Promise<boolean> {
    const provider = options?.provider || this.provider;
    if (!Provider.isProvider(provider)) {
      throw new InvalidProviderError('A valid provider is required.');
    }
    let walletAddress;
    if (!addressOrENS.includes('.')) {
      walletAddress = normalizeAddress(addressOrENS);
    } else {
      walletAddress = await resolveENS(addressOrENS, provider);
    }
    const contract = new ethers.Contract(this.address, ["function isComply(address _user) view returns (bool)"], provider);
    const isCompliant = await contract.isComply(walletAddress);
    return isCompliant;
  }

  public async getRequiredClaims(options?: BlockchainOptions): Promise<Array<string>> {
    const provider = options?.provider || this.provider;
    if (!Provider.isProvider(provider)) {
      throw new InvalidProviderError('A valid provider is required.');
    }
    const contract = new ethers.Contract(this.address, ["function requiredClaims() view returns(uint[])"], provider);
    const requiredClaims = await contract.requiredClaims() as Array<BigNumber>;
    return requiredClaims.toString().split(',');
  }
}
