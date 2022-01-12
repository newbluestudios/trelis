"use strict";
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
exports.ContractABIs = exports.SwapUtils = exports.constructRefundTransaction = exports.constructClaimTransaction = exports.estimateSize = exports.estimateFee = exports.detectPreimage = exports.detectSwap = exports.reverseSwapScript = exports.swapScript = exports.Scripts = exports.OutputType = exports.Networks = exports.Errors = void 0;
const Errors_1 = __importDefault(require("./consts/Errors"));
exports.Errors = Errors_1.default;
const Networks_1 = __importDefault(require("./consts/Networks"));
exports.Networks = Networks_1.default;
const Scripts = __importStar(require("./swap/Scripts"));
exports.Scripts = Scripts;
const SwapScript_1 = __importDefault(require("./swap/SwapScript"));
exports.swapScript = SwapScript_1.default;
const Enums_1 = require("./consts/Enums");
Object.defineProperty(exports, "OutputType", { enumerable: true, get: function () { return Enums_1.OutputType; } });
const SwapUtils = __importStar(require("./swap/SwapUtils"));
exports.SwapUtils = SwapUtils;
const SwapDetector_1 = require("./swap/SwapDetector");
Object.defineProperty(exports, "detectSwap", { enumerable: true, get: function () { return SwapDetector_1.detectSwap; } });
const ReverseSwapScript_1 = __importDefault(require("./swap/ReverseSwapScript"));
exports.reverseSwapScript = ReverseSwapScript_1.default;
const Claim_1 = require("./swap/Claim");
Object.defineProperty(exports, "constructClaimTransaction", { enumerable: true, get: function () { return Claim_1.constructClaimTransaction; } });
const PreimageDetector_1 = require("./swap/PreimageDetector");
Object.defineProperty(exports, "detectPreimage", { enumerable: true, get: function () { return PreimageDetector_1.detectPreimage; } });
const Refund_1 = require("./swap/Refund");
Object.defineProperty(exports, "constructRefundTransaction", { enumerable: true, get: function () { return Refund_1.constructRefundTransaction; } });
const FeeCalculator_1 = require("./FeeCalculator");
Object.defineProperty(exports, "estimateFee", { enumerable: true, get: function () { return FeeCalculator_1.estimateFee; } });
Object.defineProperty(exports, "estimateSize", { enumerable: true, get: function () { return FeeCalculator_1.estimateSize; } });
const EtherSwap_json_1 = __importDefault(require("../artifacts/contracts/EtherSwap.sol/EtherSwap.json"));
const ERC20Swap_json_1 = __importDefault(require("../artifacts/contracts/ERC20Swap.sol/ERC20Swap.json"));
const ERC20_json_1 = __importDefault(require("../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json"));
const ContractABIs = {
    ERC20: ERC20_json_1.default.abi,
    EtherSwap: EtherSwap_json_1.default.abi,
    ERC20Swap: ERC20Swap_json_1.default.abi,
};
exports.ContractABIs = ContractABIs;
//# sourceMappingURL=Boltz.js.map