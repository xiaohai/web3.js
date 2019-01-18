#!/usr/bin/env node


var Web3 = require('../index.js');
var sleep = require('sleep')
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://192.168.1.126:8088'));

// var coinbase = web3.eth.coinbase;
// console.log(coinbase);
var cotractName = "SimpleStorage"
var cotractName2 = "test"
var contractText = "pragma solidity >= 0.4.0;contract " + cotractName + " {uint storedData; function set(uint x) public { storedData = x;} function get() public view returns (uint) { return storedData;}}"
var contractText2 = "pragma solidity >= 0.4.0;contract " + cotractName2 + " {uint storedData; function set(uint x) public { storedData = x;} function get() public view returns (uint) { return storedData;}}"
// var contractAddress = RunContract(cotractName, contractText)
// var contractAddress2 = RunContract(cotractName2, contractText2)
//
// // var contractAddress = "0x77f60d58c7468706c7f7272d0f91410d869cbcd8"
// // for(i=0; i<200; i++) {
//     var getcontract = web3.thk.GetContract(contractAddress)
//     var getcontract2 = web3.thk.GetContract(contractAddress2)
    var myCon = web3.thk.contract(getcontract["<stdin>:" + cotractName]["info"]["abiDefinition"]).at(contractAddress);
//     var myCon2 = web3.thk.contract(getcontract2["<stdin>:" + cotractName2]["info"]["abiDefinition"]).at(contractAddress2);
//     web3.thk.setCaller("0x0000000000000000000000000000000000000000")
//     web3.thk.setVal("0")
//     myCon.set(2)
//     sleep.sleep(3)
// console.log(myCon2.get())
//     var res = myCon.get()
//     console.log(res)
//     sleep.sleep(3)

// }

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
// var getTxsResp = web3.thk.GetTransactions('2', 50, 70);
// console.log("getTxsResp response:");
// console.log(getTxsResp);
//
// var callTransactionResp = web3.thk.CallTransaction('2', '0x0000000000000000000000000000000000000000', '0x0e50cea0402d2a396b0db1c5d08155bd219cc52e','22','0', '0xe98b7f4d0000000000000000000000000000000000000000000000000000000000000001');
// console.log("callTransactionResp response:");
// console.log(callTransactionResp);
//
// var getBlockHeaderResp = web3.thk.GetBlockHeader('2', '30');
// console.log(1)

// console.log("getBlockHeaderResp response:");
// console.log(getBlockHeaderResp);
//
// var getBlockTxsResp = web3.thk.GetBlockTxs('2', '30','1','10');
// console.log("getBlockTxsResp response:");
// console.log(getBlockTxsResp);
//
var compileContractResp = web3.thk.CompileContract('2', 'pragma solidity >= 0.4.22;contract test {function multiply(uint a) public returns(uint d) {return a * 7;}}');
console.log("compileContractResp response:");
// console.log(compileContractResp);
//
//
// var hash = web3.sha3("Some string to be hashed");
//
// console.log(hash);

// function RunContract(contractName, contractText) {
//     var balance = web3.thk.GetAccount('0x0000000000000000000000000000000000000000');
//     var contractresp = web3.thk.CompileContract("2", contractText)
//     var contractKey = '<stdin>:' + contractName
//     code = contractresp[contractKey]["code"]
//     // 发布合约
//     var contracthash = web3.thk.SendTx("2", '0x0000000000000000000000000000000000000000', "", balance['nonce'], '0', code)
//     sleep.sleep(5)
//     // 获取合约hash
//     var conresp = web3.thk.GetTransactionByHash("2", contracthash)
//     var contractAddress = conresp['contractAddress']
//     web3.thk.SaveContract(contractAddress, contractresp)
//     return contractAddress
// }



