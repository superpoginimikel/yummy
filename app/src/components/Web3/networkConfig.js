const networkConfigs = {
    1: {
        chainId: "0001",
        chainName: "Ethereum Mainnet",
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: ["https://main-light.eth.linkpool.io/"],
        blockExplorerUrls: ["https://etherscan.io"],
    },
    4: {
        chainId: "0004",
        chainName: "Rinkeby Network",
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: ["https://rinkeby-light.eth.linkpool.io/"],
        blockExplorerUrls: ["https://etherscan.io"],
    },
    137: {
        chainId: "0x89",
        chainName: "Matic(Polygon) Mainnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
        },
        rpcUrls: ["https://rpc-mainnet.matic.network", "https://rpc-mainnet.maticvigil.com"],
        blockExplorerUrls: ["https://polygonscan.com/"],
    },
    80001: {
        chainId: "0x13881",
        chainName: "Matic Testnet Mumbai",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
        },
        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com/"],
    },
}

export default networkConfigs;