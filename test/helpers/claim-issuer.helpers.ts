import { ContractFactory } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';
import * as OnchainID from '@onchain-id/solidity';

export async function deployClaimIssuerContract({ wallet, provider }: { wallet: string; provider: JsonRpcProvider }) {
  const factory = new ContractFactory(
    OnchainID.contracts.ClaimIssuer.abi,
    OnchainID.contracts.ClaimIssuer.bytecode,
    provider.getSigner(wallet),
  );
  const contract = await factory.deploy();
  await contract.deployed();

  return {
    wallet,
    address: contract.address,
  };
}
