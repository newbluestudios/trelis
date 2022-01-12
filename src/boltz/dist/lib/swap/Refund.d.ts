/**
 * This file is based on the repository github.com/submarineswaps/swaps-service created by Alex Bosworth
 */
/// <reference types="node" />
import { Transaction } from 'bitcoinjs-lib';
import { RefundDetails } from '../consts/Types';
/**
 * Refund swaps
 *
 * @param utxos UTXOs that should be refunded
 * @param destinationScript the output script to which the funds should be sent
 * @param timeoutBlockHeight locktime of the transaction
 * @param feePerByte how many satoshis per vbyte should be paid as fee
 * @param isRbf whether the transaction should signal full Replace-by-Fee
 */
export declare const constructRefundTransaction: (utxos: RefundDetails[], destinationScript: Buffer, timeoutBlockHeight: number, feePerByte: number, isRbf?: boolean) => Transaction;
