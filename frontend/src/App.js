import React, { useState, useEffect } from 'react';
import './App.css';
import getWeb3 from "./getWeb3";

const converter = (web3) => {
  return (value) => {
    return web3.utils.fromWei(value.toString(), 'ether');
  }
}

const App = () => {

  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  var toEther;

  useEffect(() => {
    load()
  })

  const load = async () => {

    const web3 = await getWeb3();
    toEther = converter(web3);
    let acc = (await web3.eth.getAccounts())[0].toLowerCase()
    console.log(web3.currentProvider)
    
    //when metamask account is changed the following is run to change account
    window.ethereum.on('accountsChanged', (accounts) => {
      // Time to reload your interface with accounts[0]!
      acc = accounts[0].toLowerCase();
      getBalance(web3, acc);
    })

    setAccount(acc);
    getBalance(web3, acc);

  }

  const getBalance = async (web3, acc) => {
    let weiBalance = await web3.eth.getBalance(acc);
    setBalance(toEther(weiBalance));
    console.log(toEther(weiBalance));
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <strong>Solidity frontend experiment</strong>, by the amargos club.
        </p>
        <p>
          <strong>account :</strong>{account}
        </p>
        <p>
          <strong>balance :</strong>{balance} eth
        </p>
      </header>
    </div>
  );
}
export default App;