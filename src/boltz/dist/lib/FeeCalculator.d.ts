/// <reference types="node" />
import { OutputType } from './consts/Enums';
export declare type Input = {
    type: OutputType;
    swapDetails?: {
        redeemScript: Buffer;
        preimage?: Buffer;
    };
};
export declare type Output = {
    type: OutputType;
    isSh?: boolean;
};
/**
 * Estimates the vbytes of a transaction
 */
export declare const estimateSize: (inputs: Input[], outputs: Output[]) => number;
/**
 * Estimates the amount of satoshis that should be paid as fee
 */
export declare const estimateFee: (satsPerVbyte: number, inputs: Input[], outputs: Output[]) => number;
