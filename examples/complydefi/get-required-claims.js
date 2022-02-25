const { ComplyDefiSDK } = require("../../src");

async function getRequiredClaims() {
  // Create an instance of ComplyDefi using the identity address and the provider.
  const complyDefi = await ComplyDefiSDK.ComplyDefi.at('0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d', { provider } )

  const claims = await complyDefi.getRequiredClaims();
  console.log(claims[0]);
  /*
      {
        id: '0x...',
        topic: 1784,
        scheme: 1974,
        issuer: '0x...',
        signature: '0x...'',
        data: '0x...',
        uri: 'https://...',
      }
   */
}

(async () => {
  await getRequiredClaims();
})();
