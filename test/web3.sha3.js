
setTimeout(done, 300);
setTimeout(done, 300);
const Web3 = require('../index');
const sha3 = require('../lib/utils/sha3');
const web3 = new Web3();

describe('web3.sha3', function () {
    it('should return sha3 with hex prefix', function () {
        test1 = web3.sha3('test123');
        console.log(test1);
        test2 = web3.sha3('test(int)');
        console.log(test2);
        test3 = web3.sha3('0x80', {encoding: 'hex'});
        test4 = web3.sha3('0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1', {encoding: 'hex'});
        assert.deepEqual(test1, '0x' + sha3('test123'));
        assert.deepEqual(test2, '0x' + sha3('test(int)'));
        assert.deepEqual(test3, '0x' + sha3('0x80', {encoding: 'hex'}));
        assert.deepEqual(test4, '0x' + sha3('0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1', {encoding: 'hex'}));
    });
});
