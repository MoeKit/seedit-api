# API文档

---
[![private package](http://moekit.com/privateBadge/bozhong)](http://moekit.com/package/seedit-config)
[![Build Status](https://travis-ci.org/MoeKit/seedit-api.svg)](https://travis-ci.org/MoeKit/seedit-api)
[![Coverage Status](http://img.shields.io/coveralls/MoeKit/seedit-api/0.0.5.svg)](https://coveralls.io/r/MoeKit/seedit-api)



站内`API` JavaScritp SDK 文档

对于`POST`跨域的问题，使用`iframeAjax`进行了处理封装。

---

## 实现说明

`GET`请求统一为`jsonp`请求

`POST`请求将提交到`iframe`处理

## API 方法说明

`API`主要只有`4`个请求方法。默认请求的是`common`API。要请求其他域的请看后面说明。


### API.verb(API,[data],successCallback,errorCallback)


verb为`REST`基本的四个方法:

+ `get`
+ `post`
+ `del` (delete为JavaScript`关键字`，`ie`下报错，不能使用)
+ `put`


参数说明

+ **API** string API名字，参照`CMS`后台文档。如 `bbs/common_member`。也可以为完全的API路径。
+ **data** object API参数，`可选`
+ **successCallback** function 请求成功时的回调,

    参数为API返回数据 `Object`:

    ```json
    {error_code:0,data:{}}
    ```

+ **errorCallback** function 请求失败的回调,

    参数为API返回数据 `Object`:

    ```json
    {error_code:1006,error_message:'出错啦'}
    ```

----

注意：`交互考虑，必须必须有errorCallback回调`

## API.scope

该函数返回上面四个方法，用于定义API scope,即API域 。

后面再调用get等方法时，基地址将由scope决定。

scope可取值有：

+ `common`  common API

+ `huodong`  活动 API

+ `./path`  相对当前网站路径，

    当前url为`http://account.seedit.com/`时，使用 `API.scope('./restful')`,那么所有API的基地址是 `http://account.seedit.com/restful`

+ `绝对地址`  不建议使用，仅用于调试
```javascript
var huodongAPI = API.scope('huodong');
// 请求试纸数据
huodongAPI.get('shizhi/list',function(data){
    // 请求成功啦
});
```


## 举例

带参数请求：
```javascript
API.post('bbs/post',datas,function(data){
    console.log('success');
},function(data){
    console.log('oops!'+data.error_message);
})
```

无参数时：
```javascript
API.get('bbs/common_member',function(data){
    console.log('success');
},function(data){
    console.log('oops!'+data.error_message);
});
```

