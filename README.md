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

本插件主要用于预防前端和node的xss攻击，过滤掉可疑的xss攻击字符，插件可用于前端和node层。

# 插件打包方法

```
npm install 
```
```
npm run build 
```

# 如何使用

方式一：

```
<script src="./dist/xss.min.js"></script> //实际引入地址以线上为主，插件对外暴露了一个全局变量xssHandle
```

代码中调用方式：

```js
xssHandle.parse(str||object)
```


方式二：

```
npm config set registry ****(公司私服地址)

npm install front-xss --save
```

```js
const xss = require('front-xss')
// 传入参数
xss.parse(str||object)
```


# 可用方法

xss插件目前提供了四种方法：

| 方法名          | 参数类型     |  功能说明  |  示例  |
| ------------   | --------:   | :-------: | :----: |
| init           | 对象         |用于进行参数配置,目前支持url的 白名单和正则参数，分别为:url WhiteList和allowUrlRegex|  xss.init({urlWhiteList:["www.baidu.com"]})或者xss.init({allowUrlRegex:[/\w+(\.itzoujie\.com)/]}) |
| parse          | 字符串或者对象 |过滤字符串或者对象中的xss攻击 字符 | xss.parse('javascript : foobar')或者xss.parse({str:'ja vascript : foobar'}) |
| getQueryString | 字符串    | 用于获取过滤掉xss攻击字符的ur l后面参数值 |  getQueryString('appid') |
| urlFilter      | 字符串    |  用于匹配白名单，过滤非法第三方地址，如果需要跳转第三方 地址，请在init方法中配置白名单 数组，凡是不匹配的都返回空字 符串 | urlFilter('ac.1234.com') |


#koa2-xss插件的使用


# 功能

本插件主要用于node+koa2的node中间层架构，起到对请求参数进行过滤的作用，依赖于front-xss插件


# 如何使用


```
npm config set registry ****(公司私服地址)

npm install koa2-xss --save
```


```js
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const koaXss = require('koa2-xss')

const app = new Koa()
app.use(bodyparser())
app.use(koaXss())
```
注意：koa2-xss中间件的使用要在bodyparser中间件之后，如果有不明白的同学可以去翻阅koa的洋葱模型






