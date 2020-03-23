/**!
 * name - front-xss
 *
 * date - 2019/05/07
 *
 * Authors:
 *   zoujie <364778792@qq.com>
 */

import { non_displayables } from './config'

function remove_invisible_characters(str) {
    for (var i = 0, l = non_displayables.length; i < l; i++) {
        str = str.replace(non_displayables[i], '');
    }
    return str;
}

function xss_hash() {
    var str = '', num = 10;
    while (num--) str += String.fromCharCode(Math.random() * 25 | 97);
    return str;
}

function convert_attribute(str) {
    return str.replace('>','&gt;').replace('<','&lt;').replace('\\','\\\\');
}

function filter_attributes(str) {
    var comments = /\/\*.*?\*\//g;
    return str.replace(/\s*[a-z-]+\s*=\s*'[^']*'/gi, function (m) {
        return m.replace(comments, '');
    }).replace(/\s*[a-z-]+\s*=\s*"[^"]*"/gi, function (m) {
        return m.replace(comments, '');
    }).replace(/\s*[a-z-]+\s*=\s*[^\s]+/gi, function (m) {
        return m.replace(comments, '');
    });
}

export {
    remove_invisible_characters,
    xss_hash,
    convert_attribute,
    filter_attributes
}



