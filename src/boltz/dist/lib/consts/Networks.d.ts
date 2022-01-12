import { networks } from 'bitcoinjs-lib';
declare const Networks: {
    bitcoinMainnet: networks.Network;
    bitcoinTestnet: networks.Network;
    bitcoinSimnet: {
        messagePrefix: string;
        bip32: {
            public: number;
            private: number;
        };
        bech32: string;
        scriptHash: number;
        pubKeyHash: number;
        wif: number;
    };
    bitcoinRegtest: networks.Network;
    litecoinMainnet: {
        messagePrefix: string;
        bip32: {
            private: number;
            public: number;
        };
        bech32: string;
        scriptHash: number;
        pubKeyHash: number;
        wif: number;
    };
    litecoinTestnet: {
        messagePrefix: string;
        bip32: {
            public: number;
            private: number;
        };
        bech32: string;
        scriptHash: number;
        pubKeyHash: number;
        wif: number;
    };
    litecoinSimnet: {
        messagePrefix: string;
        bip32: {
            public: number;
            private: number;
        };
        bech32: string;
        scriptHash: number;
        pubKeyHash: number;
        wif: number;
    };
    litecoinRegtest: {
        messagePrefix: string;
        bip32: {
            public: number;
            private: number;
        };
        bech32: string;
        scriptHash: number;
        pubKeyHash: number;
        wif: number;
    };
    dogecoinMainnet: {
        messagePrefix: string;
        bip32: {
            public: number;
            private: number;
        };
        pubKeyHash: number;
        scriptHash: number;
        wif: number;
    };
    dogecoinTestnet: {
        messagePrefix: string;
        bip32: {
            public: number;
            private: number;
        };
        pubKeyHash: number;
        scriptHash: number;
        wif: number;
    };
    dogecoinRegtest: {
        messagePrefix: string;
        bip32: {
            public: number;
            private: number;
        };
        pubKeyHash: number;
        scriptHash: number;
        wif: number;
    };
};
export default Networks;
