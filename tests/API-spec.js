define(function (require) {

    var API = require('API');
    var expect = require('expect');

    describe('API', function () {

        it('默认API为common', function () {
            expect(API.config('baseAPIUrl')).to.be('http://common.seedit.com/');
        });

        it('config方法', function () {
            var api = 'http://api.test.com/v1/';
            API.config({
                baseAPIUrl: api
            });
            var baseAPIUrl = API.config('baseAPIUrl');
            expect(baseAPIUrl).to.be(api);
        });

        it('基本get方法', function () {
            API.config({
                baseAPIUrl: 'http://common.seedit.com/'
            });
            API.get('bbs/common_member', function (data) {
                expect(data).to.be.a('object');
                expect(!!data.uid || !!data.error_code).to.be(true);
                console.log(data);
            });
        });
    });

});
