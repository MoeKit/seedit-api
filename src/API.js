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
    // deparms function
    var deParams = function (params, coerce) {
        var obj = {};
        var coerce_types = { 'true': !0, 'false': !1, 'null': null };
        var decode = decodeURIComponent;
        // Iterate over all name=value pairs.
        $.each(params.replace(/\+/g, ' ').split('&'), function (j, v) {
            var param = v.split('='),
                key = decode(param[0]),
                val,
                cur = obj,
                i = 0,
            // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
            // into its component parts.
                keys = key.split(']['),
                keys_last = keys.length - 1;
            // If the first keys part contains [ and the last ends with ], then []
            // are correctly balanced.
            if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
                // Remove the trailing ] from the last keys part.
                keys[keys_last] = keys[keys_last].replace(/\]$/, '');

                // Split first keys part into two parts on the [ and add them back onto
                // the beginning of the keys array.
                keys = keys.shift().split('[').concat(keys);

                keys_last = keys.length - 1;
            } else {
                // Basic 'foo' style key.
                keys_last = 0;
            }
            // Are we dealing with a name=value pair, or just a name?
            if (param.length === 2) {
                val = decode(param[1]);
                // Coerce values.
                if (coerce) {
                    val = val && !isNaN(val) ? +val              // number
                        : val === 'undefined' ? undefined         // undefined
                        : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
                        : val;                                                // string
                }
                if (keys_last) {
                    // Complex key, build deep object structure based on a few rules:
                    // * The 'cur' pointer starts at the object top-level.
                    // * [] = array push (n is set to array length), [n] = array if n is
                    //   numeric, otherwise object.
                    // * If at the last keys part, set the value.
                    // * For each keys part, if the current level is undefined create an
                    //   object or array based on the type of the next keys part.
                    // * Move the 'cur' pointer to the next level.
                    // * Rinse & repeat.
                    for (; i <= keys_last; i++) {
                        key = keys[i] === '' ? cur.length : keys[i];
                        cur = cur[key] = i < keys_last
                            ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : [])
                            : val;
                    }

                } else {
                    // Simple key, even simpler rules, since only scalars and shallow
                    // arrays are allowed.

                    if ($.isArray(obj[key])) {
                        // val is already an array, so push on the next value.
                        obj[key].push(val);

                    } else if (obj[key] !== undefined) {
                        // val isn't an array, but since a second value has been specified,
                        // convert val into an array.
                        obj[key] = [obj[key], val];

                    } else {
                        // val is a scalar.
                        obj[key] = val;
                    }
                }

            } else if (key) {
                // No value was defined, so set something meaningful.
                obj[key] = coerce
                    ? undefined
                    : '';
            }
        });

        return obj;
    };
    // get common API base
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
        };

    $.each(_method, function (index, value) {
        API[value.toLowerCase()] = function (api, option, successCallback, errorCallback, dataType) {
            var data = {};
            // 不带参数的参数顺序处理
            if (typeof option === 'function') {
                if (typeof successCallback === 'function') {
                    var errorCallback = successCallback;
                }
                successCallback = option;
            } else {
                // deparms the querystring
                if (typeof option === 'string') {
                    option = deParams(option);
                }
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
                document.domain = getDomain();
            }
            _request(options, successCallback, errorCallback);
        }
    });
    module.exports = API;
});