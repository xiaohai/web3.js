/*
跨链转账流程-先取款生成支票，再使用支票跨链存款
    ① 生成支票
        1.  取款参数签名          web3.thk.signTransaction；
        2.  取款交易              web3.thk.SendTx；
        3.  查询取款hash结果      web3.thk.GetTransactionByHash;
        4.  生成支票证明input              web3.thk.RpcMakeVccProof；
    ② 兑现支票
        5.  存款参数签名          web3.thk.signTransaction；
        6.  存款交易              web3.thk.SendTx；
        7.  查询存款hash结果      web3.thk.GetTransactionByHash;
    ③ 撤销支票，若存款失败执行退款流程
        8.  撤销支票证明          web3.thk.MakeCCCExistenceProof；
        9.  退款参数签名          web3.thk.signTransaction；
        10.  退款交易              web3.thk.SendTx；
        11.  查询退款hash结果     web3.thk.GetTransactionByHash;
*/
// 跨链取款合约-取款到支票
const SystemContractAddressWithdraw = "0x0000000000000000000000000000000000020000";
// 跨链存款合约-从支票存款款到账户
const SystemContractAddressDeposit = "0x0000000000000000000000000000000000030000";
// 跨链撤销存款合约-从支票退回原账户
const SystemContractAddressCancel = "0x0000000000000000000000000000000000040000";

const BigNumber = require('bignumber.js');

const leftPad = function (string, chars, hasPrefix, sign) {
    //var hasPrefix = /^0x/i.test(string) || typeof string === 'number';
    string = string.toString(16).replace(/^0x/i, '');

    const padding = (chars - string.length + 1 >= 0) ? chars - string.length + 1 : 0;
    return (hasPrefix ? '0x' : '') + new Array(padding).join(sign ? sign : "0") + string;
};
const amountLeftPad = (string, chars, hasPrefix, sign) => {
    //var hasPrefix = /^0x/i.test(string) || typeof string === 'number';
    // string = string.toString(16).replace(/^0x/i,'');

    const padding = (chars - string.length + 1 >= 0) ? chars - string.length + 1 : 0;
    return (hasPrefix ? '0x' : '') + new Array(padding).join(sign ? sign : "0") + string;
};

// 序列化
// 4字节FromChain + 20字节FromAddress + 8字节Nonce + 4字节ToChain + 20字节ToAddress +
// 8字节ExpireHeight + 1字节len(Amount.Bytes()) + Amount.Bytes()
// 均为BigEndian
function encode(CashCheck) {
    let str = "0x";
    str += leftPad(Number(CashCheck.FromChain), 8);
    str += leftPad(CashCheck.FromAddress, 40);
    str += leftPad(CashCheck.Nonce, 16);
    str += leftPad(Number(CashCheck.ToChain), 8);
    str += leftPad(CashCheck.ToAddress, 40);
    str += leftPad(CashCheck.ExpireHeight, 16);
    str += leftPad(32, 2);
    str += amountLeftPad(CashCheck.Amount, 64);
    return str
}

function decode(str) {
    if (!str || str.length < 196) {
        return;
    }
    let cheque = {};
    cheque.FromChain = parseInt(str.slice(2, 10), 16).toString();
    cheque.FromAddress = '0x' + str.slice(10, 50);
    cheque.Nonce = parseInt(str.slice(50, 66), 16).toString();
    cheque.ToChain = parseInt(str.slice(66, 74), 16).toString();
    cheque.ToAddress = '0x' + str.slice(74, 114);
    cheque.ExpireHeight = parseInt(str.slice(114, 130), 16).toString();
    cheque.Amount = new BigNumber('0x' + str.slice(132, 196), 10).toString();
    return cheque;
}

module.exports = {
    SystemContractAddressWithdraw,
    SystemContractAddressDeposit,
    SystemContractAddressCancel,
    encode,
    decode
};
