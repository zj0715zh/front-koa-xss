# 作者
拍拍贷前端工程师-邹杰

# 开发时间
2019年5月9号


#ppdkoa2-xss插件的使用


# 功能

本插件主要用于node+koa2的node中间层架构，起到对请求参数进行过滤的作用，依赖于front-xss插件


# 如何使用


```
npm install ppdkoa2-xss --save
```


```js
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const ppdkoaXss = require('ppdkoa2-xss')

const app = new Koa()
app.use(bodyparser())
app.use(ppdkoaXss())
```
注意：ppdkoa2-xss中间件的使用要在bodyparser中间件之后，如果有不明白的同学可以去翻阅koa的洋葱模型