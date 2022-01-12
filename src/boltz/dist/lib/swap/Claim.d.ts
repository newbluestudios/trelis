/**
 * This file is based on the repository github.com/submarineswaps/swaps-service created by Alex Bosworth
 */
/// <reference types="node" />
import { Transaction } from 'bitcoinjs-lib';
import { ClaimDetails } from '../consts/Types';
/**
 * Claim swaps
 *
 * @param utxos UTXOs that should be claimed or refunded
 * @param destinationScript the output script to which the funds should be sent
 * @param feePerByte how many satoshis per vbyte should be paid as fee
 * @param isRbf whether the transaction should signal full Replace-by-Fee
 * @param timeoutBlockHeight locktime of the transaction; only needed if the transaction is a refund
 */
export declare const constructClaimTransaction: (utxos: ClaimDetails[], destinationScript: Buffer, feePerByte: number, isRbf?: boolean, timeoutBlockHeight?: number | undefined) => Transaction;
