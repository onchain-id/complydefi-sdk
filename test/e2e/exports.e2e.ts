import { ComplyDefiSDK } from "../../dist";

describe('Test exported module', () => {
  it('should export a module ComplyDefiSDK with Complydefi and utils', () => {
    expect(ComplyDefiSDK).toHaveProperty('Complydefi');
    expect(ComplyDefiSDK).toHaveProperty('utils');
  });
});
