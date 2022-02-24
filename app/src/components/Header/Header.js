import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Web3Context } from '../Web3';
import {toBN, fromWei, toWei} from 'web3-utils';
import './Header.css';

const contractABI = require('../../contract/YummyMembershipCardAbi.json')
const contractAddress = "0xB29e8C79940Eb9a6546b0f0beA9E6301148B6413";

function Header() {
  const { web3, selectedAccount, ready, connect, disconnect } = useContext(Web3Context);

  useEffect(async () => {
    let res = await fetch("/health");
    let status = await res.json();
    console.log(status);
    return status;
  }, []);

  const handleConnectButton = async() => {
    await connect();
  }

  const HandleDisconnectButtonClicked = async() => {
    await disconnect();
  }

  const HandleCheckApproveButtonCliked = async  () => {
    const yummyMembershipContract = await new web3.eth.Contract(contractABI, contractAddress);
    console.log(yummyMembershipContract);

    try {
      const test = await yummyMembershipContract.methods.isApprovedForAll(selectedAccount, contractAddress).call();
      console.log(test);
    } catch (e) {
      console.log(e);
    }
  }

  const HandleApproveButtonCliked = async() => {
    const yummyMembershipContract = await new web3.eth.Contract(contractABI, contractAddress);
    console.log(yummyMembershipContract);

    try {
      const test = await yummyMembershipContract.methods.setApprovalForAll(contractAddress, true)
        .send({from: selectedAccount})
        .on('transactionHash', function(hash){
          console.log('transactionHash');
          console.log(hash);
        })
        .on('receipt', function(receipt){
          console.log('receipt');
          console.log(receipt);
        })
        .on('error', function(error, receipt) {
          console.log('error here now');
          console.log(error);
          console.log(receipt);
        });
      console.log(test);
    } catch (e) {
      console.log(e);
    }
  }

  const HandleMintButtonClicked = async() => {
    const yummyMembershipContract = await new web3.eth.Contract(contractABI, contractAddress);
    console.log(yummyMembershipContract);
    const payment = toWei(toBN(5), 'finney');

    try {
      const test = await yummyMembershipContract.methods.mint(1)
        .send({from: selectedAccount, value: payment})
        .on('transactionHash', function(hash){
          console.log('transactionHash');
          console.log(hash);
        })
        .on('receipt', function(receipt){
          console.log('receipt');
          console.log(receipt);
        })
        .on('error', function(error, receipt) {
          console.log('error here now');
          console.log(error);
          console.log(receipt);
        });
      console.log(test);
    } catch (e) {
      console.log(e);
    }

    // const transactionParameters = {
    //   to: contractAddress, // Required except during contract publications.
    //   from: window.ethereum.selectedAddress, // must match user's active address.
    //   data: window.contract.methods
    //     .mintNFT(window.ethereum.selectedAddress, tokenURI)
    //     // .encodeABI(),
    // };
    //
    // try {
    //   const txHash = await window.ethereum.request({
    //     method: "eth_sendTransaction",
    //     params: [transactionParameters],
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <>
      <Button onClick={handleConnectButton}>Connect</Button>
      <Button onClick={HandleDisconnectButtonClicked}>DisConnect</Button>
      { selectedAccount }
      { ready }
      <Button onClick={HandleCheckApproveButtonCliked}>Check Approve</Button>
      <Button onClick={HandleApproveButtonCliked}>Approve</Button>
      <Button onClick={HandleMintButtonClicked}>Mint</Button>
    </>
  )
}

export { Header };
