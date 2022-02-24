import {
  arrayify,
  hexlify,
  isHexString as ethersIsHexString,
  toUtf8Bytes,
  defaultAbiCoder,
  keccak256
} from 'ethers/lib/utils';

export function toHex(message: string): string {
  return hexlify(toUtf8Bytes(message));
}

export type HexString = string;
export function isHexString(value: any): value is HexString {
  return typeof value === 'string' && ethersIsHexString(value);
}

/**
 * Check if an URI is valid.
 * @param value
 * @return True if the uri is secured.
 */
export function isValidURI(value: any): boolean {
  return typeof value === 'string' && value.match(/^https?:\/\/.*\..*/) !== null;
}

export function encodeAndHash(types: string[], values: any[]): string {
  return keccak256(defaultAbiCoder.encode(types, values));
}

export { arrayify, defaultAbiCoder };
