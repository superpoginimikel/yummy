import React, { useState, useEffect } from 'react';
import { useWeb3Wallet } from './Connector';
require("dotenv").config();

const Web3Context = React.createContext();
const Web3Consumer = Web3Context.Consumer;

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const initialState = {
  accounts: [],
  networkId: null,
  selectedAccount: null,
  walletProvider: null,
  ready: false
}

function Web3Provider(props) {
  const [networkId, setNetworkId] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [walletProvider, setWalletProvider] = useState(null);
  const [ready, setReady] = useState(false)
  const web3Wallet = useWeb3Wallet({setNetworkId, setSelectedAccount, setState, initialState});

  // setting initial user loaded flag
  useEffect(() => {
    (async () => {
      const res = await web3Wallet.getCurrentConnectedWallet();
      console.log(res);
      if (res) { setState(res); }

      setReady(true);
    })();
  }, [])

  async function connect() {
    try {
      const res = await web3Wallet.connect();
      setState(res);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async function switchNetwork(networkId) {
    await web3Wallet.switchNetwork(networkId);
  }

  function setState ({ networkId, selectedAccount, walletProvider }) {
    setNetworkId(networkId)
    setSelectedAccount(selectedAccount)
    setWalletProvider(walletProvider)
  }

  return (
    <Web3Context.Provider value={{
      initialState,
      web3,
      networkId,
      selectedAccount,
      setSelectedAccount,
      walletProvider,
      setState,
      setNetworkId,
      switchNetwork,
      ready,
      setReady,
      connect,
    }}>
      {props.children}
    </Web3Context.Provider>
  );
}

export { Web3Context, Web3Provider, Web3Consumer };
