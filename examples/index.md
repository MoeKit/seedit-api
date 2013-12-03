# 用户相关

---
<script>
    seajs.config({
        path:'http://assets.spmjs.org/'
    });
</script>

## 用户信息 `GET`

<a href="javascript:" id="test1">点我发送请求</a>
<pre id="box1"></pre>

下面代码很长，但请求相关只有一句
```javascript
API.get('bbs/common_member',successCallback,errorCallback);
```
````javascript
seajs.use('API', function(API) {
    var $ = jQuery;
    $('#test1').click(function(e) {
    e.preventDefault();
        $('#box1').empty();
        API.get('bbs/common_member', function(data) {
            $('#box1').text(JSON.stringify(data, null, 4));
        }, function(error) {
            $('#box1').text(JSON.stringify(error, null, 4));
        });
    });
});
````

## 用户登录 `POST`
<input type="username" id="username" placeholder="用户名" value="sdkfljsdlf">
<input type="password" id="password" placeholder="密码">
<br>
<br>
<a href="javascript:" id="test2">点我去登录</a>
<pre id="box2"></pre>

````javascript
seajs.use('API', function(API) {
    (function($) {
        $('#test2').click(function() {
            API.post('ucenter/login', {
                username: $('#username').val(),
                password: $('#password').val()
            }, function(data) {
                $('#box2').text(JSON.stringify(data, null, 4));
            },function(data){
                 $('#box2').text(JSON.stringify(data, null, 4));
        });
        });
    })(jQuery);
});
````


## 退出登录 `delete`
<a href="javascript:" id="test3">点我退出登录</a>
<pre id="box3"></pre>

````javascript
seajs.use('API', function(API) {
    (function($) {
        $('#test3').click(function() {
            API.del('ucenter/login', function(data) {
                $('#box3').text(JSON.stringify(data, null, 4));
            },function(data){
                $('#box3').text(JSON.stringify(data, null, 4));
        });
        });
    })(jQuery);
});
````