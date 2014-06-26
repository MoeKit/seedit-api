var API = require('index');
var expect = require('expect');

describe('API', function () {

    it('API has 4 functions', function () {
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

    it('API.get options', function () {
        var get = API.get('bbs/common_member');
        expect(get.options.dataType).to.be('jsonp');
        expect(get.options.jsonp).to.be('__c');
        expect(get.options.type).to.be('GET');
        expect(get.options.jsonpCallback).to.be('bbs_common_member_0');
        expect(get.scope).to.be('common');
    });

});