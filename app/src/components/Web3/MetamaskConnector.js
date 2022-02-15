import networkConfigs from './networkConfig';

const providerName = 'metamask';

export const connectToMetamask = async () => {
  return await getWalletRequest("eth_requestAccounts");
}

export const getCurrentWalletConnectedMetamask = async () => {
  return await getWalletRequest("eth_accounts");
};

const getWalletRequest = async (methodName) => {
  const networkId = await getNetworkId();
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: methodName,
      });

      const selectedAccount = addressArray.length > 0 ? addressArray[0] : "";
      if (addressArray.length > 0) {
        return { selectedAccount, networkId, providerName };
      } else {
        return { selectedAccount: "", networkId, providerName };
      }
    } catch (err) {
      return { selectedAccount: "", networkId, providerName };
    }
  } else {
    return { selectedAccount: "", networkId, providerName };
  }
}

export const switchNetworkMetamask = async (networkId) => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error("Non-Ethereum browser detected. You should consider trying MetaMask!");
  }

  try {
    const hexNetworkId = networkToHex(networkId);
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexNetworkId }],
    });
    return true;
  } catch (e) {
    if (e && e.code === "4902") {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [networkConfigs[networkId]],
        });
      } catch (e) {
        throw e;
      }
    } else {
      throw e;
    }
  }
}

export const getAccounts = async () => {
  return await window.ethereum.request({ method: 'eth_accounts' })
}

export const getNetworkId = async () => {
  return await window.ethereum.request({ method: 'eth_chainId' })
};

function networkToHex(networkId) {
  return `0x${networkId.toString(16)}`;
}