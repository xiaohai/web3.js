#!/usr/bin/env node

var Web3 = require('../index.js');
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8088'));

// var coinbase = web3.eth.coinbase;
// console.log(coinbase);

var balance = web3.thk.GetAccount('0x0000000000000000000000000000000000000000')
console.log(balance);

var hash = web3.sha3("Some string to be hashed");
console.log(hash);





