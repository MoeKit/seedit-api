# scope API 域


---

scope()方法的意义在于指定API基地址，因为原来只有common,现在有huodong。
指定scope后，调用时会自动添加该指定API基地址。



## 用户信息 `GET`

````javascript
seajs.use(['jquery', 'index'], function($, API) {

	var iAPI = API.scope('huodong');


	iAPI.get('shizhi/product/list', {
		a: 'b'
	}).on('success', function(data) {
		console.log(data)
		//console.log(a);
	}).on('error', function(data) {
		console.log('error', data);
	});

	var cAPI = API.scope('common');

	cAPI.get('bbs/common_member').on('success', function(data) {
		console.log(data);
	}).on('error', function(error) {
		console.log(error);
	});

	var bbsAPI = API.scope('bbs');
	bbsAPI.get('newyear/post').on('success',function(data){
		console.log(data);
	});


});



````