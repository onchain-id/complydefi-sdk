import ganache from 'ganache';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';

export async function getTestProvider({
  accounts,
}: {
  accounts?: { secretKey: string; initBalanceEther?: number }[];
} = {}): Promise<Web3Provider> {
  const accountsToAdd = accounts?.map((account) => {
    const balance = account.initBalanceEther?.toString() ?? '100.0';

    return {
      secretKey: account.secretKey,
      balance: ethers.utils.parseEther(balance).toHexString(),
    };
  });

  const provider = new Web3Provider(
    ganache.provider({
      blockTime: parseInt(process.env.BLOCK_MINING_TIME || '0', 10),
      network_id: 1,
      accounts: accountsToAdd,
    }) as unknown as ExternalProvider,
  );
  // Wait for ganache to be properly instantiated.
  await provider.getBlockNumber();
  return provider;
}
