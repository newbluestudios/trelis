"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHexString = exports.getHexBuffer = void 0;
/**
 * Get a hex encoded Buffer from a string
 *
 * @returns a hex encoded Buffer
 */
const getHexBuffer = (input) => {
    return Buffer.from(input, 'hex');
};
exports.getHexBuffer = getHexBuffer;
/**
 * Get a hex encoded string from a Buffer
 *
 * @returns a hex encoded string
 */
const getHexString = (input) => {
    return input.toString('hex');
};
exports.getHexString = getHexString;
//# sourceMappingURL=Utils.js.map