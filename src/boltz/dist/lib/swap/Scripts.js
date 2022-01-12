"use strict";
/**
 * This file is based on the repository github.com/submarineswaps/swaps-service created by Alex Bosworth
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.p2shP2wshOutput = exports.p2shP2wpkhOutput = exports.p2shOutput = exports.p2pkhOutput = exports.p2wshOutput = exports.p2wpkhOutput = void 0;
const bitcoin_ops_1 = __importDefault(require("@boltz/bitcoin-ops"));
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
/**
 * Get a P2WPKH output script
 *
 * @param hash public key hash hex Buffer
 *
 * @returns P2WPKH output script Buffer
 */
const p2wpkhOutput = (hash) => {
    return bitcoinjs_lib_1.script.compile([
        bitcoin_ops_1.default.OP_0,
        hash,
    ]);
};
exports.p2wpkhOutput = p2wpkhOutput;
/**
 * Encode a P2WSH output script
 *
 * @param scriptHex redeem script hex Buffer
 *
 * @returns P2WSH output script Buffer
 */
const p2wshOutput = (scriptHex) => {
    return bitcoinjs_lib_1.script.compile([
        bitcoin_ops_1.default.OP_0,
        bitcoinjs_lib_1.crypto.sha256(scriptHex),
    ]);
};
exports.p2wshOutput = p2wshOutput;
/**
 * Get a P2PKH output script
 *
 * @param hash public key hash hex Buffer
 *
 * @returns P2PKH output script Buffer
 */
const p2pkhOutput = (hash) => {
    return bitcoinjs_lib_1.script.compile([
        bitcoin_ops_1.default.OP_DUP,
        bitcoin_ops_1.default.OP_HASH160,
        hash,
        bitcoin_ops_1.default.OP_EQUALVERIFY,
        bitcoin_ops_1.default.OP_CHECKSIG,
    ]);
};
exports.p2pkhOutput = p2pkhOutput;
/**
 * Encode a P2SH output script
 *
 * @param scriptHex redeem script hex Buffer
 *
 * @returns P2SH output script Buffer
 */
const p2shOutput = (scriptHex) => {
    return bitcoinjs_lib_1.script.compile([
        bitcoin_ops_1.default.OP_HASH160,
        bitcoinjs_lib_1.crypto.hash160(scriptHex),
        bitcoin_ops_1.default.OP_EQUAL,
    ]);
};
exports.p2shOutput = p2shOutput;
/**
 * Get a P2SH nested P2WPKH output script
 *
 * @param hash public key hash hex Buffer
 */
const p2shP2wpkhOutput = (hash) => {
    const witness = (0, exports.p2wpkhOutput)(hash);
    return {
        redeemScript: witness,
        outputScript: (0, exports.p2shOutput)(witness),
    };
};
exports.p2shP2wpkhOutput = p2shP2wpkhOutput;
/**
 * Get a P2SH nested P2WSH output script
 *
 * @param scriptHex redeem script hex Buffer
 */
const p2shP2wshOutput = (scriptHex) => {
    const witness = (0, exports.p2wshOutput)(scriptHex);
    return (0, exports.p2shOutput)(witness);
};
exports.p2shP2wshOutput = p2shP2wshOutput;
//# sourceMappingURL=Scripts.js.map