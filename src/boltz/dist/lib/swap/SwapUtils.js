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
exports.encodeCltv = exports.getOutputScriptType = exports.toPushdataScript = exports.scriptBuffersToScript = exports.encodeSignature = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const bip66_1 = __importDefault(require("bip66"));
const bip65 = __importStar(require("bip65"));
const bitcoin_ops_1 = __importDefault(require("@boltz/bitcoin-ops"));
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const varuint = __importStar(require("varuint-bitcoin"));
const Enums_1 = require("../consts/Enums");
const Utils_1 = require("../Utils");
const zeroHexBuffer = (0, Utils_1.getHexBuffer)('00');
/**
 * DER encode bytes to eliminate sign confusion in a big-endian number
 *
 * @param point bytes to encode
 *
 * @returns an encoded point buffer
 */
const derEncode = (point) => {
    let i = 0;
    let x = (0, Utils_1.getHexBuffer)(point);
    while (x[i] === 0) {
        i += 1;
    }
    if (i === x.length) {
        return zeroHexBuffer;
    }
    x = x.slice(i);
    if (x[0] & 0x80) {
        return Buffer.concat([zeroHexBuffer, x], x.length + 1);
    }
    else {
        return x;
    }
};
/**
 * Encode a signature
 *
 * @param flag signature hash flag number
 * @param signature signature hex Buffer
 *
 * @returns encoded signature Buffer
 */
const encodeSignature = (flag, signature) => {
    const pointSize = 32;
    const signatureEnd = pointSize + pointSize;
    const hashType = Buffer.from([flag]);
    const r = derEncode((0, Utils_1.getHexString)(signature.slice(0, pointSize)));
    const s = derEncode((0, Utils_1.getHexString)(signature.slice(pointSize, signatureEnd)));
    return Buffer.concat([bip66_1.default.encode(r, s), hashType]);
};
exports.encodeSignature = encodeSignature;
/**
 * Convert an array of ScriptElement to a formed script
 *
 * @param elements array of ScriptElement
 *
 * @returns a script Buffer
 */
const scriptBuffersToScript = (elements) => {
    const buffers = [];
    elements.forEach((element) => {
        if (Buffer.isBuffer(element)) {
            buffers.push(Buffer.concat([varuint.encode(element.length), element]));
        }
        else {
            buffers.push((0, Utils_1.getHexBuffer)(element.toString(16)));
        }
    });
    return Buffer.concat(buffers);
};
exports.scriptBuffersToScript = scriptBuffersToScript;
/**
 * Convert an array of ScriptElement to a formed pushdata script
 *
 * @param elements array of ScriptElement
 *
 * @returns a script Buffer
 */
const toPushdataScript = (elements) => {
    const buffers = [];
    elements.forEach((element) => {
        if (Buffer.isBuffer(element)) {
            buffers.push(Buffer.concat([varuint.encode(element.length), element]));
        }
        else {
            buffers.push(new bn_js_1.default(element, 10).toArrayLike(Buffer));
        }
    });
    return Buffer.concat(buffers);
};
exports.toPushdataScript = toPushdataScript;
/**
 * Get the OutputType and whether it is a SH of a output script
 */
const getOutputScriptType = (outputScript) => {
    const rawScript = bitcoinjs_lib_1.script.decompile(outputScript);
    if (rawScript && rawScript.length > 1) {
        switch (rawScript[0]) {
            case bitcoin_ops_1.default.OP_0: {
                // If the second entry of the script array has the length of 20 it is a
                // PKH output if not it is a SH output
                const secondEntry = rawScript[1];
                let isSh = false;
                if (secondEntry.length !== 20) {
                    isSh = true;
                }
                return {
                    isSh,
                    type: Enums_1.OutputType.Bech32,
                };
            }
            case bitcoin_ops_1.default.OP_1:
                return { isSh: false, type: Enums_1.OutputType.Taproot };
            case bitcoin_ops_1.default.OP_HASH160:
                // The FeeCalculator treats legacy SH outputs the same way as compatibility PKH ones
                // Which one of the aforementioned types the outputScript is does not
                // matter for the fee estimation of a output
                return { type: Enums_1.OutputType.Legacy, isSh: true };
            case bitcoin_ops_1.default.OP_DUP: return { type: Enums_1.OutputType.Legacy, isSh: false };
        }
    }
    return;
};
exports.getOutputScriptType = getOutputScriptType;
/**
 * Encode a block height into a formed pushdata script
 */
const encodeCltv = (timeoutBlockHeight) => {
    return bitcoinjs_lib_1.script.number.encode(bip65.encode({ blocks: timeoutBlockHeight }));
};
exports.encodeCltv = encodeCltv;
//# sourceMappingURL=SwapUtils.js.map