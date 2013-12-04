/**
 * This is for private usage.
 * @todo setting API for main domain
 * @todo add test cases
 */

define(function (require, exports, module) {
    var $ = jQuery;
    // require iframeTransport for cross-domain use
    require('seedit/iframeAjax/0.0.1/iframeAjax');
    // for fucking ie
    if (!window.JSON) {
        require('gallery/json/1.0.3/json');
    }
    var API = {};
    // get main domain
    var getDomain = function () {
        var hostArray = document.location.host.split('.')
        hostArray.splice(0, 1);
        return hostArray.join('.')
    };
    // get commmon API base
    var baseURL = (function () {
            return (window.seedit && seedit.CONFIG.APIBaseURL) ? seedit.CONFIG.APIBaseURL : 'http://common.seedit.com/';
        })(),
        _getURL = function (name, type) {
            return name.indexOf('.') > 0 ? baseURL + name : baseURL + name + '.' + type;
        },
        _method = ['GET', 'POST', 'PUT', 'DEL'],
        _request = function (options, successCallback, errorCallback) {
            var defaultOpt = {
                type: 'get',
                dataType: 'jsonp',
                data: {
                    __method: 'GET'
                },
                jsonp: '__c',
                jsonpCallback: 'request',
                success: function (data) {
                    // failure callback
                    // 对于API V2,错误误为0外的都发生了请求错误 
                    if (data['error_code'] && data['error_code'] !== 0) {
                        errorCallback && errorCallback.call(this, data);
                    } else {
                        // success callback 
                        successCallback && successCallback.call(this, data);
                    }
                },
                error: function (a, b, c) {
                    //alert(JSON.stringify(a),JSON.stringify(b));
                    // @todo
                }
            };
            options.url = _getURL(options['api'], options['dataType']);
            $.extend(defaultOpt, options);
            var key = options['api'].replace('/', '_') + '_' + options['data']['__method'];
            delete options['api'];
            // 维护各个请求接口的次数
            this[key] === undefined ? (this[key] = 1) : (this[key]++);
            // 同一接口不允许有同一个callback名字
            defaultOpt['jsonpCallback'] = key.replace('.', '_') + '_' + this[key];
            if (defaultOpt.type !== 'get') {
                defaultOpt.type = 'POST';
                defaultOpt.iframe = true;
                defaultOpt.dataType = 'json';
                defaultOpt.url = _getURL(defaultOpt['api'], 'iframe');
            }
            // final request
            $.ajax(defaultOpt);
        }

    $.each(_method, function (index, value) {
        API[value.toLowerCase()] = function (api, option, successCallback, errorCallback, dataType) {
            var data = {};
            // 不带参数的参数顺序处理
            if (typeof option === 'function') {
                if (typeof successCallback === 'function') {
                    var errorCallback;
                    errorCallback = successCallback;
                }
                successCallback = option;
            } else {
                data = option;
            }

            // 登录接口结束
            $.extend(data, {
                __method: (value === 'DEL') ? 'DELETE' : value
            });
            var options = {
                api: api,
                dataType: 'jsonp',
                data: data
            };
            // override dataType
            if (typeof arguments[arguments.length - 1] === 'string') {
                options['dataType'] = arguments[arguments.length - 1];
            }
            $.extend(options, option);

            if (value.toLowerCase() !== 'get') {
                options.type = 'POST';
                // set document.domain
                document.domain = getDoamin();
            }
            _request(options, successCallback, errorCallback);
        }
    });
    module.exports = API;
});