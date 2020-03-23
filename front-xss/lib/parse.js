/**!
 * name - front-xss
 *
 * date - 2019/05/07
 *
 * Authors:
 *   zoujie <364778792@qq.com>
 */

import { never_allowed_str, url_white_list, allow_url_regex, never_allowed_regex, compact_words } from './config'
import { remove_invisible_characters, xss_hash, convert_attribute, filter_attributes }from './utils'


export function parse(str, is_image) {
    if (typeof str === 'object') {
        for (var i in str) {
            if(typeof str[i] === 'undefined'){
                str[i] = '';
                continue;
            }
            if(str[i] === null || typeof str[i] === 'number') continue;
            str[i] = parse(str[i]);
        }
        return str;
    }

    str = remove_invisible_characters(str);

    var hash;
    do {
      // 在插入之前确保没有包含hash值
      hash = xss_hash();
    } while(str.indexOf(hash) >= 0)
    str = str.replace(/\&([a-z\_0-9]+)\=([a-z\_0-9]+)/ig, hash + '$1=$2');

    //验证UTF16双字节编码 (x00) - 如果缺少分号，则添加分号.
    str = str.replace(/(&\#x?)([0-9A-F]+);?/ig, '$1$2;');

    str = str.replace(new RegExp(hash, 'g'), '&');

    //解码操作，主要是为了防止以下形式的攻击:
    //<a href="http://%77%77%77%2E%67%6F%6F%67%6C%65%2E%63%6F%6D">Google</a>
    try{  
      str = decodeURIComponent(str);
    }
    catch(error){
      // 字符串不能被解码
    }

    //将字符转换为ASCII-这可以让我们下面的测试更好地工作.
    //我们只转换标签中的字符，因为这些可能会造成安全问题。.
    str = str.replace(/[a-z]+=([\'\"]).*?\1/gi, function(m, match) {
        return m.replace(match, convert_attribute(match));
    });

    //再次删除不可见字符
    str = remove_invisible_characters(str);

    //将tab转换为空格
    str = str.replace('\t', ' ');

    //保存转换后的字符串以供以后比较
    var converted_string = str;

    //删除从不允许的字符串，可在never_allowed_str中配置
    for (var i in never_allowed_str) {
        str = str.replace(new RegExp(i, "gi"), never_allowed_str[i]);
    }

    //删除不被允许的正则表达式，可在never_allowed_regex中配置
    for (var i in never_allowed_regex) {
        str = str.replace(new RegExp(i, 'gi'), never_allowed_regex[i]);
    }

    //合并任何分开的单词，比如:  j a v a s c r i p t
    // 我们只在后面跟着一个非单词字符时才这样做
    for (var i = 0, l = compact_words.length; i < l; i++) {
        var spacified = compact_words[i].split('').join('\\s*')+'\\s*';

        str = str.replace(new RegExp('('+spacified+')(\\W)', 'ig'), function(m, compat, after) {
            return compat.replace(/\s+/g, '') + after;
        });
    }

    //删除链接或img标记中不允许的javascript
    do {
        var original = str;

        if (str.match(/<a/i)) {
            str = str.replace(/<a\s+([^>]*?)(>|$)/gi, function(m, attributes, end_tag) {
                attributes = filter_attributes(attributes.replace('<','').replace('>',''));
                if (attributes.match(/href=.*?(alert\(|alert&\#40;|javascript\:|charset\=|window\.|document\.|\.cookie|<script|<xss|base64\s*,)/gi)) {
                    return m.replace(attributes, '');
                }
                return m;
            });
        }

        if (str.match(/<img/i)) {
            str = str.replace(/<img\s+([^>]*?)(\s?\/?>|$)/gi, function(m, attributes, end_tag) {
                attributes = filter_attributes(attributes.replace('<','').replace('>',''));
                if (attributes.match(/src=.*?(alert\(|alert&\#40;|javascript\:|charset\=|window\.|document\.|\.cookie|<script|<xss|base64\s*,)/gi)) {
                    return m.replace(attributes, '');
                }
                return m;
            });
        }

        if (str.match(/script/i) || str.match(/xss/i)) {
            str = str.replace(/<(\/*)(script|xss)(.*?)\>/gi, '[removed]');
        }

    } while(original != str);

    //删除javascript事件处理程序
    var event_handlers = ['[^a-z_\-]on\\w*'];

    //Adobe Photoshop将XML元数据放入JFIF图像中，包括名称间距,
    //所以我们需要允许
    if (!is_image) {
        event_handlers.push('xmlns');
    }

    str = str.replace(new RegExp("<([^><]+?)("+event_handlers.join('|')+")(\\s*=\\s*[^><]*)([><]*)", 'i'), '<$1$4');

    //清除替换部分标签
    //比如: <blink>
    //转换成: &lt;blink&gt;
    var naughty = 'alert|applet|audio|basefont|base|behavior|bgsound|blink|body|embed|expression|form|frameset|frame|head|html|ilayer|iframe|input|isindex|layer|link|meta|object|plaintext|style|script|textarea|title|video|xml|xss';
    str = str.replace(new RegExp('<(/*\\s*)('+naughty+')([^><]*)([><]*)', 'gi'), function(m, a, b, c, d) {
        return '&lt;' + a + b + c + d.replace('>','&gt;').replace('<','&lt;');
    });

    
    str = str.replace(/(alert|cmd|passthru|eval|exec|expression|system|fopen|fsockopen|file|file_get_contents|readfile|unlink)(\s*)\((.*?)\)/gi, '$1$2&#40;$3&#41;');

    
    for (var i in never_allowed_str) {
        str = str.replace(new RegExp(i, "gi"), never_allowed_str[i]);
    }
    for (var i in never_allowed_regex) {
        str = str.replace(new RegExp(i, 'gi'), never_allowed_regex[i]);
    }

    if (is_image && str !== converted_string) {
        throw new Error('Image may contain XSS');
    }

    return str;
}





