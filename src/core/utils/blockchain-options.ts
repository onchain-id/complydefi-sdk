import { Signer } from 'ethers';
import { BigNumber } from 'ethers';
import { Provider } from '@ethersproject/providers';

export interface BlockchainOptions {
  /**
   * Override transaction parameters.
   */
  overrides?: {
    /**
     * The maximum units of gas for the transaction to use
     */
    gasLimit?: number;

    /**
     * The price (in wei) per unit of gas
     */
    gasPrice?: BigNumber;

    /**
     * The nonce to use in the transaction
     */
    nonce?: number;

    /**
     * The amount to send with the transaction (i.e. msg.value)
     */
    value?: BigNumber;

    /**
     * The chain ID (or network ID) to use
     */
    chainId?: number;
  };

  /**
   * Use this signer for the transaction.
   */
  signer?: Signer;

  /**
   * Use this provider for the call.
   */
  provider?: Provider;
}
