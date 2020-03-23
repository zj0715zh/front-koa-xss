# 作者
拍拍贷前端工程师-邹杰

# 开发时间
2019年5月9号

#主要预防点

 - 过滤url携带xss攻击字符，比如url?callback=javascript:alert('*')或者url?query=(function a(){***})()
 - 过滤接口请求中的xss攻击字符，比如发送数据{data:console.log("dd")}
 - 过滤接口返回报文中的xss攻击字符，比如接口返回数据{data:<script type="text/javascript">****</script>}
 - 做页面跳转白名单控制,过滤非法的第三方地址(还在跟安全沟通具体方案)

#front-xss插件的使用

# 功能

本插件主要用于预防前端和node的xss攻击，插件可用于前端和node层。


# 如何使用

方式一：

```
<script src="./dist/ppdxss.min.js"></script> //实际引入地址以线上为主，插件对外暴露了一个全局变量ppdXssHandle
```

代码中调用方式：

```js
ppdXssHandle.parse(str||object)
```


方式二：

```
npm install front-xss --save
```

```js
const ppdXss = require('front-xss')
// 传入参数
ppdXss.parse(str||object)
```


# 可用方法

front-xss插件目前提供了两种方法：

 - parse方法用于过滤字符串或者对象中的xss攻击字符
 - getQueryString方法用于获取url后面参数，并且过滤掉了xss攻击字符
 - 后续方法持续更新中