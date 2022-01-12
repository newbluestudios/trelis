/**
 * This file is based on the repository github.com/submarineswaps/swaps-service created by Alex Bosworth
 */
/// <reference types="node" />
/**
 * Generate a swap redeem script
 *
 * @param preimageHash hash of the preimage of the swap
 * @param claimPublicKey public key of the keypair needed for claiming
 * @param refundPublicKey public key of the keypair needed for refunding
 * @param timeoutBlockHeight at what block the HTLC should time out
 *
 * @returns redeem script
 */
declare const swapScript: (preimageHash: Buffer, claimPublicKey: Buffer, refundPublicKey: Buffer, timeoutBlockHeight: number) => Buffer;
export default swapScript;
