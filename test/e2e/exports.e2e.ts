import { ComplyDefiSDK } from "../../dist";

describe('Test exported module', () => {
  it('should export a module ComplyDefiSDK with ComplyDefi and utils', () => {
    expect(ComplyDefiSDK).toHaveProperty('ComplyDefi');
    expect(ComplyDefiSDK).toHaveProperty('utils');
  });
});
