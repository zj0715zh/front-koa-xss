/**!
 * name - koa2-xss
 *
 * date - 2019/05/07
 *
 * Authors:
 *   zoujie <364778792@qq.com>
 */

'use strict';

var xss = require('front-xss');


module.exports = function () {

  return async function(ctx, next) {
    try {
      if (ctx.request.body === undefined) {
        throw 'koa2-xss中间件必须在bodyParser后面使用'
        return
      }
      const res = xssClean(ctx)
      ctx.request.body = res.body;
      ctx.request.query = res.query;
    } catch (err) {
      throw err;
    }
    await next();
  };

  function xssClean(ctx) {
    if (ctx.request.body&&JSON.stringify(ctx.request.body) != '{}') {
      return {body:xss.parse(ctx.request.body)}
    }

    if (ctx.request.query) {
      return {query:xss.parse(ctx.request.query)}
    }
    return {}
  }
};

