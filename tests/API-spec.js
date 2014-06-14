var API = require('index');
var expect = require('expect');

describe('API', function() {

    it('get', function() {
        expect(API.get).to.be.a('function');
    });

});