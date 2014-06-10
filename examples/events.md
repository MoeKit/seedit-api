# 事件监听

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
API.get('http://common.seedit.com/bbs/common_member.jsonp',successCallback,errorCallback);
```
````javascript
seajs.use(['jquery', 'index'], function($, API) {

 var b = API.get('bbs/common_member', {
            a: 'b'
        }).on('success', function(data) {
            console.log(data)
            //console.log(a);
        }).on('error', function(data) {
            console.log('error', data);
        }).on('complete', function() {
            console.log('complete');
        });


    $('#test1').click(function(e) {
        e.preventDefault();
        $('#box1').empty();

        var userinfo = API.get('http://common.seedit.com/bbs/common_member.jsonp', {
            a: 'b'
        }).on('success', function(data) {
            console.log(data)
            //console.log(a);
        }).on('error', function(data) {
            console.log('error', data);
        }).on('complete', function() {
            console.log('complete');
        });

    });
});
````