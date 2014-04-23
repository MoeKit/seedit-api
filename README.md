# API

---

<!-- [![Build Status](https://secure.travis-ci.org/aralejs/API.png)](https://travis-ci.org/seedit/API)
[![Coverage Status](https://coveralls.io/repos/aralejs/API/badge.png?branch=master)](https://coveralls.io/r/seedit/API) -->


站内`API` JavaScritp SDK 文档

对于`POST`跨域的问题，使用`iframeAjax`进行了处理封装。

---

## 使用说明

`GET`请求统一为`jsonp`请求

`POST`请求将提交到`iframe`处理

## API

`API`有且只有`4`个方法。


### API.verb(API,[data],successCallback,errorCallback) <em>function</em>



verb为`REST`基本的四个方法:

+ `get`
+ `post`
+ `del` (delete为JavaScript`关键字`，`ie`下报错，不能使用)
+ `put`

--- 

参数说明

+ **API** string API名字，参照`CMS`后台文档。如 `bbs/common_member`
+ **data** object API参数，`可选`
+ **successCallback** function 请求成功时的回调,

    参数为 `Object data`:

    ```json
    {error_code:0,data:{}}
    ```

+ **errorCallback** function 请求失败的回调,

    参数为 `Object data`:

    ```json
    {error_code:1006,error_message:'出错啦'}
    ```

----

注意：`交互考虑，必须必须有errorCallback回调`

----


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


## 附加，

公用`jQuery和seajs`地址

`http://scdn.bozhong.com/source/common/js/jquery.min.js`

---

`seajs`路径配置

```javascript
 seajs.config({
        paths: {
            seedit: 'http://assets.spmjs.org/seedit',
            arale: 'http://static.alipayobjects.com/arale',
            gallery: 'http://static.alipayobjects.com/gallery',
            moe: 'http://scdn.bozhong.com/source/moe'
        }
    });
```


