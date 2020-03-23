/**!
 * name - front-xss
 *
 * date - 2019/05/07
 *
 * Authors:
 *   zoujie <364778792@qq.com>
 */


import { parse } from './parse'

export function getQueryString(name) {
    try {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var localUrl = window.location.hash==''?window.location.search:window.location.search+window.location.hash;
        var r = localUrl.split('?').pop().match(reg);
        if (r != null)
            return parse(decodeURIComponent(r[2]));
        return null;
    } catch(err) {
        return null
    }
}