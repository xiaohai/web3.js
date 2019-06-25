#!/usr/bin/env node


var Web3 = require('../index.js');
// var sleep = require('sleep')
var web3 = new Web3();


web3.setProvider(new web3.providers.HttpProvider('http://test.thinkey.xyz'));
const privateKey = new Buffer('4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318', 'hex')

web3.thk.defaultPrivateKey = privateKey
web3.thk.defaultAddress = "0x2c7536e3605d9c16a7a3d7b1898e529396a65c23"
web3.thk.defaultChainId = "2"

var cotractName = "SimpleStorage"
var contractText = "pragma solidity >= 0.4.0;contract SimpleStorage {uint storedData; function set(uint256 x) public { storedData = x;} function get() public view returns (uint256) { return storedData;}}"
// var contractAddress = RunContract(cotractName, contractText)

function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
}

// var getcontract = web3.thk.GetContract(contractAddress)
// var myCon = web3.thk.contract(getcontract[cotractName]["info"]["abiDefinition"]).at(contractAddress);
//     // var myCon2 = web3.thk.contract(getcontract2["<stdin>:" + cotractName2]["info"]["abiDefinition"]).at(contractAddress2);
//     web3.thk.setVal("0")
//     myCon.set(2)
//     sleep(3000)
//     var res = myCon.get()
//     console.log(res)
//     sleep(3000)

// let obj = {
//     chainId: web3.thk.defaultChainId,
//     fromChainId: web3.thk.defaultChainId,
//     toChainId: web3.thk.defaultChainId,
//     from:'0x0000000000000000000000000000000000000000',
//     to: '0x0e50cea0402d2a396b0db1c5d08155bd219cc52e',
//     nonce: '1',
//     value: '0',
//     input: '0xc3bea9af000000000000000000000000ca35b7d915458ef540ade6068dfe2f44e8fa733c'
// }
// let sendTxParams = web3.thk.signTransaction(obj,web3.thk.defaultPrivateKey)
// var sendtxResp = web3.thk.SendTx(sendTxParams);
// console.log("sendtxResp response:");
// console.log(sendtxResp);
//
// var getTxByHashResp = web3.thk.GetTransactionByHash('2', '0xba2fe9309f7e1bcd1a04cd9f50a918f88d5f5da09422fa025373543463eccc09');
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
// var compileContractResp = web3.thk.CompileContract(web3.thk.defaultChainId, 'pragma solidity >= 0.4.22;contract test {function multiply(uint a) public returns(uint d) {return a * 7;}}');
// console.log("compileContractResp response:");
// console.log(compileContractResp);
//
//
// var hash = web3.sha3("Some string to be hashed");
//
// console.log(hash);

function RunContract(contractName, contractText) {
    var balance = web3.thk.GetAccount(web3.thk.defaultChainId, '0x2c7536e3605d9c16a7a3d7b1898e529396a65c23');
    var contractresp = web3.thk.CompileContract(web3.thk.defaultChainId, contractText)
    code = contractresp[contractName]["code"]
    // 发布合约
    tx = {
        chainId: web3.thk.defaultChainId,
        fromChainId: web3.thk.defaultChainId,
        toChainId: web3.thk.defaultChainId,
        from: web3.thk.defaultAddress,
        to: "",
        nonce: balance['nonce'].toString(),
        value: "0",
        input: code,
    }
    web3.thk.signTransaction(tx, web3.thk.defaultPrivateKey)
    var contracthash = web3.thk.SendTx(tx)
    sleep(5000)
    // 获取合约hash
    TxHash = contracthash["TXhash"]
    var conresp = web3.thk.GetTransactionByHash(web3.thk.defaultChainId, TxHash)
    var contractAddress = conresp['contractAddress']
    web3.thk.SaveContract(contractAddress, contractresp)
    return contractAddress
}



