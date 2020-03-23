/**!
 * name - front-xss
 *
 * date - 2019/05/07
 *
 * Authors:
 *   zoujie <364778792@qq.com>
 */

import {url_white_list,allow_url_regex} from './config'
import {parse} from './parse'

export function urlFilter(url) {
    //es6写法
    // var xss_url = decodeURIComponent(url)||'';
    // if(url_white_list.length>0){
    //     for (var url of url_white_list) {
    //         if(xss_url==url){
    //             return xss_url;
    //             break;
    //         }
    //     }
    // }
    // for (var urlReg of allow_url_regex) {
    //     if(urlReg.test(xss_url)){
    //         return xss_url;
    //         break;
    //     }
    // }
    // return ''

    //es5写法,以下代码是为节省时间,直接在线babel转换后拷贝过来的，— -
    var decodeUrl = '';
    try {
        decodeUrl = decodeURIComponent(url);
    } catch(err) {
        return ''
    }
    var xss_url = parse(decodeUrl) || '';

    if (url_white_list.length > 0) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = url_white_list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var url = _step.value;

            if (xss_url == url) {
              return xss_url;
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = allow_url_regex[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var urlReg = _step2.value;

          if (urlReg.test(xss_url)) {
            return xss_url;
            break;
          }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
    }

    return '';
}





