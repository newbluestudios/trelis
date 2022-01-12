"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPreimage = void 0;
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
/**
 * Detects the preimage from a claim transaction
 */
const detectPreimage = (vin, claimTransaction) => {
    const input = claimTransaction.ins[vin];
    // Get the preimage for P2WSH and nested P2SH-P2WSH
    if (input.witness.length !== 0) {
        // The second element of the witness is the preimage
        return input.witness[1];
    }
    else {
        // Get the preimage of legacy P2SH
        const scriptBuffers = bitcoinjs_lib_1.script.decompile(input.script);
        // The second element of the script is the preimage
        return scriptBuffers[1];
    }
};
exports.detectPreimage = detectPreimage;
//# sourceMappingURL=PreimageDetector.js.map