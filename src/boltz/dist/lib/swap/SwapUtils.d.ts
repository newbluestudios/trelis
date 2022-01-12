/**
 * This file is based on the repository github.com/submarineswaps/swaps-service created by Alex Bosworth
 */
/// <reference types="node" />
import { ScriptElement } from '../consts/Types';
import { Output } from '../FeeCalculator';
/**
 * Encode a signature
 *
 * @param flag signature hash flag number
 * @param signature signature hex Buffer
 *
 * @returns encoded signature Buffer
 */
export declare const encodeSignature: (flag: number, signature: Buffer) => Buffer;
/**
 * Convert an array of ScriptElement to a formed script
 *
 * @param elements array of ScriptElement
 *
 * @returns a script Buffer
 */
export declare const scriptBuffersToScript: (elements: ScriptElement[]) => Buffer;
/**
 * Convert an array of ScriptElement to a formed pushdata script
 *
 * @param elements array of ScriptElement
 *
 * @returns a script Buffer
 */
export declare const toPushdataScript: (elements: ScriptElement[]) => Buffer;
/**
 * Get the OutputType and whether it is a SH of a output script
 */
export declare const getOutputScriptType: (outputScript: Buffer) => Output | undefined;
/**
 * Encode a block height into a formed pushdata script
 */
export declare const encodeCltv: (timeoutBlockHeight: number) => Buffer;
