# scope API 域


---

scope()方法的意义在于指定API基地址，因为原来只有common,现在有huodong。
指定scope后，调用时会自动添加该指定API基地址。



## 用户信息 `GET`

````javascript
seajs.use(['jquery', 'index'], function($, API) {
var iAPI = API.scope('huodong');
console.log(iAPI);
 var b = iAPI.get('shizhi/product/list', {
            a: 'b'
        }).on('success', function(data) {
            console.log(data)
            //console.log(a);
        }).on('error', function(data) {
            console.log('error', data);
        }).on('complete', function() {
            console.log('complete');
        });


        // 获取列表

        var getList = function(type,order,page,limit){
            iAPI.get('shizhi/product/list',{
                type:type,
                order:order,
                page:page,
                limit:limit
            }).on('success',function(data){
                console.log(data);
            });
        };

        // 获取全部
        getList(0,1,1,24);
        // 获取排卵
        getList(1,1,1,24);
        // 获取早早孕试纸
        getList(2,1,1,24);

        // 获取商品详情
        var getItem = function(id){
            iAPI.get('shizhi/product/item',{productid:1}).on('success',function(data){
                console.log('商品详情',data);
            });
        };

        getItem(1);

        // 获取评论
        var getComments = function(productid,level,page){
            var limit = 5;
            iAPI.get('shizhi/comment/list',{
                productid:productid,
                level:level,
                page:page,
                limit:limit
            }).on('success',function(data){
                console.log('评论',data);
            })
        };

        getComments(1,-1,1);
});
````