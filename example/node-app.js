#!/usr/bin/env node

var Web3 = require('../index.js');
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8088'));

// var coinbase = web3.eth.coinbase;
// console.log(coinbase);

var balance = web3.thk.GetAccount('0x0000000000000000000000000000000000000000');
// console.log("balance response:");
console.log(balance);
//
// var sendtxResp = web3.thk.SendTx(
//     '2', '0x0000000000000000000000000000000000000000', '0x0e50cea0402d2a396b0db1c5d08155bd219cc52e',
//     '1', '0', '0xc3bea9af000000000000000000000000ca35b7d915458ef540ade6068dfe2f44e8fa733c'
// );
// console.log("sendtxResp response:");
// console.log(sendtxResp);
//
// var getTxByHashResp = web3.thk.GetTxByHash('2', '0x29d7eef512137c55f67a7012e814e5add45ae8b81a9ceb8e754c38e8aa5dee4d');
// console.log("getTxByHashResp response:");
// console.log(getTxByHashResp);
//
// var getStatsResp = web3.thk.GetStats('2');
// console.log("getStatsResp:");
// console.log(getStatsResp);
//
// var getTxsResp = web3.thk.GetTransactions('2');
// console.log("getTxsResp response:");
// console.log(getTxsResp);
//
// var callTransactionResp = web3.thk.CallTransaction('2', '0x29d7eef512137c55f67a7012e814e5add45ae8b81a9ceb8e754c38e8aa5dee4d');
// console.log("callTransactionResp response:");
// console.log(callTransactionResp);
//
// var getBlockHeaderResp = web3.thk.GetBlockHeader('2', '0x29d7eef512137c55f67a7012e814e5add45ae8b81a9ceb8e754c38e8aa5dee4d');
// console.log("getBlockHeaderResp response:");
// console.log(getBlockHeaderResp);
//
// var getBlockTxsResp = web3.thk.GetBlockTxs('2', '0x29d7eef512137c55f67a7012e814e5add45ae8b81a9ceb8e754c38e8aa5dee4d');
// console.log("getBlockTxsResp response:");
// console.log(getBlockTxsResp);
//
// var compileContractResp = web3.thk.CompileContract('2', '0x29d7eef512137c55f67a7012e814e5add45ae8b81a9ceb8e754c38e8aa5dee4d');
// console.log("compileContractResp response:");
// console.log(compileContractResp);
//
//
// var hash = web3.sha3("Some string to be hashed");
//
// console.log(hash);





