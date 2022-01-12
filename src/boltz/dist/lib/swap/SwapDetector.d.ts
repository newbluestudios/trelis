/**
 * This file is based on the repository github.com/submarineswaps/swaps-service created by Alex Bosworth
 */
/// <reference types="node" />
import { Transaction, TxOutput } from 'bitcoinjs-lib';
import { OutputType } from '../consts/Enums';
declare type DetectedSwap = {
    type: OutputType;
    vout: number;
} & TxOutput | undefined;
/**
 * Detects a swap output with the matching redeem script in a transaction
 */
export declare const detectSwap: (redeemScript: Buffer, transaction: Transaction) => DetectedSwap;
export {};
