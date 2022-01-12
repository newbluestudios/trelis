"use strict";
/**
 * This file is based on the repository github.com/submarineswaps/swaps-service created by Alex Bosworth
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructClaimTransaction = void 0;
const bip65 = __importStar(require("bip65"));
const bitcoin_ops_1 = __importDefault(require("@boltz/bitcoin-ops"));
const varuint = __importStar(require("varuint-bitcoin"));
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const Errors_1 = __importDefault(require("../consts/Errors"));
const Enums_1 = require("../consts/Enums");
const FeeCalculator_1 = require("../FeeCalculator");
const SwapUtils_1 = require("./SwapUtils");
/**
 * Claim swaps
 *
 * @param utxos UTXOs that should be claimed or refunded
 * @param destinationScript the output script to which the funds should be sent
 * @param feePerByte how many satoshis per vbyte should be paid as fee
 * @param isRbf whether the transaction should signal full Replace-by-Fee
 * @param timeoutBlockHeight locktime of the transaction; only needed if the transaction is a refund
 */
const constructClaimTransaction = (utxos, destinationScript, feePerByte, isRbf = true, timeoutBlockHeight) => {
    for (const input of utxos) {
        if (input.type === Enums_1.OutputType.Taproot) {
            throw Errors_1.default.TAPROOT_NOT_SUPPORTED;
        }
    }
    const tx = new bitcoinjs_lib_1.Transaction();
    // Refund transactions are just like claim ones and therefore this method
    // is also used for refunds. The locktime of refund transactions has to be
    // after the timelock of the UTXO is expired
    if (timeoutBlockHeight) {
        tx.locktime = bip65.encode({ blocks: timeoutBlockHeight });
    }
    // The sum of the values of all UTXOs that should be claimed or refunded
    let utxoValueSum = 0;
    const feeInputs = [];
    utxos.forEach((utxo) => {
        utxoValueSum += utxo.value;
        feeInputs.push({ type: utxo.type, swapDetails: utxo });
        // Add the swap as input to the transaction
        //
        // RBF reference: https://github.com/bitcoin/bips/blob/master/bip-0125.mediawiki#summary
        tx.addInput(utxo.txHash, utxo.vout, isRbf ? 0xfffffffd : 0xffffffff);
    });
    // Estimate the fee for the transaction
    const fee = (0, FeeCalculator_1.estimateFee)(feePerByte, feeInputs, [(0, SwapUtils_1.getOutputScriptType)(destinationScript)]);
    // Send the sum of the UTXOs minus the estimated fee to the destination address
    tx.addOutput(destinationScript, utxoValueSum - fee);
    utxos.forEach((utxo, index) => {
        switch (utxo.type) {
            // Construct and sign the input scripts for P2SH inputs
            case Enums_1.OutputType.Legacy: {
                const sigHash = tx.hashForSignature(index, utxo.redeemScript, bitcoinjs_lib_1.Transaction.SIGHASH_ALL);
                const signature = utxo.keys.sign(sigHash);
                const inputScript = [
                    (0, SwapUtils_1.encodeSignature)(bitcoinjs_lib_1.Transaction.SIGHASH_ALL, signature),
                    utxo.preimage,
                    bitcoin_ops_1.default.OP_PUSHDATA1,
                    utxo.redeemScript,
                ];
                tx.setInputScript(index, (0, SwapUtils_1.scriptBuffersToScript)(inputScript));
                break;
            }
            // Construct the nested redeem script for nested SegWit inputs
            case Enums_1.OutputType.Compatibility: {
                const nestedScript = [
                    varuint.encode(bitcoin_ops_1.default.OP_0).toString('hex'),
                    bitcoinjs_lib_1.crypto.sha256(utxo.redeemScript),
                ];
                const nested = (0, SwapUtils_1.scriptBuffersToScript)(nestedScript);
                tx.setInputScript(index, (0, SwapUtils_1.scriptBuffersToScript)([nested]));
                break;
            }
        }
        // Construct and sign the witness for (nested) SegWit inputs
        if (utxo.type !== Enums_1.OutputType.Legacy) {
            const sigHash = tx.hashForWitnessV0(index, utxo.redeemScript, utxo.value, bitcoinjs_lib_1.Transaction.SIGHASH_ALL);
            const signature = bitcoinjs_lib_1.script.signature.encode(utxo.keys.sign(sigHash), bitcoinjs_lib_1.Transaction.SIGHASH_ALL);
            tx.setWitness(index, [
                signature,
                utxo.preimage,
                utxo.redeemScript,
            ]);
        }
    });
    return tx;
};
exports.constructClaimTransaction = constructClaimTransaction;
//# sourceMappingURL=Claim.js.map