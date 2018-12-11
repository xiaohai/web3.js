/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file eth.js
 * @author Marek Kotewicz <marek@ethdev.com>
 * @author Fabian Vogelsteller <fabian@ethdev.com>
 * @date 2015
 */

"use strict";

var Method = require('../method');
var Property = require('../property');
var formatters = require('../formatters');

function Thk(web3) {
    this._requestManager = web3._requestManager;

    var self = this;

    methods().forEach(function (method) {
        method.attachToObject(self);
        method.setRequestManager(self._requestManager);
    });

    properties().forEach(function (p) {
        p.attachToObject(self);
        p.setRequestManager(self._requestManager);
    });
}


var GetAccountInputF = function (address) {
    address = formatters.inputAddressFormatter(address);
    return ({"address": address});
};

var SendTxInputF = function (chainid, form,to,nonce,value,input) {
    var fromAddr = formatters.inputAddressFormatter(form);
    var toAddr = formatters.inputAddressFormatter(to);
    return ({"chainid":chainid,"from":fromAddr, "to": toAddr, "nonce": nonce, "val": value, "input": input})
};
var GetTxByHashInputF = function (chainid, hash) {
    return ({"chainid": chainid, "hash": hash})
};

var GetStatsInputF = function (chainid) {
    return ({"chainid": chainid})
};

var GetTransactionsInputF = function (address, startheight, endheight) {
    return  ({"address": address, "startHeight": startheight, "endHeight": endheight})
};

var CallTransactionInputF = function (chainid, form,to,nonce,value,input) {
    var fromAddr = formatters.inputAddressFormatter(form);
    var toAddr = formatters.inputAddressFormatter(to);
    return ({"chainid":chainid,"from":fromAddr, "to": toAddr, "nonce": nonce, "val": value, "input": input})
};

var GetBlockHeaderInputF = function (chainid, height) {
    return ({"chainid": chainid, "height": height})
};

var GetBlockTxsInputF = function (chainid, height, page, size) {
    return ({"chainid": chainid, "height": height, "page": page, "size": size})

};

var CompileContractInputF = function (chainid, contract) {
    return ({"chainid": chainid, "contract": contract})

};

var outputGetBalanceFormatter = function (result) {
    console.log("aaa");
    result.balance = result.balance - 1;
    return result
};

var methods = function () {
    var GetAccount = new Method({
        name: 'GetAccount',
        call: 'GetAccount',
        params: 1,
        inputFormatter: GetAccountInputF,
        outputFormatter: outputGetBalanceFormatter
    });

    var SendTx = new Method({
       name: 'SendTx',
       call: 'SendTx',
       params:6,
       inputFormatter: SendTxInputF,
       outputFormatter: [null]
    });

    var GetTxByHash = new Method({
        name: 'GetTransactionByHash',
        call: 'GetTransactionByHash',
        params: 2,
        inputFormatter:GetTxByHashInputF,
        outputFormatter: [null]
    });

    var GetStats = new Method({
       name: 'GetStats',
       call: 'GetStats',
       params: 1,
       inputFormatter: GetStatsInputF,
       outputFormatter: [null]
    });

    var GetTransactions = new Method({
        name: 'GetTransactions',
        call: 'GetTransactions',
        params: 3,
        inputFormatter: GetTransactionsInputF,
        outputFormatter: [null]
    });

    var CallTransaction = new Method({
        name: 'CallTransaction',
        call: 'CallTransaction',
        params: 6,
        inputFormatter: CallTransactionInputF,
        outputFormatter: [null]
    });

    var GetBlockHeader = new Method({
        name: 'GetBlockHeader',
        call: 'GetBlockHeader',
        params: 2,
        inputFormatter: GetBlockHeaderInputF,
        outputFormatter: [null]
    });

    var GetBlockTxs = new Method({
        name: 'GetBlockTxs',
        call: 'GetBlockTxs',
        params: 4,
        inputFormatter: GetBlockTxsInputF,
        outputFormatter: [null]
    });

    var CompileContract = new Method({
        name: 'CompileContract',
        call: 'CompileContract',
        params: 2,
        inputFormatter: CompileContractInputF,
        outputFormatter: [null]
    });

    return [
        GetAccount,
        SendTx,
        GetTxByHash,
        GetStats,
        GetTransactions,
        CallTransaction,
        GetBlockHeader,
        GetBlockTxs,
        CompileContract
    ];
};

var properties = function () {
    return [
        new Property({
            name: 'listAccounts',
            getter: 'personal_listAccounts'
        })
    ];
};


module.exports = Thk;
