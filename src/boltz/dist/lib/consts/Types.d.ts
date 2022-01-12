/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { ECPairInterface } from 'ecpair';
import { TxOutput } from 'bitcoinjs-lib';
import { OutputType } from './Enums';
export declare type Error = {
    message: string;
    code: string;
};
export declare type ScriptElement = Buffer | number | string;
export declare type TransactionOutput = {
    txHash: Buffer;
    vout: number;
    type: OutputType;
} & TxOutput;
export declare type RefundDetails = TransactionOutput & {
    keys: ECPairInterface | BIP32Interface;
    redeemScript: Buffer;
};
export declare type ClaimDetails = RefundDetails & {
    preimage: Buffer;
};
