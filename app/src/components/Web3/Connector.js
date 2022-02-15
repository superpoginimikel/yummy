import { useEffect } from 'react';
import { connectToMetamask, switchNetworkMetamask, getCurrentWalletConnectedMetamask } from './MetamaskConnector';

export function useWeb3Wallet({setNetworkId, setSelectedAccount, setState, initialState}) {
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('connect', onConnected);
      window.ethereum.on('disconnect', onDisconnected);
      window.ethereum.on('accountsChanged', onStateChange);
      window.ethereum.on('chainChanged', onNetworkChange)
    }
  }, [])

  const onStateChange = async (accounts) => {
    console.log("Account Change", accounts);
    if (accounts.length > 0){
      setSelectedAccount(accounts[0])
    } else {
      setState({...initialState})

      if (window.ethereum) {
        window.ethereum.removeListener('connect', onConnected);
        window.ethereum.removeListener('disconnect', onDisconnected);
        window.ethereum.removeListener('accountsChanged', onStateChange);
        window.ethereum.removeListener('chainChanged', onNetworkChange);
      }
    }
  }

  const onNetworkChange = async (chainId) => {
    setNetworkId(chainId);
  }

  const onDisconnected = async () => {
    console.log("disconnected")
    setState({...initialState});
  }

  const onConnected = async () => {
    console.log('connected')
  }

  const connect = async () => {
    // if user disconnects, need to re-attach listeners in case they log back in
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', onStateChange);
    }

    return await connectToMetamask();
  }

  const switchNetwork = async (networkId) => {
    await switchNetworkMetamask(networkId);
  }

  const getCurrentConnectedWallet = async () => {
    return await getCurrentWalletConnectedMetamask();
  }

  return {
    connect,
    switchNetwork,
    getCurrentConnectedWallet,
  }
}
