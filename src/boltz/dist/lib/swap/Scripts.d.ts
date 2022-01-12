/**
 * This file is based on the repository github.com/submarineswaps/swaps-service created by Alex Bosworth
 */
/// <reference types="node" />
/**
 * Get a P2WPKH output script
 *
 * @param hash public key hash hex Buffer
 *
 * @returns P2WPKH output script Buffer
 */
export declare const p2wpkhOutput: (hash: Buffer) => Buffer;
/**
 * Encode a P2WSH output script
 *
 * @param scriptHex redeem script hex Buffer
 *
 * @returns P2WSH output script Buffer
 */
export declare const p2wshOutput: (scriptHex: Buffer) => Buffer;
/**
 * Get a P2PKH output script
 *
 * @param hash public key hash hex Buffer
 *
 * @returns P2PKH output script Buffer
 */
export declare const p2pkhOutput: (hash: Buffer) => Buffer;
/**
 * Encode a P2SH output script
 *
 * @param scriptHex redeem script hex Buffer
 *
 * @returns P2SH output script Buffer
 */
export declare const p2shOutput: (scriptHex: Buffer) => Buffer;
/**
 * Get a P2SH nested P2WPKH output script
 *
 * @param hash public key hash hex Buffer
 */
export declare const p2shP2wpkhOutput: (hash: Buffer) => {
    redeemScript: Buffer;
    outputScript: Buffer;
};
/**
 * Get a P2SH nested P2WSH output script
 *
 * @param scriptHex redeem script hex Buffer
 */
export declare const p2shP2wshOutput: (scriptHex: Buffer) => Buffer;
