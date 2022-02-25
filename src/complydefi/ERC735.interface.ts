import { BlockchainOptions } from "../core/utils/blockchain-options";

export interface ERC735 {
  isComply(addressOrENS: string, options?: BlockchainOptions): Promise<boolean>;
  getRequiredClaims(options?: BlockchainOptions): Promise<Array<string>>;
}
