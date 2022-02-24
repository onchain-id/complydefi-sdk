import { utils } from 'ethers';
import { InvalidProviderError, ValueError, ValueErrorParams } from '../errors/Errors';
import { providers } from 'ethers';

/**
 * Thrown when an invalid address is given
 */
export class InvalidAddressError extends Error implements ValueError {
  public readonly value: any;

  public constructor({ message = 'Specified address is not a valid Ethereum address.', value }: ValueErrorParams = {}) {
    super(message);
    this.name = 'INVALID_ADDRESS';
    this.value = value;
    this.message = message || 'Specified value is not a valid Ethereum address.';

    Object.setPrototypeOf(this, InvalidAddressError.prototype);
  }
}

/**
 * Check if a string is a valid address (and return it checksummed).
 * @param address
 * @throws InvalidAddressError
 */
export function normalizeAddress(address: string): string {
  try {
    return utils.getAddress(address);
  } catch (err) {
    throw new InvalidAddressError({ value: address });
  }
}

/**
 * Resolve a string with the Ethereum Naming Service.
 *
 * It will use the default Provider set for the SDK, or the optional provider in parameters.
 * @param ens
 * @param [provider] Override the default SDK provider.
 * @throws InvalidAddressError If the string could not be resolved to an address.
 * @throws InvalidProviderError If the provider is not a valid provider.
 */
export async function resolveENS(ens: string, provider: providers.Provider): Promise<string> {
  if (!providers.Provider.isProvider(provider)) {
    throw new InvalidProviderError('Given provider or SDK provider must be a valid Provider to resolve ENS, or a Signer with a provider.');
  }

  try {
    const address = await provider.resolveName(ens);

    if (!address) {
      throw new InvalidAddressError({
        message: 'ENS does not resolve to a valid Ethereum address.',
        value: ens,
      });
    }

    return address;
  } catch (err) {
    throw new InvalidAddressError({
      value: ens,
      message: 'Could not resolve the ENS to an ethereum address.',
    });
  }
}


