var config = require('seedit-config'),
    queryString = require('query-string'),
    jQuery = require('jquery'),
// require iframeTransport for cross-domain use
    $ = require('iframe-ajax')(jQuery);
// for fucking ie
require('json');

var API = {};
// get main domain
var getDomain = function () {
    if(/http:\/\/bozhong.com/.test(location.href)){
        return 'bozhong.com';
    }
    var hostArray = document.location.host.split('.');
    hostArray.splice(0, 1);
    return hostArray.join('.').replace(/:\d+$/,'');
};
// get common API base
var _getURL = function (scope, name, type) {
        var baseURL = '';

        if (/http/.test(scope)) {
            baseURL = scope;
        } else {
            switch (scope) {
                case 'common':
                    baseURL = config.getSiteUrl('common');
                    break;
                case 'huodong':
                    baseURL = config.get('huodongAPI');
                    break;
                case 'bbs':
                    baseURL = config.getSiteUrl('bbs')+'/restful';
                    break;
                default:
                    baseURL = config.getSiteUrl('common');
                    break;
            }
        }
        baseURL = window.location.protocol + baseURL.replace('http://', '//').replace('https://', '//')
        if (name.indexOf('http') !== -1) return name.replace('.json', '.jsonp').replace('jsonpp', 'jsonp');
        return name.indexOf('.') > 0 ? baseURL + '/' + name : baseURL + '/' + name + '.' + type;
    },
    _method = ['GET', 'POST', 'PUT', 'DEL'];

$.each(_method, function (index, value) {
    var method = value.toLowerCase();
    window.__getUid = 0;
    API[method] = function (api, option, successCallback, errorCallback) {
        var _this = this;
        _this.eventCallback = {};
        // default scope
        _this.scope = 'common';

        if (typeof option === 'string' && /scope/.test(option)) {
            _this.scope = queryString.parse(option).scope;
        } else if (typeof option === 'object') {
            _this.scope = option.scope;
            delete option.scope;
        }


        var options = {
            context: _this,
            type: 'GET',
            dataType: 'jsonp',
            error: function (jqXHR, textStatus) {
                // "timeout", "error", "abort", and "parsererror"
                this.trigger(textStatus, {error_code: -1, error_message: '抱歉，请求出现问题，请重试。错误:' + textStatus});
            },
            success: function (data) {
                // failure callback
                // 对于API V2,错误值为0外的都发生了请求错误
                if (data['error_code'] && data['error_code'] !== 0) {
                    this.trigger('error', data);
                    if (typeof option === 'function') {
                        successCallback && successCallback.call(this, data);
                    } else {
                        errorCallback && errorCallback.call(this, data);
                    }
                } else {
                    this.trigger('success', data);
                    if (typeof option === 'function') {
                        option.call(this, data);
                    } else {
                        successCallback && successCallback.call(this, data);
                    }
                }
            }
        };

        _this.options = options;

        // build data
        var data = {
            __method: 'GET'
        };

        if (typeof option === 'string') {
            option = queryString.parse(option);
        }
        options.data = typeof option === 'object' ? option : {};
        var dataType = method === 'get' ? 'jsonp' : 'iframe';

        // build dataType
        if (method === 'get') {
            options.type = 'GET';
            options.jsonp = '__c';
            options.dataType = 'jsonp';
        } else {
            options.data.__method = method.toUpperCase();
            options.type = 'POST';
            options.iframe = true;
            options.dataType = 'json';
            if (method === 'del') {
                options.data.__method = 'DELETE';
            }
        }
        // relative scope
        if (/\.\//.test(this.scope)) {
            this.scope = window.location.protocol + '//' + document.location.host + '/' + this.scope.replace('./', '');
        }


        // build url
        options.url = _getURL(this.scope, api, dataType);

        if (!this.scope) {
            this.scope = 'common';
        }

        if (method === 'get') {
            // build jsonpCallback
            var key = api.replace('/', '_') + '_' + method;
            // 维护各个请求接口的次数
            this[key] = window.__getUid++;
            // 同一接口不允许有同一个callback名字
            options['jsonpCallback'] = options.url.split('/').slice(3).join('_').replace('.' + options.dataType, '').replace(/\./g, '_') + '_' + this[key];
        }


        // 补救 http
        if (!/^http/.test(options.url)) {
            options.url = '//' + options.url;
        }

        if (method !== 'get') {
            // set document.domain
            var domain = getDomain();
            if (!domain || /^\d+(.*?)\d+$/.test(domain)) {
                console.error('必须在生产环境或者本地绑定HOST使用');
                return _this;
            }
            document.domain = domain;
        }
        // send request
        this.send();
        return this;
    };

    // send
    API[method].prototype.send = function () {
        var _this = this;
        $.ajax(_this.options);
        return this;
    };

    // arale-events 在这里会多次trigger,暂时不清楚原因，于是自己写了个简单的事件支持
    // set event listener
    API[method].prototype.on = function (event, callback) {
        this.eventCallback[event] = this.eventCallback[event] || [];
        this.eventCallback[event].push(callback);
        return this;
    };

    // event trigger
    API[method].prototype.trigger = function (event, data) {
        $(this.eventCallback[event]).each(function (index, one) {
            one(data);
        });
        return this;
    };
});

exports.scope = function (scope) {
    var rs = {};
    $.each(_method, function (index, one) {
        var method = one.toLowerCase();
        rs[method] = function (api, option, successCallback, errorCallback) {
            if (typeof option === 'object') {
                option.scope = scope;
            } else {
                option += '&scope=' + scope;
            }
            return new API[method](api, option, successCallback, errorCallback);
        };
    });
    return rs;
};


$.each(_method, function (index, one) {
    var method = one.toLowerCase();
    exports[method] = function (api, option, successCallback, errorCallback) {
        return new API[method](api, option, successCallback, errorCallback);
    };
});
