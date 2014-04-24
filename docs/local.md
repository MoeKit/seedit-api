# 测试环境调试

## 配置

在0.0.4版本之前，该API模块会从页面的全局变量 `seedit`中获取基本配置。

即 `var baseAPI = window.seedit.CONFIG.APIBaseUrl`;

因此可以直接赋值改变该配置。

0.0.4版本后请直接使用 `API.config(option)`方法