var API = require('index');
var expect = require('expect');

describe('API', function () {

    it('API has four functions', function () {
        expect(API.get).to.be.a('function');
        expect(API.put).to.be.a('function');
        expect(API.del).to.be.a('function');
        expect(API.post).to.be.a('function');
    });

    it('API.scope("common") return 4 functions', function () {
        expect(API.scope('common').get).to.be.a('function');
        expect(API.scope('common').put).to.be.a('function');
        expect(API.scope('common').del).to.be.a('function');
        expect(API.scope('common').post).to.be.a('function');
    });

});