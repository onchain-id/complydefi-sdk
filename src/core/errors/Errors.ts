export interface ErrorParams {
  message?: string;
}

export interface ValueErrorParams extends ErrorParams{
  value?: any;
}

export interface ValueError {
  message: string;
  value?: any;
}

/**
 * Thrown when an operation is executed with insufficient privileges
 */
export class OperationForbiddenError extends Error {
  public constructor({ message = 'Insufficient privileges to execute the operation.' }: { message?: string } = {}) {
    super(message);
    this.name = 'OperationForbiddenError';

    Object.setPrototypeOf(this, OperationForbiddenError.prototype);
  }
}

/**
 * Thrown when attempting to set an Invalid BlockChain Provider.
 */
export class InvalidProviderError extends Error {
  public constructor(message = 'Specified Provider is not valid. Must be either a default network name, a json RPC address, a Provider or a Signer object.') {
    super(message);
    this.name = 'INVALID_PROVIDER';
  }
}
