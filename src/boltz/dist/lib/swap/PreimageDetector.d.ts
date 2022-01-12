/// <reference types="node" />
import { Transaction } from 'bitcoinjs-lib';
/**
 * Detects the preimage from a claim transaction
 */
export declare const detectPreimage: (vin: number, claimTransaction: Transaction) => Buffer;
