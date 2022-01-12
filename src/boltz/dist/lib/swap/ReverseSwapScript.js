"use strict";
/**
 * This file is based on the repository github.com/submarineswaps/swaps-service created by Alex Bosworth
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin_ops_1 = __importDefault(require("@boltz/bitcoin-ops"));
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const SwapUtils_1 = require("./SwapUtils");
/**
 * Generate a reverse swap redeem script
 *
 * @param preimageHash hash of the preimage of the swap
 * @param claimPublicKey public key of the keypair needed for claiming
 * @param refundPublicKey public key of the keypair needed for refunding
 * @param timeoutBlockHeight at what block the HTLC should time out
 *
 * @returns redeem script
 */
const reverseSwapScript = (preimageHash, claimPublicKey, refundPublicKey, timeoutBlockHeight) => {
    const cltv = (0, SwapUtils_1.encodeCltv)(timeoutBlockHeight);
    return (0, SwapUtils_1.toPushdataScript)([
        bitcoin_ops_1.default.OP_SIZE,
        bitcoinjs_lib_1.script.number.encode(32),
        bitcoin_ops_1.default.OP_EQUAL,
        bitcoin_ops_1.default.OP_IF,
        bitcoin_ops_1.default.OP_HASH160,
        bitcoinjs_lib_1.crypto.ripemd160(preimageHash),
        bitcoin_ops_1.default.OP_EQUALVERIFY,
        claimPublicKey,
        bitcoin_ops_1.default.OP_ELSE,
        bitcoin_ops_1.default.OP_DROP,
        cltv,
        bitcoin_ops_1.default.OP_CHECKLOCKTIMEVERIFY,
        bitcoin_ops_1.default.OP_DROP,
        refundPublicKey,
        bitcoin_ops_1.default.OP_ENDIF,
        bitcoin_ops_1.default.OP_CHECKSIG,
    ]);
};
exports.default = reverseSwapScript;
//# sourceMappingURL=ReverseSwapScript.js.map