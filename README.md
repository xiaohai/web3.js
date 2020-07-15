# Installation

### npm

```bash
npm install thinkium-web3js
```

### Yarn

```bash
yarn add thinkium-web3js
```

### As a Browser module

* Include `web3.min.js` in your html file. (not required for the meteor package)

# Usage

Use the `web3` object directly from the global namespace:

```js
var Web3 = require('thinkium-web3js');
var web3 = new Web3();
console.log(web3); // {thk: .., shh: ...} // It's here!
```

Set a provider (`HttpProvider` using [HTTP Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)):

```js
let rpcUrl = 'https://rpcproxy.thinkium.vip';     //rpc proxy
web3.setProvider(new web3.providers.HttpProvider(rpcUrl));
```

There you go, now you can use it:

```js
var account = web3.thk.GetAccount(chainId,address);
var balance = account.balance;
```

You can find more examples in the [`example`](https://github.com/Thinkium-Blockchain/web3.js/tree/master/example) directory.

# TUKE Web3.js SDK接口文档

# 1. 获取账户余额(web3.thk.getAccount)

请求参数
           

| 参数名  |  类型  | 是否必须 |   含义   |
| :-----: | :----: | :------: | :------: |
| chainId | string |   true   |   链id   |
| address | string |   true   | 账户地址 |

响应参数:

|   参数名    |  类型  | 是否必须 |                 含义                 |
| :---------: | :----: | :------: | :----------------------------------: |
|   address   | string |   true   |               账户地址               |
|    nonce    |  int   |   true   |  交易的发起者在之前进行过的交易数量  |
|   balance   | bigint |   true   |               账户余额               |
| storageRoot | string |  false   | 合约存储数据的hash(没有合约返回null) |
|  codeHash   | string |  false   |   合约代码的hash(没有合约返回null)   |

请求示例:

```javascript
var response = web3.thk.GetAccount("2","0x2c7536e3605d9c16a7a3d7b1898e529396a65c23");
```

```json
response:
{
  	"address": "0x2c7536e3605d9c16a7a3d7b1898e529396a65c23",
	"balance": 9.99999985e+26,
	"codeHash": null,
	"nonce": 43,
	"storageRoot": null
}
```

# 2. 执行一笔交易(web3.thk.SendTx)

请求参数：
           

|   参数名    |  类型  | 是否必须 |                含义                |
| :---------: | :----: | :------: | :--------------------------------: |
|   chainId   | string |   true   |                链id                |
|    from     | string |   true   |          交易发起账户地址          |
|     to      | string |   true   |          交易接受账户地址          |
|    nonce    | string |   true   | 交易的发起者在之前进行过的交易数量 |
|    value    | string |   true   |              转账金额              |
|    input    | string |   true   |          调用合约时的参数          |
| fromChainId | string |   true   |           交易发起链 id            |
|  toChainId  | string |   true   |           交易接受链 id            |
|     sig     | string |   true   |              交易签名              |
|     pub     | string |   true   |                公钥                |

响应参数:
           

| 参数名 |  类型  | 是否必须 |   含义   |
| :----: | :----: | :------: | :------: |
| TXhash | string |   true   | 交易hash |

请求示例:

```javascript
var response = web3.thk.SendTx({
  chainId: '2',
  fromChainId: '2',
  toChainId: '2',
  from: '0x0000000000000000000000000000000000000000',
  to: '0x0e50cea0402d2a396b0db1c5d08155bd219cc52e',
  nonce: '1',
  value: '0',
  input:'0xc3bea9af000000000000000000000000ca35b7d915458ef540ade6068dfe2f44e8fa733c',
  sig:'0x7d5c7b6b28dd66bada7cfb153fe03433deb331cc74ca82de3ddf49708f1174895404682fcb9bcb30fdb7f6d041b78c56d87e18df1ca6e7e2bd75e38a6a1c8d631c',
  pub:'0x044e3b81af9c2234cad09d679ce6035ed1392347ce64ce405f5dcd36228a25de6e47fd35c4215d1edf53e6f83de344615ce719bdb0fd878f6ed76f06dd277956de' 
});
```

```json
response:
{
    "TXhash": "0x22024c2e429196ac76d0e557ac0cf6141f5b500c56fde845582b837c9dab236b"
}
```

# 3. 通过交易hash获取交易详情(web3.thk.GetTransactionByHash)

请求参数：
           

| 参数名  |  类型  | 是否必须 |   含义   |
| :-----: | :----: | :------: | :------: |
| chainId | string |   true   |   链id   |
|  hash   | string |   true   | 交易hash |

响应参数:
           

|     参数名      |    类型     | 是否必须 |                    含义                     |
| :-------------: | :---------: | :------: | :-----------------------------------------: |
|   Transaction   |    dict     |   true   |                  交易详情                   |
|      root       |   string    |   true   | 保存了创建该receipt对象时，“账户”的当时状态 |
|     status      |     int     |   true   |          交易状态: 1:成功, 0:失败           |
|      logs       | array[dict] |  false   |         这个交易产生的日志对象数组          |
| transactionHash |   string    |   true   |                  交易hash                   |
| contractAddress |   string    |   true   |                合约账户地址                 |
|       out       |   string    |   true   |              调用返回结果数据               |
|     gasUsed     |     int     |   true   |              实际使用的gas个数              |
|     gasFee      |   String    |   true   |            实际使用总共的gas费用            |

Tx:
           

| 参数名  |  类型  | 是否必须 |                含义                |
| :-----: | :----: | :------: | :--------------------------------: |
| chainID |  int   |   true   |                链id                |
|  from   | string |   true   |          交易发起账户地址          |
|   to    | string |   true   |          交易接受账户地址          |
|  nonce  | string |   true   | 交易的发起者在之前进行过的交易数量 |
|   val   | string |   true   |              转账金额              |
|  input  | string |   true   |          调用合约时的参数          |

请求示例:

```javascript
var response = web3.thk.GetTransactionByHash('1', '0xca222630130bad1555ad633d67d2beefbf405d36fdc3e1abd4260f201284292c');
```

```json
response:
{
   "tx": {
        "chainid": 1,
        "from": "0x853d5281d92cc5c8d0d1bce1f2f7b125ca4e09e7",
        "to": "0x2f9bbce6f7d314fbe2b59901d0653a443bc11edd",
        "nonce": 24,
        "value": 40000000000000000000,
        "input": "0x88ffe867",
        "hash": "",
        "uselocal": false,
        "extra": "0x",
        "timestamp": 0
    },
    "root": "eyJmZWUiOiI3MDM1NTIwMDAwMDAwMDAwMCIsInJvb3QiOm51bGx9",
    "status": 1,
    "logs": [
        {
            "address": "0x2f9bbce6f7d314fbe2b59901d0653a443bc11edd",
            "blockNumber": "0x5aacf3",
            "data": "0x000000000000000000000000853d5281d92cc5c8d0d1bce1f2f7b125ca4e09e70000000000000000000000000000000000000000000000022b1c8c1227a00000000000000000000000000000000000000000000000000000000000005e65d45a",
            "logIndex": "0x0",
            "topics": [
                "0xaba4f973c8f45a52365c8348704e79653e4b58ebd452f2d2115423a62ef7a3e1"
            ],
            "transactionHash": "0xca222630130bad1555ad633d67d2beefbf405d36fdc3e1abd4260f201284292c",
            "transactionIndex": "0x0"
        }
    ],
    "transactionHash": "0xca222630130bad1555ad633d67d2beefbf405d36fdc3e1abd4260f201284292c",
    "contractAddress": "0x0000000000000000000000000000000000000000",
    "out": "0x",
    "gasUsed": 175888,
    "gasFee": "70355200000000000",
    "blockHeight": 5942515
}
```

# 4. 获取链信息(web3.thk.GetStats)

请求参数
           

| 参数名  |  类型  | 是否必须 | 含义 |
| :-----: | :----: | :------: | :--: |
| chainId | string |   true   | 链id |

响应参数:
           

|      参数名       |  类型  | 是否必须 |          含义          |
| :---------------: | :----: | :------: | :--------------------: |
|   currentheight   | bigint |   true   |        交易详情        |
|      txcount      |  int   |   true   |        总交易数        |
|        tps        |  int   |   true   |       每秒交易数       |
|   tpsLastEpoch    |  int   |   true   |     上一时期交易数     |
|       lives       |  int   |   true   |     链的已存活时间     |
|   accountcount    |  int   |   true   |         账户数         |
|    epochlength    |  int   |   true   |   当前时期包含多少块   |
|   epochduration   |  int   |   true   |    当前时期运行时间    |
| lastepochduration |  int   |   true   |   上一时期的运行时间   |
|    currentcomm    | array  |   true   | 当前这条链的委员会成员 |
|     gaslimit      |  Int   |   True   |      gas默认个数       |
|     gasprice      | String |   true   |          价格          |

请求示例:

```javascript
var response = web3.thk.GetStats('103')
```

```json
response
{
    "accountcount": 0,
    "currentcomm": [
        "0xbfebdb4661c93456c29dcc22ea32340b6a0e400bef924923a53dfe22ad90cbd5069135ef591d65515aa40ef34970599cc7c331667db7f744e89fe8ec305ede9a",
        "0x0df134ddc7bebb8abe61d8649a3054c107908719a4c5fa49be9ffb32037f84a0768d91bcd33e28c8c410760146eead90a72db6880c2d6eb5cac2f10d2be3563f",
        "0x37e7ab457bf4d38a96c06f0fc616e001a0eac9f7b7e8407f97bfd39b30569f069541a27cae9e681aff9d50616970b6b554d0893b25561453f58dc6e174e8e70a",
        "0x8c9cba550f746efcd98635fa6b300cd25ac08b54dda8f067dcba07bb4026c51478a1ac2dd5db3c89179ceab5f10d2f59d6d83f1f9ff652000a0c390b3fbc382e",
        "0xfa1688066b16f61c72b02af5834a9bb79b746a962c8ed82d6f4afce1c5f7ac1987f291b6063e438d3b6c12856a677901878302b1a5865c837252f1db18cdbd2f",
        "0x58c484fbb8d825e92b8e8d62c469e327fc8a55f2d521bb041d352ffb1a4e68cf1675c834e87daeea941f268601086c37df270a1048472a424b30af53053a34f7",
        "0xcdda504db1913c22e961c3f1dfb07941f22b7a0f3b4d3e2a48bc69ad67c0061c21d793e75c35b8f8dcc3a733b8c051fed1ca8d157cea26a65c0bb3c00f8a59f5",
        "0x70d6885ebb21b83377fcd6387f820b087753e5cbfc0bdb6dcd1b3f116680bbebf615441c55db54e36e587131fc9b645fca412b7c6b428d17bb8c24a1f3ae42c7",
        "0xcd2eb869ab358cb7f56f0abcf50623eb46bdf63ef52986fdd377948a87b6e2bf667649b658f6e1705b81e9d4a3380dfdcaa122ab69686ad0d30959aadfa999e5",
        "0x89b0bbcc4df1e4f1be61a527144491be88d86e09db48238ccb07cbd9af19728ff8143318d679184ee058cd57458206ae955d16e16ed5267bdb0819bf6c22c986",
        "0x9b2c2ffb7e950275b1451a1833e885f555b3c05b02a0cb869427bf252c2eb44d2ac46de7c770f2c621b2118681d3fcfcdf8b38bccdb38622748fdba1b97e2780",
        "0x7fa9213bf8027e846d2eb6e5b17f6caea7f80a1c0522f85927744e388afa756b21edcaab7d439b6661024225af1f9a5c3f8eab12a8a60402dc08147f697fe988",
        "0x2010f9c48b2af6679a0821efb657a96fbd8d2621ad20e97ed93eaabaea408baf086ad0009ab235c490e66a11e3ea1924aeaba2955ea7d3f2f9cbd933d41df362",
        "0xc1f4b9c3b129d88ff072aca7c958c57dbbcd3e1e47718990efa799989a5c16893b70bdc1d3af728169bc9cae5f0c1c22ae37c9aa3026789e1e68fb2f68920909",
        "0xd9b5f2c6fafe7391e182a98194b972961a8b4e24afa0152f4da0df9f84bbadb496451dc0b7ff4332e311914a93f7c5f60f07953edcbeef8ccc1637157ee0d5c5",
        "0x73bf86fbc73b5e6f12613a4eeeb8883a6af2d646bab8dd47e117f89d5a5c2369fc908b9003a1db5e4187a11245d61b23b73c2572326048d33860b5b0be9c03c1",
        "0x59c9add6f7ae1d1cc5e79579f309b720b37da127f171ba0e65a3e083bb27698ff22ca505f3298acf70106344b1d07104db15e317f14822e341ecdc21a1e87929",
        "0xb7023c7412e51ff1afa679756b354cf74578c93fbbad8eee2c0a2e60347eb4b857e6e45ab41444010e408e9548d749577c1e6f0301d0d14ee0d3844647761cd7",
        "0x482c7b2e66aabbee8fad39d64faab09f2d0059e1193a5470ec21875cdbd17ce4986f180ab498620d768ef3cba031ee0b534eba21a4c581e3e0842548c5527748",
        "0xe14da122de07cf0d1553fd91b729e6db6a68a103cf6eff190757f6b3bc34bcc88d2f7877d03ccb3e2be980dbe3b65dca6c10d9ae2823ecb4f8d88770b019f22f",
        "0x7af07f8cfa74b9367a10b86eac1883fdbc9eab7814675d8bd7138ec6aa805dda80aa115c9ffe416429f87efb008d30f9c1eaf9c2a8cce274a3f05a7ed0b082ad",
        "0x338035e5aa2c7ce1320c272c0c782c150a589f686767b483f044c746acd65d85af26b4a475ded3adc46cc1b2283f7b1f79ef877d3fef8f275a36e9c2a7bd23b9",
        "0x842409950306aebbcc580bbfd044067e6bc2530cb3f426c1eea1c3b1fd48487e6e01d5392e5b5e2bde9145931c4451b22d779d805237d7b23ce934ecc3447065",
        "0xf9828acc66c3e41ccc00a3683bf5417712a4914f12c1c709eec572483b189feebfcd5e718075e8bd56803243e8a637308c1e535fbe82ef8e6377a45aeeae56c8",
        "0xccc192ed5565d43671c6c1acaf53fd95b9010abf2ba4263854756d6bcfa4d7d2e1fbd43bc1f63cab2f1c74e3956b6ce0d38ebcd555c8e3085a05037be7670731",
        "0x567beb3b4827fbd138ee88592791efadb2a1ced4a57bf6f775b5950566169f19d16904f3c4a1f1f758843a5fba9e5052b97afa8f07de443869dee58700f72dc4",
        "0x67023c6cffb20c1a213f2e038427936adc674c09d54ef1afb1dcfdc8b40a48a80f1ccb51718d3b5bd5d1303e2f365a364d31ce8b6de9f14f18fcde4d43ddfcad",
        "0x250f3081d864de9796f4f9c505accc293f9ff7822c9d1ac4a5840981f486159121560eff795ae974c83971fb1f27e2984924934e9da43c9eda8423474398cd4f"
    ],
    "currentheight": 1590270,
    "epochduration": 2911,
    "epochlength": 1000,
    "gaslimit": 2500000,
    "gasprice": "400000000000",
    "lastepochduration": 2757,
    "lives": 818243,
    "tps": 0,
    "tpsLastEpoch": 0,
    "txcount": 2
}
```

# 5. 获取指定账户在对应链上一定高度范围内的交易信息(web3.thk.GetTransactions)

请求参数
           

|   参数名    |  类型  | 是否必须 |      含义      |
| :---------: | :----: | :------: | :------------: |
|   chainId   | string |   true   |      链id      |
|   address   | string |   true   |     链地址     |
| startHeight | string |   true   | 查询的起始块高 |
|  endHeight  | string |   true   | 查询的截止块高 |

响应参数:
           

|  参数名   |  类型  | 是否必须 |                含义                |
| :-------: | :----: | :------: | :--------------------------------: |
|  chainId  |  int   |   true   |                链id                |
|   from    | string |   true   |          交易发起账户地址          |
|    to     | string |   true   |          交易接受账户地址          |
|   nonce   |  int   |   true   | 交易的发起者在之前进行过的交易数量 |
|   value   |  int   |   true   |              转账金额              |
| timestamp |  int   |   true   |            交易的时间戳            |
|   input   | string |   true   |          调用合约时的参数          |
|   hash    | string |   true   |              交易hash              |

请求示例:

```javascript
var response = web3.thk.GetTransactions('2',"4fa1c4e6182b6b7f3bca273390cf587b50b47311", 50, 70);

```

```json
response:
[
    {
        "chainid": 2,
        "from": "0x2c7536e3605d9c16a7a3d7b1898e529396a65c23",
        "to": “0x0000000000000000000000000000000000020000”,
        "nonce": 0,
        "value": 0,
        "input":
        "0x000000022c7536e3605d9c16a7a3d7b1898e529396a65c230000000000000000000000034fa1c4e6182b6b7f3bca273390cf587b50b4731100000000000456440101",
        "hash":
        "0x0ea5dad47833fc6286357b6bd6c1a4e910def5f4432a1a59bde0f816c3dd18e0",
        "timestamp": 1560425588
    },
    {
        "chainid": 2,
        "from": "0x2c7536e3605d9c16a7a3d7b1898e529396a65c23",
        "to": "0x133c5bfef5d486052b061b44af113f20057341a8",
        "nonce": 1,
        "value": 0,
        "input":
        "0xa9059cbb00000000000000000000000066261e3faf00ef1537b22f37d8db85f57066f58f0000000000000000000000000000000000000000000000000000000000004e20",
        "hash":
        "0x1dbbda2d229db82ff12b3bea82d49225e6bebd645def4c06da157ddbe5660066",
        "timestamp": 1560425596
    }
]

```

# 6. 调用交易（web3.thk.CallTransaction）

请求参数
           

|   参数名    |  类型  | 是否必须 |                含义                |
| :---------: | :----: | :------: | :--------------------------------: |
|   chainId   | string |   true   |                链id                |
| fromChainId | string |   true   |       交易发起账户地址的链id       |
|  toChainId  | string |   true   |       交易接受账户地址的链id       |
|    from     | string |   true   |          交易发起账户地址          |
|     to      | string |   true   |          交易接受账户地址          |
|    nonce    | string |   true   | 交易的发起者在之前进行过的交易数量 |
|    value    | string |   true   |              转账金额              |
|    input    | string |   true   |          调用合约时的参数          |

响应参数:
           

|     参数名      |    类型     | 是否必须 |                    含义                     |
| :-------------: | :---------: | :------: | :-----------------------------------------: |
|   Transaction   |    dict     |   true   |                  交易详情                   |
|      root       |   string    |   true   | 保存了创建该receipt对象时，“账户”的当时状态 |
|     status      |     int     |   true   |          交易状态: 1:成功, 0:失败           |
|      logs       | array[dict] |   true   |         这个交易产生的日志对象数组          |
| transactionHash |   string    |   true   |                  交易hash                   |
| contractAddress |   string    |   true   |                合约账户地址                 |
|       out       |   string    |   true   |              调用返回结果数据               |

Transaction:

| 参数名  |  类型  | 是否必须 |                含义                |
| :-----: | :----: | :------: | :--------------------------------: |
| chainId | string |   true   |                链id                |
|  from   | string |   true   |          交易发起账户地址          |
|   to    | string |   true   |          交易接受账户地址          |
|  nonce  | string |   true   | 交易的发起者在之前进行过的交易数量 |
|   val   | string |   true   |              转账金额              |
|  input  | string |   true   |          调用合约时的参数          |

请求示例:

```javascript
var response = web3.thk.CallTransaction({
    chainId:'2',
    fromChainId:'2',
    toChainId:'2', 
    from:'0x0000000000000000000000000000000000000000',
    to:'0x0e50cea0402d2a396b0db1c5d08155bd219cc52e',
    nonce:'22',
    value:'0',
    input:'0xe98b7f4d0000000000000000000000000000000000000000000000000000000000000001'
});

```

```json
response:
{
    "Transaction": {
        "chainID": 2,
        "from": "0x0000000000000000000000000000000000000000",
        "to": "0x0e50cea0402d2a396b0db1c5d08155bd219cc52e",
        "nonce": 2,
        "value": 0,
        "input": "0xe98b7f4d0000000000000000000000000000000000000000000000000000000000000001",
        "hash": '',
		"timestamp": 0
    },
    "root": null,
    "status": 0,
    "logs": null,
    "transactionHash": "0x9936cab441360985fc9e27904f0767c1c39fe8e0edb83709a0cdad52470a4592",
    "contractAddress": "0x0000000000000000000000000000000000000000",
    "out": "0x"
}

```

# 7. 获取指定块高信息(web3.thk.GetBlockHeader)

请求参数
           

| 参数名  |  类型  | 是否必须 |     含义     |
| :-----: | :----: | :------: | :----------: |
| chainId | string |   true   |     链id     |
| height  | string |   true   | 查询块的块高 |

响应参数:
           

|    参数名    |  类型  | 是否必须 |          含义          |
| :----------: | :----: | :------: | :--------------------: |
|     hash     | string |   true   |       此块的hash       |
| previoushash | string |   true   |       父块的hash       |
|   chainid    |  int   |   true   |          链id          |
|    height    |  int   |   true   |      查询块的块高      |
|  mergeroot   | string |   true   | 合并其他链转账数据hash |
|  deltaroot   | string |   true   |    跨链转账数据hash    |
|  stateroot   | string |   true   |        状态hash        |
|   txcount    |  int   |   true   |        交易总数        |
|  timestamp   |  int   |   true   |         时间戳         |

请求示例:

```javascript
var response = web3.thk.GetBlockHeader('2', '30');

```

```json
response:
{
    "hash": "0x71603186004fd46d32cda0780c4f4cf77ce13b396b1b8132b2c632173441b9d2",
    "previoushash": "0xd0f6e9c89eb6be655632911e3743b5a994423c3526653dc55b62ebea3ff56c43",
    "chainid": 2,
    "height": 30,
    "mergeroot": "0xdddfde85423a0d7da064c1b5a8cc1ff18d4a209027ef95ecceae0e6ed8f7c1af",
    "deltaroot": "0xdddfde85423a0d7da064c1b5a8cc1ff18d4a209027ef95ecceae0e6ed8f7c1af",
    "stateroot": "0x0b672749b02da6bf8f3aa50238140ce7fae5af3e926d4eb06d4cfb707a90702e",
    "txcount": 1,
    "timestamp": 1547777358
}

```

# 8. 获取指定块的交易(web3.thk.GetBlockTxs)

请求参数
       

| 参数名  |  类型  | 是否必须 |     含义     |
| :-----: | :----: | :------: | :----------: |
| chainId | string |   true   |     链id     |
| height  | string |   true   | 查询块的块高 |
|  page   | string |   true   |     页码     |
|  size   | string |   true   |   页的大小   |

响应参数:
           

|     参数名     | 类型  | 是否必须 |   含义   |
| :------------: | :---: | :------: | :------: |
|   elections    | dict  |   true   | 交易详情 |
| accountchanges | array |   true   | 交易信息 |

accountchanges:

|  参数名   |  类型  | 是否必须 |                含义                |
| :-------: | :----: | :------: | :--------------------------------: |
|  chainId  | string |   true   |                链id                |
|  height   |  int   |   true   |           查询的起始块高           |
|   from    | string |   true   |          交易发起账户地址          |
|    to     | string |   true   |          交易接受账户地址          |
|   nonce   |  int   |   true   | 交易的发起者在之前进行过的交易数量 |
|   value   |  int   |   true   |              转账金额              |
| timestamp |  int   |   true   |            交易的时间戳            |

请求示例:

```javascript
var response = web3.thk.GetBlockTxs('2', '30','1','10');

```

```json
response:
{
    "elections": null,
    "accountchanges": [
        {
            "chainId": 2,
            "height": 30,
            "from": "0x4fa1c4e6182b6b7f3bca273390cf587b50b47311",
            "to": "0x4fa1c4e6182b6b7f3bca273390cf587b50b47311",
            "nonce": 30,
            "value": 1,
            "input": "0x",
			"hash":
"0x4bff6fad0cd46599289e4e465987cfc94278363b12eca3f37572be8c2ce1b061",
            "timestamp": 1547777358
        }
    ]
}

```

# 9. 编译合约(solc.compile)

**thinkium-web3js项目example目录contractTest.js 文件有示例**

请求参数

```javascript
var input = {
    language: 'Solidity',
    sources: {
        'test.sol': {      //合约文件名称
          content: contractContent     //合约文件内容
        }
    },
    settings: {
        outputSelection: {
            '*': {
              '*': ['*']
            }
        }
    }
};
```

请求示例:

```javascript

var solc = require('solc');
function getCompileContract(contractContent){    //合约可能有多个
    var input = {
        language: 'Solidity',
        sources: {
          'test.sol': {
            content: contractContent
          }
        },
        settings: {
          outputSelection: {
            '*': {
              '*': ['*']
            }
          }
        }
      };
      
    var output = JSON.parse(solc.compile(JSON.stringify(input)));
    // for (var contractName in output.contracts['test.sol']) {
    //     console.log(
    //         contractName + ': '
    //         + output.contracts['test.sol'][contractName]
    //     );
    // }
    return output.contracts['test.sol']       
    //output.contracts里面可能有多个合约文件，key文件名称
}
let contents = 'pragma solidity >= 0.5.0;contract MyFirst{uint256 a = 21233;string str = "Hello";function getA() public view returns(uint256 data){return a;}function getString() public view returns(string memory data){return str;}function setString(string memory data) public{str = data;}}'
var contractObj_MyFirst = getCompileContract(contents)['MyFirst'];    //返回合约对象里面可能有多个contract类， key为contract名称
var contractAbi = contractObj_MyFirst.abi;
var contractByteCode = contractObj_MyFirst.evm.bytecode.object.slice(0,2) === '0x' ? contractObj_MyFirst.evm.bytecode.object : '0x'+contractObj_MyFirst.evm.bytecode.object;


//最后获取合约abi 和 byteCode 字节码
```

# 10. 部署合约（web3.thk.contract(abi).new({data: code});）

# 调用合约方法 (web3.thk.contract(abis,contractAddress).at(contractAddress))

**thinkium-web3js项目example目录contractTest.js 文件有示例**

请求参数

```javascript
var contractAbi = contractObj_MyFirst.abi;
var contractByteCode = contractObj_MyFirst.evm.bytecode.object.slice(0,2) === '0x' ? contractObj_MyFirst.evm.bytecode.object : '0x'+contractObj_MyFirst.evm.bytecode.object;
//编译合约生成的abi 和byteCode 字节码
```

请求示例:

```javascript
//部署合约 参数为合约abi 和 byteCode 字节码
function deployContract(abis, codes){
    let contracts = web3.thk.contract(abis).new({data: codes});
    if(contracts.transactionHash){
        sleep(5000)
        var conresp = web3.thk.GetTransactionByHash(web3.thk.defaultChainId, contracts.transactionHash);
        return conresp.contractAddress
    }
    return ''
}
//发布合约
var contractAddress = deployContract(contractAbi,contractByteCode)
console.log('get contract address',contractAddress, contractAbi);
//返回的为部署后的合约地址


//获取合约对象，调用合约方法，参数为合约abi 和 合约地址
function callContractObj(abis, address){
    let contractObj = web3.thk.contract(abis,address).at(address);
    return contractObj;
}
var MyContract = callContractObj(contractAbi,contractAddress)
//调用合约内的 setString  和 getString方法
MyContract.setString("world")
sleep(5000)    //合约内的修改方法需要等待hash成功后，此处等待5秒，酌情修改等待时长
console.log("get contract function res:",MyContract.getString());

```

# 

# 11. ping（web3.thk.Ping）

请求参数
           

| 参数名  |  类型  | 是否必须 |  含义   |
| :-----: | :----: | :------: | :-----: |
| address | string |   true   | ip+端口 |

响应参数:
           

|    参数名     |  类型  | 是否必须 |      含义      |
| :-----------: | :----: | :------: | :------------: |
|    nodeId     | string |   true   |     节点id     |
|    version    | string |   true   |      版本      |
|  isDataNode   |  bool  |   true   | 是否是数据节点 |
|  dataNodeOf   |  int   |   true   |    数据节点    |
|  lastMsgTime  | int64  |   true   | 上一个信息时间 |
| lastEventTime | int64  |   true   | 上一个事件时间 |
| lastBlockTime | int64  |   true   |  上一个块时间  |
|   overflow    |  bool  |   true   |      溢出      |
|  lastBlocks   |  map   |   true   |   最后一个块   |
|    opTypes    |  map   |   true   |      类型      |

请求示例:

```javascript
var response = web3.thk.Ping("192.168.1.13:22010")

```

```json
response:
{
    "nodeId":
    "0x5e17128ba224a96d6e84be0c7f899febea26c55c78940610d78a0d22dbd0ab03cc3233491d
    e0b5eb770dbf850b509bd191723df4fc40520bcbab565d46543d6e",
    "version": "V1.0.0",
    "isDataNode": true,
    "dataNodeOf": 0,
    "lastMsgTime": 1560850367,
    "lastEventTime": 1560850367,
    "lastBlockTime": 1560850367,
    "overflow": false,
    "lastBlocks": {
    	"0": 159927
    },
    "opTypes": {
        "0": [
        	"DATA"
        ]
    }
}

```

# 12. 生成支票的证明(web3.thk.RpcMakeVccProof)

请求参数
           

|   参数名    | 类型 | 是否必须 |   含义   |
| :---------: | :--: | :------: | :------: |
| transaction | dict |   true   | 交易对象 |

transaction：
           

|    参数名    |  类型  | 是否必须 |                含义                |
| :----------: | :----: | :------: | :--------------------------------: |
|   chainId    | string |   true   |                链id                |
| fromChainId  | string |   true   |       交易发起账户地址的链id       |
|  toChainId   | string |   true   |       交易接受账户地址的链id       |
|     from     | string |   true   |          交易发起账户地址          |
|      to      | string |   true   |          交易接受账户地址          |
|    nonce     | string |   true   | 交易的发起者在之前进行过的交易数量 |
|    value     | string |   true   |              转账金额              |
| ExpireHeight |  int   |   true   |              过期高度              |

响应参数:
           

| 参数名 |  类型  | 是否必须 |      含义      |
| :----: | :----: | :------: | :------------: |
| input  | string |   true   | 生成的支票证明 |

请求示例:

```javascript
let obj = {
    chainId: '2',
    from: '0x2c7536e3605d9c16a7a3d7b1898e529396a65c23',
    to: '0x2c7536e3605d9c16a7a3d7b1898e529396a65c23',
    fromChainId: '2',
    toChainId: '3',
    value: '1000000000000000',
    expireheight: '54223',
    nonce: '47'
}
var response = web3.thk.RpcMakeVccProof(obj)

```

```json
response:
{
    "input":
  '0x95000000022c7536e3605d9c16a7a3d7b1898e529396a65c23000000000000002f000000032c7536e3605d9c16a7a3d7b1898e529396a65c23000000000000d3cf07038d7ea4c6800002a2d30bc06dc891383f7c61c310c9109aae0407508ced3f5562670b13cc5f093777a65a0193941093a1b6df76df5387752a24b904aac80067c3aa0ea7eb1b40074d4a30889e0083412744c2000080809409934080c20202808100018187aa9f339cf1ba6ffe6986f68c639a835fac453ac37d0df6e72091b1cd1cd30001019424930080c20000c02c83b4898418ce3324a2deeacf5848d49981f8ad2ad60c810c23e78e840dbc1781000524ac33cdd9e9bf0cbdfc4d357d81d5d1638dd7516ec38d779300f5f6e76d9b7ee0eccda334e611eb97288b59a36e78b25eb15746f593036a56ab50f89174f60062e715f8969d49b1ada75ce66977ab01219068e1adcf104eb328442fa3002759eca078605c1b0ad6ff4323f7c23307585d3dddd504f96e7a7f722f9802d2a1b7130047aeaaba37848d7c13a6df0328565e15ba9401b2485ac662423afcc01bb4000110'
}

```

# 13. 生成取消支票的证明(web3.thk.MakeCCCExistenceProof)

请求参数
           

|   参数名    | 类型 | 是否必须 |   含义   |
| :---------: | :--: | :------: | :------: |
| transaction | dict |   true   | 交易对象 |

transaction：
           

|    参数名    |  类型  | 是否必须 |                含义                |
| :----------: | :----: | :------: | :--------------------------------: |
|   chainId    | string |   true   |                链id                |
| fromChainId  | string |   true   |       交易发起账户地址的链id       |
|  toChainId   | string |   true   |       交易接受账户地址的链id       |
|     from     | string |   true   |          交易发起账户地址          |
|      to      | string |   true   |          交易接受账户地址          |
|    nonce     | string |   true   | 交易的发起者在之前进行过的交易数量 |
|    value     | string |   true   |              转账金额              |
| ExpireHeight |  int   |   true   |              过期高度              |

响应参数:
           

|  参数名   |  类型  | 是否必须 |      含义      |
| :-------: | :----: | :------: | :------------: |
|   input   | string |   true   | 生成的支票证明 |
| existence |  bool  |   true   |  是否存过支票  |

请求示例:

```javascript
let obj = {
    chainId: '2',
    from: '0x2c7536e3605d9c16a7a3d7b1898e529396a65c23',
    to: '0x2c7536e3605d9c16a7a3d7b1898e529396a65c23',
    fromChainId: '2',
    toChainId: '3',
    value: '1000000000000000',
    expireheight: '54223',
    nonce: '47'
}
var response = web3.thk.MakeCCCExistenceProof(obj)

```

```json
response:
{
    "existence": false,
    "input":
  '0x95000000022c7536e3605d9c16a7a3d7b1898e529396a65c23000000000000002f000000032c7536e3605d9c16a7a3d7b1898e529396a65c23000000000000d3cf07038d7ea4c6800002a2d30bc06dc891383f7c61c310c9109aae0407508ced3f5562670b13cc5f093777a65a0193941093a1b6df76df5387752a24b904aac80067c3aa0ea7eb1b40074d4a30889e0083412744c2000080809409934080c20202808100018187aa9f339cf1ba6ffe6986f68c639a835fac453ac37d0df6e72091b1cd1cd30001019424930080c20000c02c83b4898418ce3324a2deeacf5848d49981f8ad2ad60c810c23e78e840dbc1781000524ac33cdd9e9bf0cbdfc4d357d81d5d1638dd7516ec38d779300f5f6e76d9b7ee0eccda334e611eb97288b59a36e78b25eb15746f593036a56ab50f89174f60062e715f8969d49b1ada75ce66977ab01219068e1adcf104eb328442fa3002759eca078605c1b0ad6ff4323f7c23307585d3dddd504f96e7a7f722f9802d2a1b7130047aeaaba37848d7c13a6df0328565e15ba9401b2485ac662423afcc01bb4000110'
}

```

# 14. 获取链结构（ web3.thk.GetChainInfo）

请求参数
           

|  参数名  |  类型  | 是否必须 |            含义            |
| :------: | :----: | :------: | :------------------------: |
| chainIds | string |   true   | 链id（备注：传空代表所有） |

响应参数:
           

| 参数名 |    类型     | 是否必须 |    含义    |
| :----: | :---------: | :------: | :--------: |
|   []   | []chainInfo |   true   | 链信息数组 |

chainInfo：
           

|  参数名   |    类型    | 是否必须 |    含义    |
| :-------: | :--------: | :------: | :--------: |
|  chainId  |    int     |   true   |    链id    |
| datanodes | []dataNode |   true   | 数据节点群 |
|   mode    |    int     |   true   |    模式    |
|  parent   |    int     |   true   |     父     |

dataNode：
           

|    参数名    |  类型  | 是否必须 |     含义     |
| :----------: | :----: | :------: | :----------: |
|  dataNodeId  |  int   |   true   |  数据节点id  |
|  dataNodeIp  | string |   true   |  数据节点ip  |
| dataNodePort |  int   |   true   | 数据节点端口 |

请求示例:

```javascript
var response = web3.thk.GetChainInfo([])

```

```json
response:
[
    {
        "chainId": 0,
        "datanodes": [
            {
                "dataNodeId":
                "0x5e17128ba224a96d6e84be0c7f899febea26c55c78940610d78a0d22dbd0ab03cc3233491d
                e0b5eb770dbf850b509bd191723df4fc40520bcbab565d46543d6e",
                "dataNodeIp": "192.168.1.13",
                "dataNodePort": 22010
            }
        ],
        "mode": 5,
        "parent": 1048576
    },
    {
        "chainId": 1,
        "datanodes": [
            {
                "dataNodeId":
                "0x96dc94580e0eadd78691807f6eac9759b9964daa8b46da4378902b040e0eb102cb48413308
                d2131e9e5557321f30ba9287794f689854e6d2e63928a082e79286",
                "dataNodeIp": "192.168.1.13",
                "dataNodePort": 22014
            }
        ],
        "mode": 6,
        "parent": 0
    },
    {
        "chainId": 2,
        "datanodes": [
            {
                "dataNodeId":
                "0xa93b150f11c422d8700554859281be8e34a91a859e0e021af186002c7e4a2661ea2467a63b
                417030d68e2fdddeb4342943dff13225da77124abf912fd092f71f",
                "dataNodeIp": "192.168.1.13",
                "dataNodePort": 22018
            }
        ],
        28
        "mode": 6,
        "parent": 0
    },
    {
        "chainId": 3,
        "datanodes": [
            {
                "dataNodeId":
                "0x783f4b2490461ecfd8ee8d3451e434de06bacb0ffff56de53a33fe545589094fa0b929eeaa
                62dc5203d1e831ccdd37d206d0b85b193921efb223bf0cb2f37b4c",
                "dataNodeIp": "192.168.1.13",
                "dataNodePort": 22022
            }
        ],
        "mode": 7,
        "parent": 1
    },
    {
        "chainId": 4,
        "datanodes": [
            {
                "dataNodeId":
                "0x44c98ab831f3ca4553e491bba06753e959ceb55d43e18bc76539572feb1e0dbaf2fbfc19f5
                29
                71d6544e82be1c7c39760f6a023d4be4dcb9473dd580c731d03926",
                "dataNodeIp": "192.168.1.13",
                "dataNodePort": 22026
            }
        ],
        "mode": 7,
        "parent": 1
    }
]

```

# 15. 获取委员会详情（web3.thk.GetCommittee）

请求参数
           

| 参数名  |  类型  | 是否必须 |   含义   |
| :-----: | :----: | :------: | :------: |
| chainId | string |   true   |   链id   |
|  epoch  | string |   true   | 参选轮次 |

响应参数:
           

|    参数名     |   类型   | 是否必须 |    含义    |
| :-----------: | :------: | :------: | :--------: |
| MemberDetails | []string |   true   | 委员会详情 |

请求示例:

```javascript
var response = web3.thk.GetCommittee("1","411")

```

```javascript
response:
[
    "0xe90a151759bf070969aae664e00502bb08568c85a73874492a3ec480c5178d5da29c790896fc62106e32d172819dec94202ff90f3b7ba3e6adf38508bc58cf43",
    "0x3224de0da639511fec588d2e28f4472476b1600d003a10e38e0456426337624aaecd6636e5ce7ff95fc10746471ce7b680f664ccbf17057ca18c761706afa391",
    "0xad88dc0c0cf7d9e4a62f97e81f33556f65abba96b3c7108a732ff20f1a23530ca7730a6885d91ac718e1bb6ebad5e18bf8b7a58b91cbf717b48b723c7ceedef6",
    "0x8c7872c0c96a9f5b396120a0a45706678ab7a34c34a146ce9329c894f8cb9de41ec10edbf6b9c85796fd9e91d8d651a53578f164c8ee71a2d2cbfef9d5a4c6a4",
    "0xdb3e5b5ea24e1d760a59cf22cfafeed5a4e57af2108fc0df3bf457a82f754264b3fdf9d77fcab306a9809ebcd76de91e382d912a90e3f37edf4eb04f3f036d0b",
    "0x4ce2edd98452036c804f3f2eeef157672be2ccf647369eb42eb49ab9f428821f9990efde3cf7f16e4c64616c10b673077f4278c6dd2fc6021da8ad0085a522a2", 
    "0xd1f889690f8c75bbada89a4c8893b8bf6fe29be3b5c3d8a2d772024a340d59d375f39ed88498666a57da10af885ad63a414f8a10153fb739eb1ebfcef57cc883"
]

```

# 16. 新建一个合约对象(web3.thk.contract)

请求参数
           

| 参数名  |  类型  | 是否必须 |                        含义                        |
| :-----: | :----: | :------: | :------------------------------------------------: |
|   abi   | string |   true   | abi数组(合约中的response["info"]["abiDefinition"]) |
| address | string |   true   |                      合约地址                      |

请求示例:

```javascript
// myCon对象可以直接调用合约内方法
var myCon = web3.thk.contract(getcontract["<stdin>:" + cotractName]["info"]["abiDefinition"]).at(contractAddress);
// 调用方法前手动设置账户
web3.thk.setCaller("0x0000000000000000000000000000000000000000")
web3.thk.setVal("0")
// 调用合约内set方法
myCon.set(2)
//调用合约内get方法, 需调用set方法后几秒钟再调用get
myCon.get()

```

