import Errors from './consts/Errors';
import Networks from './consts/Networks';
import * as Scripts from './swap/Scripts';
import swapScript from './swap/SwapScript';
import { OutputType } from './consts/Enums';
import * as SwapUtils from './swap/SwapUtils';
import { detectSwap } from './swap/SwapDetector';
import reverseSwapScript from './swap/ReverseSwapScript';
import { constructClaimTransaction } from './swap/Claim';
import { detectPreimage } from './swap/PreimageDetector';
import { constructRefundTransaction } from './swap/Refund';
import { estimateFee, estimateSize } from './FeeCalculator';
import { ScriptElement, TransactionOutput } from './consts/Types';
declare const ContractABIs: {
    ERC20: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    EtherSwap: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    ERC20Swap: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
};
export { Errors, Networks, OutputType, ScriptElement, TransactionOutput, Scripts, swapScript, reverseSwapScript, detectSwap, detectPreimage, estimateFee, estimateSize, constructClaimTransaction, constructRefundTransaction, SwapUtils, ContractABIs, };
