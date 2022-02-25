const { ComplyDefiSDK } = require("../../src");

async function isComply(walletAddress) {
  // Create an instance of ComplyDefi using the identity address and the provider.
  const complyDefi = await ComplyDefiSDK.ComplyDefi.at('0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d', { provider } )

  // check the eligibility of the provided wallet address
  const isComply = await complyDefi.isComply(walletAddress);
  console.log(isComply);
  /*
      true/false
   */
}

(async () => {
  await isComply('walletAddress');
})();
