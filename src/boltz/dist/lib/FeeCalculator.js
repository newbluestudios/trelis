"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateFee = exports.estimateSize = void 0;
const Errors_1 = __importDefault(require("./consts/Errors"));
const Enums_1 = require("./consts/Enums");
// Estimations for the vbytes of different PKH inputs
const inputVbytesEstimations = {
    [Enums_1.OutputType.Bech32]: 108 + (41 * 4),
    [Enums_1.OutputType.Compatibility]: 108 + (64 * 4),
    [Enums_1.OutputType.Legacy]: 148 * 4,
};
// Estimations for the vbytes of different PKH and SH outputs
const outputVbytesEstimations = {
    pkh: {
        [Enums_1.OutputType.Bech32]: 31 * 4,
        [Enums_1.OutputType.Legacy]: 34 * 4,
        [Enums_1.OutputType.Taproot]: 43 * 4,
    },
    sh: {
        [Enums_1.OutputType.Bech32]: 44 * 4,
        [Enums_1.OutputType.Legacy]: 32 * 4,
    },
};
const estimateInput = (input) => {
    if (input.type === Enums_1.OutputType.Taproot) {
        throw Errors_1.default.TAPROOT_NOT_SUPPORTED;
    }
    if (input.swapDetails) {
        const swapSize = [
            // PUSHDATA opcode
            1,
            // ECDSA signature
            72,
            // PUSHDATA opcode if there is a preimage
            input.swapDetails.preimage ? 1 : 0,
            // preimage if there is one
            input.swapDetails.preimage ? input.swapDetails.preimage.length : 0,
            // Sequence
            4,
            // Redeemscript
            input.swapDetails.redeemScript.length,
        ].reduce((swapSize, n) => swapSize + n);
        switch (input.type) {
            case Enums_1.OutputType.Bech32:
                return 41 * 4 + swapSize;
            case Enums_1.OutputType.Compatibility:
                return ((41 + 35) * 4) + swapSize;
            case Enums_1.OutputType.Legacy:
                return (swapSize + 41) * 4;
        }
        return 0;
    }
    else {
        return inputVbytesEstimations[input.type];
    }
};
const estimateOutput = (output) => {
    if (output.type === Enums_1.OutputType.Compatibility) {
        return outputVbytesEstimations.sh[Enums_1.OutputType.Legacy];
    }
    if (output.isSh) {
        return outputVbytesEstimations.sh[output.type];
    }
    else {
        return outputVbytesEstimations.pkh[output.type];
    }
};
/**
 * Estimates the vbytes of a transaction
 */
const estimateSize = (inputs, outputs) => {
    // A raw transaction has always 4 bytes for the version and 4 for the locktime
    let sum = 8 * 4;
    let hasWitness = false;
    inputs.forEach((input) => {
        if (input.type !== Enums_1.OutputType.Legacy) {
            hasWitness = true;
        }
        sum += estimateInput(input);
    });
    outputs.forEach((output) => {
        sum += estimateOutput(output);
    });
    if (hasWitness) {
        sum += 8;
    }
    // Divide the weight by 4 and round it up to the next integer
    return Math.ceil(sum / 4);
};
exports.estimateSize = estimateSize;
/**
 * Estimates the amount of satoshis that should be paid as fee
 */
const estimateFee = (satsPerVbyte, inputs, outputs) => {
    const size = (0, exports.estimateSize)(inputs, outputs);
    return size * satsPerVbyte;
};
exports.estimateFee = estimateFee;
//# sourceMappingURL=FeeCalculator.js.map