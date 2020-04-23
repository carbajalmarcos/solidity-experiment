import React, { useState, useEffect } from 'react';
import getWeb3 from "../utils/getWeb3";
import Home from "./Home"
import {
  Switch,
  Route,
} from "react-router-dom";


const App = () => {

  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [w3, setW3] = useState();
  var  web3;

  useEffect(() => {
    initWeb3();
  })

  const initWeb3 = async () => {
    web3 = await getWeb3();
    let acc = (await web3.eth.getAccounts())[0].toLowerCase()
    console.log(web3.currentProvider)

    //when metamask account is changed the following is run to change account
    await window.ethereum.on('accountsChanged', async accounts => {
      // Time to reload your interface with accounts[0]!
      acc = accounts[0].toLowerCase();
      setAccount(acc);
      load();
    })
    setW3(web3);
    setAccount(acc);
    load();

  }
  const load = () => {
    getBalance();
  }
  const getBalance = async () => {
    if (web3 !== undefined) {
      let weiBalance = await web3.eth.getBalance((await web3.eth.getAccounts())[0].toLowerCase());
      let converted = web3.utils.fromWei(weiBalance.toString(), 'ether');
      setBalance(converted);
    }

  }

  return (
    <Switch>
      <Route path="/" >
        <Home from={account} balance={balance} web3={w3} />
      </Route>
    </Switch>

  );
}
export default App;