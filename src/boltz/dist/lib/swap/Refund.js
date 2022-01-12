"use strict";
/**
 * This file is based on the repository github.com/submarineswaps/swaps-service created by Alex Bosworth
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructRefundTransaction = void 0;
const Utils_1 = require("../Utils");
const Claim_1 = require("./Claim");
const dummyPreimage = (0, Utils_1.getHexBuffer)('0x00');
/**
 * Refund swaps
 *
 * @param utxos UTXOs that should be refunded
 * @param destinationScript the output script to which the funds should be sent
 * @param timeoutBlockHeight locktime of the transaction
 * @param feePerByte how many satoshis per vbyte should be paid as fee
 * @param isRbf whether the transaction should signal full Replace-by-Fee
 */
const constructRefundTransaction = (utxos, destinationScript, timeoutBlockHeight, feePerByte, isRbf = true) => {
    const claimUtxos = [];
    utxos.forEach((utxo) => {
        claimUtxos.push(Object.assign({ preimage: dummyPreimage }, utxo));
    });
    return (0, Claim_1.constructClaimTransaction)(claimUtxos, destinationScript, feePerByte, isRbf, timeoutBlockHeight);
};
exports.constructRefundTransaction = constructRefundTransaction;
//# sourceMappingURL=Refund.js.map