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

    it('API.post options', function () {
        var post = API.post('bbs/common_member');
        expect(post.options.dataType).to.be('json');
        // no jsonp option
        expect(post.options.jsonp).to.be(undefined);
        expect(post.options.type).to.be('POST');
        // no jsonpCallback option
        expect(post.options.jsonpCallback).to.be(undefined);
        expect(post.scope).to.be('common');
        // option.data.__method
        expect(post.options.data.__method).to.be('POST');
        expect(post.options.iframe).to.be(true);
    });

    it('API.put options', function () {
        var put = API.put('bbs/common_member');
        expect(put.options.dataType).to.be('json');
        // no jsonp option
        expect(put.options.jsonp).to.be(undefined);
        expect(put.options.type).to.be('POST');
        // no jsonpCallback option
        expect(put.options.jsonpCallback).to.be(undefined);
        expect(put.scope).to.be('common');
        // option.data.__method
        expect(put.options.data.__method).to.be('PUT');
        expect(put.options.iframe).to.be(true);
    });

    it('API.del options', function () {
        var del = API.del('bbs/common_member');
        expect(del.options.dataType).to.be('json');
        // no jsonp option
        expect(del.options.jsonp).to.be(undefined);
        expect(del.options.type).to.be('POST');
        // no jsonpCallback option
        expect(del.options.jsonpCallback).to.be(undefined);
        expect(del.scope).to.be('common');
        // option.data.__method
        expect(del.options.data.__method).to.be('DELETE');
        expect(del.options.iframe).to.be(true);
    });

    it('test get jsonCallback Counter', function () {
        var get = API.get('bbs/common_member');
        expect(get.options.dataType).to.be('jsonp');
        expect(get.options.jsonp).to.be('__c');
        expect(get.options.type).to.be('GET');
        expect(get.options.jsonpCallback).to.be('bbs_common_member_1');
        expect(get.scope).to.be('common');
    });

});