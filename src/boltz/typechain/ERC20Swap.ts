/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ERC20SwapInterface extends utils.Interface {
  functions: {
    "claim(bytes32,uint256,address,address,uint256)": FunctionFragment;
    "hashValues(bytes32,uint256,address,address,address,uint256)": FunctionFragment;
    "lock(bytes32,uint256,address,address,uint256)": FunctionFragment;
    "lockPrepayMinerfee(bytes32,uint256,address,address,uint256)": FunctionFragment;
    "refund(bytes32,uint256,address,address,uint256)": FunctionFragment;
    "swaps(bytes32)": FunctionFragment;
    "version()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "claim",
    values: [BytesLike, BigNumberish, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "hashValues",
    values: [BytesLike, BigNumberish, string, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "lock",
    values: [BytesLike, BigNumberish, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "lockPrepayMinerfee",
    values: [BytesLike, BigNumberish, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "refund",
    values: [BytesLike, BigNumberish, string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "swaps", values: [BytesLike]): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hashValues", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lockPrepayMinerfee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "refund", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swaps", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;

  events: {
    "Claim(bytes32,bytes32)": EventFragment;
    "Lockup(bytes32,uint256,address,address,address,uint256)": EventFragment;
    "Refund(bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Claim"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Lockup"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Refund"): EventFragment;
}

export type ClaimEvent = TypedEvent<
  [string, string],
  { preimageHash: string; preimage: string }
>;

export type ClaimEventFilter = TypedEventFilter<ClaimEvent>;

export type LockupEvent = TypedEvent<
  [string, BigNumber, string, string, string, BigNumber],
  {
    preimageHash: string;
    amount: BigNumber;
    tokenAddress: string;
    claimAddress: string;
    refundAddress: string;
    timelock: BigNumber;
  }
>;

export type LockupEventFilter = TypedEventFilter<LockupEvent>;

export type RefundEvent = TypedEvent<[string], { preimageHash: string }>;

export type RefundEventFilter = TypedEventFilter<RefundEvent>;

export interface ERC20Swap extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ERC20SwapInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    claim(
      preimage: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      refundAddress: string,
      timelock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hashValues(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      refundAddress: string,
      timelock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    lock(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      timelock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    lockPrepayMinerfee(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      timelock: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    refund(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      timelock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swaps(arg0: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;

    version(overrides?: CallOverrides): Promise<[number]>;
  };

  claim(
    preimage: BytesLike,
    amount: BigNumberish,
    tokenAddress: string,
    refundAddress: string,
    timelock: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hashValues(
    preimageHash: BytesLike,
    amount: BigNumberish,
    tokenAddress: string,
    claimAddress: string,
    refundAddress: string,
    timelock: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  lock(
    preimageHash: BytesLike,
    amount: BigNumberish,
    tokenAddress: string,
    claimAddress: string,
    timelock: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  lockPrepayMinerfee(
    preimageHash: BytesLike,
    amount: BigNumberish,
    tokenAddress: string,
    claimAddress: string,
    timelock: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  refund(
    preimageHash: BytesLike,
    amount: BigNumberish,
    tokenAddress: string,
    claimAddress: string,
    timelock: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swaps(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;

  version(overrides?: CallOverrides): Promise<number>;

  callStatic: {
    claim(
      preimage: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      refundAddress: string,
      timelock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    hashValues(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      refundAddress: string,
      timelock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    lock(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      timelock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    lockPrepayMinerfee(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      timelock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    refund(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      timelock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    swaps(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;

    version(overrides?: CallOverrides): Promise<number>;
  };

  filters: {
    "Claim(bytes32,bytes32)"(
      preimageHash?: BytesLike | null,
      preimage?: null
    ): ClaimEventFilter;
    Claim(preimageHash?: BytesLike | null, preimage?: null): ClaimEventFilter;

    "Lockup(bytes32,uint256,address,address,address,uint256)"(
      preimageHash?: BytesLike | null,
      amount?: null,
      tokenAddress?: null,
      claimAddress?: null,
      refundAddress?: string | null,
      timelock?: null
    ): LockupEventFilter;
    Lockup(
      preimageHash?: BytesLike | null,
      amount?: null,
      tokenAddress?: null,
      claimAddress?: null,
      refundAddress?: string | null,
      timelock?: null
    ): LockupEventFilter;

    "Refund(bytes32)"(preimageHash?: BytesLike | null): RefundEventFilter;
    Refund(preimageHash?: BytesLike | null): RefundEventFilter;
  };

  estimateGas: {
    claim(
      preimage: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      refundAddress: string,
      timelock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hashValues(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      refundAddress: string,
      timelock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lock(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      timelock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    lockPrepayMinerfee(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      timelock: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    refund(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      timelock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swaps(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    claim(
      preimage: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      refundAddress: string,
      timelock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hashValues(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      refundAddress: string,
      timelock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lock(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      timelock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    lockPrepayMinerfee(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      timelock: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    refund(
      preimageHash: BytesLike,
      amount: BigNumberish,
      tokenAddress: string,
      claimAddress: string,
      timelock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swaps(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
