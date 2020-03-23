/**!
 * name - front-xss
 *
 * date - 2019/05/07
 *
 * Authors:
 *   zoujie <364778792@qq.com>
 */

import {url_white_list,allow_url_regex} from './config'


export function init(option) {
    if(option.urlWhiteList){
        Array.from(new Set(option.urlWhiteList)).forEach(function(item) {
            url_white_list.push(item)
        })
    	// [...new Set(option.urlWhiteList)].forEach(function(item) {
    	// 	url_white_list.push(item)
    	// })
    }
    if(option.allowUrlRegex){
        Array.from(new Set(option.allowUrlRegex)).forEach(function(item) {
            allow_url_regex.push(item)
        })
    	// [...new Set(option.allowUrlRegex)].forEach(function(item) {
    	// 	allow_url_regex.push(item)
    	// })
    }
}
