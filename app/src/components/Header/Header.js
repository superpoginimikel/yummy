import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Web3Context } from '../Web3';
import './Header.css';

function Header() {
  const { selectedAccount, ready, connect, disconnect } = useContext(Web3Context);

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

  return (
    <>
      <Button onClick={handleConnectButton}>Connect</Button>
      <Button onClick={HandleDisconnectButtonClicked}>DisConnect</Button>
      { selectedAccount }
      { ready }
    </>
  )
}

export { Header };
