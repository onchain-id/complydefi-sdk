import { Signer } from 'ethers';
import { ErrorParams } from './errors/Errors';

export interface PublicKey {
  key: string;
  type: string;
  signingMethod: string;
}

/**
 * Thrown when an invalid address is given
 */
export class InvalidSignerModuleParamsError extends Error {
  public constructor({ message = 'The provided argument is not a valid Signer.' }: ErrorParams = {}) {
    super(message);
    this.name = 'INVALID_SIGNER_MODULE_PARAMS';
    this.message = message;

    Object.setPrototypeOf(this, InvalidSignerModuleParamsError.prototype);
  }
}

/**
 * Interface for a signer. This object should be able to sign message and export its public key.
 */
export interface SignerModuleInterface {
  getPublicKey(): Promise<PublicKey>;
  signMessage(message: Uint8Array | string): Promise<string>;
}

export class SignerModule implements SignerModuleInterface {
  private readonly publicKey?: PublicKey;
  private readonly getPublicKeyFunction?: () => Promise<PublicKey>;
  private readonly signMessageFunction: (message: string) => Promise<string>;

  public constructor(params: { publicKey?: PublicKey; getPublicKey?: () => Promise<PublicKey>; signMessage: (message: string) => Promise<string> } | Signer) {
    if (!params || typeof params !== 'object') {
      throw new InvalidSignerModuleParamsError({
        message: 'The constructor parameter must be a Signer or must have a signeMessage function and a publicKey property Sor a getPublickKey function.',
      });
    }

    if (Signer.isSigner(params)) {
      this.getPublicKey = async () => ({
        key: await params.getAddress(),
        type: 'ECDSA',
        signingMethod: 'ECDSA',
      });
      this.signMessageFunction = (message: Uint8Array | string) => params.signMessage(message);
    } else {
      if (params.publicKey && params.getPublicKey) {
        throw new InvalidSignerModuleParamsError({
          message: 'A SignerModule must define only one of publicKey or getPublicKey.',
        });
      } else if (params.publicKey) {
        this.publicKey = params.publicKey;
      } else if (params.getPublicKey) {
        this.getPublicKeyFunction = params.getPublicKey;
      } else {
        throw new InvalidSignerModuleParamsError({
          message: 'A SignerModule must define one of publicKey or getPublicKey.',
        });
      }

      if (!params.signMessage) {
        throw new InvalidSignerModuleParamsError({
          message: 'A SignerModule must define a signMessage function.',
        });
      }
      this.signMessageFunction = params.signMessage;
    }
  }

  public static isSignerModule(value: any): value is SignerModuleInterface {
    return value.getPublicKey && value.signMessage;
  }

  public async getPublicKey(): Promise<PublicKey> {
    if (this.publicKey) {
      return this.publicKey;
    }

    if (this.getPublicKeyFunction) {
      return this.getPublicKeyFunction();
    }

    throw new Error('Signer has no public key getter.');
  }

  public async signMessage(message: string): Promise<string> {
    return this.signMessageFunction(message);
  }
}
