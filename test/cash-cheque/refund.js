#!/usr/bin/env node
const chai = require('chai');
const assert = chai.assert;

const Web3 = require('../../index.js');
const web3 = new Web3();
const SystemContractAddressWithdraw = require('../../lib/utils/cash-cheque').SystemContractAddressWithdraw;
const SystemContractAddressCancel = require('../../lib/utils/cash-cheque').SystemContractAddressCancel;
const encodeCheque = require('../../lib/utils/cash-cheque').encode;
const decodeCheque = require('../../lib/utils/cash-cheque').decode;
const sleep = require('../common/my_util').sleep;
const constants = require('../common/constants');
const BigNumber = require('bignumber.js');

web3.setProvider(new web3.providers.HttpProvider(constants._test_rpc_host));
web3.thk.defaultPrivateKey = constants._test_wallet.privateKey;
web3.thk.defaultChainId = "1";
web3.thk.defaultAddress = constants._test_wallet.address;
_toChainId = '2';
_toAddress = constants._test_wallet.address;

/* 继续交易或退款流程
    1.  生成取消支票          web3.thk.MakeCCCExistenceProof

    判断条件   终止交易
    2.  退款参数签名          web3.thk.signTransaction；
    3.  退款交易              web3.thk.SendTx；
    4.  查询退款hash结果     web3.thk.GetTransactionByHash;

    继续交易             web3.thk.RpcMakeVccProof；
    5.  存款参数签名          web3.thk.signTransaction；
    6.  存款交易              web3.thk.SendTx；
    7.  查询存款hash结果      web3.thk.GetTransactionByHash;
*/

describe('refund', function () {
    this.timeout(100000);
    it('cancel', done => {
        let value = new BigNumber(`20`).multipliedBy('1e+18');

        const fromAccountAtFromChain = web3.thk.GetAccount(web3.thk.defaultChainId, web3.thk.defaultAddress);
        console.log("fromAccountAtFromChain :", fromAccountAtFromChain);
        const toChainInfo = web3.thk.GetStats(_toChainId);
        console.log('toChainInfo :', toChainInfo);
        let cashCheque = {
            FromChain: web3.thk.defaultChainId,
            FromAddress: web3.thk.defaultAddress,
            Nonce: fromAccountAtFromChain.nonce,
            ToChain: _toChainId,
            ToAddress: _toAddress.toLowerCase(),
            ExpireHeight: toChainInfo.currentheight,
            Amount: value.toString(16)
        };

        const _value_in_cheue_str = value.toString(10);
        const _nonce_in_cheue_str = cashCheque.Nonce.toString();
        const _expire_height_in_cheqeu_str = cashCheque.ExpireHeight.toString();

        let cashChequeAsInput = encodeCheque(cashCheque);

        let tx = {
            chainId: cashCheque.FromChain,
            fromChainId: cashCheque.FromChain,
            toChainId: cashCheque.FromChain,
            from: cashCheque.FromAddress,
            to: SystemContractAddressWithdraw,
            nonce: _nonce_in_cheue_str,
            value: '0',
            input: cashChequeAsInput
        };
        let signedTx = web3.thk.signTransaction(tx, web3.thk.defaultPrivateKey);
        console.log("signedTx:", signedTx);

        let txRes = web3.thk.SendTx(signedTx);
        console.log("sendTx response:", txRes);

        if (!txRes && !txRes.TXhash) {  //取款交易发送成功
            assert.fail("1st leg, sendTx fail");
        } else {
            sleep(7);
            let txInfo = web3.thk.GetTransactionByHash(web3.thk.defaultChainId, txRes.TXhash);
            console.log("1st leg, txInfo:", txInfo);
            if (!txInfo || txInfo.status !== 1) {
                assert.fail("1st leg, sendTx fail");
            } else { //取款查询hash成功，执行生成支票证明流程
                let proofParam = {
                    chainId: cashCheque.FromChain,
                    from: cashCheque.FromAddress,
                    to: cashCheque.ToAddress,
                    fromChainId: cashCheque.FromChain,
                    toChainId: cashCheque.ToChain,
                    value: _value_in_cheue_str,
                    expireheight: _expire_height_in_cheqeu_str,
                    nonce: _nonce_in_cheue_str
                };
                sleep(5);
                // refund
                const cheque = decodeCheque(cashChequeAsInput);
                let cancelProofParam = {
                    chainId: cheque.ToChain,
                    from: cheque.FromAddress,
                    to: cheque.ToAddress,
                    fromChainId: cheque.FromChain,
                    toChainId: cheque.ToChain,
                    value: cheque.Amount.toString(),
                    expireheight: cheque.ExpireHeight.toString(),
                    nonce: cheque.Nonce.toString()
                };
                let proof2Cancel = web3.thk.MakeCCCExistenceProof(cancelProofParam);
                console.log('get proof2Cancel: ', proof2Cancel);
                if (proof2Cancel && !proof2Cancel.errMsg) {    //退款生成支票成功,执行退款流程
                    let fromAccountAtFromChain = web3.thk.GetAccount(cheque.FromChain, cheque.FromAddress);
                    tx = {
                        chainId: cheque.FromChain,
                        fromChainId: cheque.FromChain,
                        toChainId: cheque.FromChain,
                        from: cheque.FromAddress,
                        to: SystemContractAddressCancel,
                        nonce: fromAccountAtFromChain.nonce.toString(),
                        value: '0',
                        input: proof2Cancel.input
                    };
                    signedTx = web3.thk.signTransaction(tx, web3.thk.defaultPrivateKey);
                    console.log("sendTx signedTx:", signedTx);
                    txRes = web3.thk.SendTx(signedTx);
                    console.log("sendTx response:", txRes);
                    if (!txRes || !txRes.TXhash) {
                        assert.fail("3rd leg, sendTx fail");
                    } else { // 退款查询hash流程
                        sleep(5);
                        txInfo = web3.thk.GetTransactionByHash(cheque.FromChain, txRes.TXhash);
                        console.log("3rd leg, txInfo:", txInfo);
                        if (txInfo && txInfo.status === 1) {
                            console.log('sendTx refund success!!!');
                        } else {
                            console.log('sendTx refund failed!!!');
                        }
                    }
                }
            }
        }
        done()
    });
});

