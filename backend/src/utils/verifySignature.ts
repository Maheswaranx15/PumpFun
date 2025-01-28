import { ethers } from "ethers";

/**
 * Verifies the signature of a message.
 *
 * @param signedMessage - The signed message.
 * @param message - The original message.
 * @param address - The address to verify against.
 * @returns A boolean indicating whether the signature is valid.
 */
export function verifySignature(
  signedMessage: string,
  message: string,
  address: string
): boolean {
  const recoveredAddress: string = ethers.verifyMessage(message, signedMessage);
  return recoveredAddress.toLowerCase() === address.toLowerCase();
}
