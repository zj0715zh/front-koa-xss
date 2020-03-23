/**!
 * name - koa2-xss
 *
 * date - 2019/05/07
 *
 * Authors:
 *   zoujie <zoujie@ppdai.com>
 */
 

import { init, urlFilter, getQueryString, parse} from './lib/index.js'
var xssHandle = {
	init: init,
	urlFilter: urlFilter,
	getQueryString: getQueryString,
	parse: parse
}
exports = module.exports = xssHandle

//浏览器环境
if(typeof window !== "undefined") {
	window.xssHandle = xssHandle;
}

//work线程环境
if(typeof self !== 'undefined' && typeof DedicatedWorkerGlobalScope !== 'undefined' && self instanceof DedicatedWorkerGlobalScope) {
	self.xssHandle = xssHandle;
}