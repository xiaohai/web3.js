const chai = require('chai');
const assert = chai.assert;

const encodeCheque = require('../../lib/utils/cash-cheque').encode;
const decodeCheque = require('../../lib/utils/cash-cheque').decode;

describe('encode-decode', function () {
    it('encode', function (done) {

        done();
    });
    it('decode', function (done) {
        let input = '0x00000001f167a1c5c5fab6bddca66118216817af3fa86827000000000000011f00000002f167a1c5c5fab6bddca66118216817af3fa8682700000000005a234120000000000000000000000000000000000000000000000001158e460913d00000';
        const cheque = decodeCheque(input);
        console.log(cheque);
        done();
    });
});
