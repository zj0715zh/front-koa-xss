var url_white_list = [];

var never_allowed_str = {
    'document.cookie':              '',
    'document.write':               '',
    '.parentNode':                  '',
    '.innerHTML':                   '',
    'window.location':              '',
    'console.log':                  '',
    'function':                     '',
    '-moz-binding':                 '',
    '<!--':                         '&lt;!--',
    '-->':                          '--&gt;',
    '(<!\\[CDATA\\[)':              '&lt;![CDATA['
};

var never_allowed_regex = {
    '"':                            '&quot;',
    "'":                            '&apos;',
    '@':                            '',
    'javascript\\s*:':              '',
    'expression\\s*(\\(|&\\#40;)':  '',
    'vbscript\\s*:':                '',
    'Redirect\\s+302':              ''
};

var allow_url_regex = [
    /^((https|http){0,1}(:\/\/){0,1})(([A-Za-z0-9-~]+)\.)itzoujie\.com/
]

var non_displayables = [
    /%0[0-8bcef]/g,           // url encoded 00-08, 11, 12, 14, 15
    /%1[0-9a-f]/g,            // url encoded 16-31
    /[\x00-\x08]/g,           // 00-08
    /\x0b/g, /\x0c/g,         // 11,12
    /[\x0e-\x1f]/g            // 14-31
];

var compact_words = [
    'javascript', 'expression', 'vbscript',
    'script', 'applet', 'alert', 'document',
    'write', 'cookie', 'window'
];


export {
    url_white_list,
    never_allowed_str,
    never_allowed_regex,
    allow_url_regex,
    non_displayables,
    compact_words
}






