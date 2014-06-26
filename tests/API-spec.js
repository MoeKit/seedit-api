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
        var post = API.post('bbs/common_member', {hello: 'world', 'hello2': 'world2'});
        expect(post.options.url).to.be('http://common.seedit.com/bbs/common_member.iframe');
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
        expect(post.options.data.hello).to.be('world');
        expect(post.options.data.hello2).to.be('world2');
    });

    it('API.post querystrings', function () {
        var post = API.post('bbs/common_member', 'hello=world&hello2=world2');
        expect(post.options.url).to.be('http://common.seedit.com/bbs/common_member.iframe');
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
        expect(post.options.data.hello).to.be('world');
        expect(post.options.data.hello2).to.be('world2');
    });

    it('API.put options', function () {
        var put = API.put('bbs/common_member', {hello: 'world', 'hello2': 'world2'});
        expect(put.options.url).to.be('http://common.seedit.com/bbs/common_member.iframe');
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
        expect(put.options.data.hello).to.be('world');
        expect(put.options.data.hello2).to.be('world2');
    });

    it('API.del options', function () {
        var del = API.del('bbs/common_member', {hello: 'world', 'hello2': 'world2'});
        expect(del.options.url).to.be('http://common.seedit.com/bbs/common_member.iframe');
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
        expect(del.options.data.hello).to.be('world');
        expect(del.options.data.hello2).to.be('world2');
    });

    it('test get jsonCallback Counter', function () {
        var get = API.get('bbs/common_member');
        expect(get.options.dataType).to.be('jsonp');
        expect(get.options.jsonp).to.be('__c');
        expect(get.options.type).to.be('GET');
        expect(get.options.jsonpCallback).to.be('bbs_common_member_1');
        expect(get.scope).to.be('common');
    });

    it('test get with complete url', function () {
        var get = API.get('http://common.seedit.com/bbs/common_member.jsonp');
        expect(get.options.dataType).to.be('jsonp');
        expect(get.options.jsonp).to.be('__c');
        expect(get.options.type).to.be('GET');
        expect(get.options.jsonpCallback).to.be('bbs_common_member_2');
        expect(get.scope).to.be('common');
    });

    it('test get with complete url and json format', function () {
        var get = API.get('http://common.seedit.com/bbs/common_member.json');
        expect(get.options.dataType).to.be('jsonp');
        expect(get.options.jsonp).to.be('__c');
        expect(get.options.type).to.be('GET');
        expect(get.options.jsonpCallback).to.be('bbs_common_member_3');
        expect(get.scope).to.be('common');
    });

    // test scope
    it('test scope function', function () {
        var get1 = API.scope('huodong').get('shizhi/comment/list');
        expect(get1.scope).to.be('huodong');
        expect(get1.options.url).to.be('http://huodong.seedit.com/restful/shizhi/comment/list.jsonp');

        var get2 = API.scope('common').get('bbs/common_member');
        expect(get2.scope).to.be('common');
        expect(get2.options.url).to.be('http://common.seedit.com/bbs/common_member.jsonp');

        var get5 = API.scope('http://huodong.seedit.com/restful').get('shizhi/comment/list');
        expect(get5.scope).to.be('http://huodong.seedit.com/restful');
        expect(get5.options.url).to.be('http://huodong.seedit.com/restful/shizhi/comment/list.jsonp');

        var get4 = API.scope('').get('bbs/common_member');
        expect(get4.scope).to.be('common');
        expect(get4.options.url).to.be('http://common.seedit.com/bbs/common_member.jsonp');


    });


});