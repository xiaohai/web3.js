#!/usr/bin/env node
const chai = require('chai');
const assert = chai.assert;
const BigNumber = require('bignumber.js');

const Web3 = require('../../index.js');
const web3 = new Web3();
const sleep = require('../common/my_util').sleep;
const constants = require('../common/constants');

web3.setProvider(new web3.providers.HttpProvider(constants._test_rpc_host));
web3.thk.defaultPrivateKey = constants._test_wallet.privateKey;
web3.thk.defaultChainId = "2";
web3.thk.defaultAddress = constants._test_wallet.address;
_toAddress = '0xfbb8d4ac8df1d813522033153dbd0992220a1fb8';


describe('tx', function () {
    this.timeout(100000);
    it('send-tx', done => {
        const fromAccountAtFromChain = web3.thk.GetAccount(web3.thk.defaultChainId, web3.thk.defaultAddress);
        console.log("fromAccountAtFromChain :", fromAccountAtFromChain);

        let value = new BigNumber(`4500`).multipliedBy('1e+18');

        let tx = {
            chainId: web3.thk.defaultChainId,
            fromChainId: web3.thk.defaultChainId,
            toChainId: web3.thk.defaultChainId,
            from: web3.thk.defaultAddress,
            to: _toAddress,
            nonce: fromAccountAtFromChain.nonce.toString(),
            value: value.toString(10),
            input: ""
        };

        let signedTx = web3.thk.signTransaction(tx, web3.thk.defaultPrivateKey);
        console.log("signedTx:", signedTx);

        let txRes = web3.thk.SendTx(signedTx);
        console.log("sendTx response:", txRes);

        if (!txRes && !txRes.TXhash) {
            assert.fail("sendTx fail");
        } else {
            sleep(7);
            let txInfo = web3.thk.GetTransactionByHash(web3.thk.defaultChainId, txRes.TXhash);
            console.log("txInfo:", txInfo);
            done();
        }
    });
});
