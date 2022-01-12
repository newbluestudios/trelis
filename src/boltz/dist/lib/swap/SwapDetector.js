"use strict";
/**
 * This file is based on the repository github.com/submarineswaps/swaps-service created by Alex Bosworth
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectSwap = void 0;
const Utils_1 = require("../Utils");
const Enums_1 = require("../consts/Enums");
const Scripts_1 = require("./Scripts");
/**
 * Detects a swap output with the matching redeem script in a transaction
 */
const detectSwap = (redeemScript, transaction) => {
    const scripts = [
        (0, Scripts_1.p2shOutput)(redeemScript),
        (0, Scripts_1.p2shP2wshOutput)(redeemScript),
        (0, Scripts_1.p2wshOutput)(redeemScript),
    ].map(value => (0, Utils_1.getHexString)(value));
    let returnValue = undefined;
    transaction.outs.forEach((output, vout) => {
        const index = scripts.indexOf((0, Utils_1.getHexString)(output.script));
        const swapOutput = {
            vout,
            script: output.script,
            value: output.value,
        };
        switch (index) {
            case 0:
                returnValue = Object.assign({ type: Enums_1.OutputType.Legacy }, swapOutput);
                break;
            case 1:
                returnValue = Object.assign({ type: Enums_1.OutputType.Compatibility }, swapOutput);
                break;
            case 2:
                returnValue = Object.assign({ type: Enums_1.OutputType.Bech32 }, swapOutput);
                break;
        }
    });
    return returnValue;
};
exports.detectSwap = detectSwap;
//# sourceMappingURL=SwapDetector.js.map