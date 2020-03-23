/* jest 单元测试 */

var xss = require('../dist/xss.min.js')

xss.init({urlWhiteList:["www.baidu.com"]})

test('url filter:ac.1ssai.com', () => {
  expect(xss.urlFilter('ac.1ssai.com')).toBe('');
})

test('url filter:ac.itzoujie.com', () => {
  expect(xss.urlFilter('ac.itzoujie.com')).toBe('ac.itzoujie.com');
})

test('白名单url:www.baidu.com', () => {
  expect(xss.urlFilter('www.baidu.com')).toBe('www.baidu.com');
})

test('白名单url:www.baidu01.com', () => {
  expect(xss.urlFilter('www.baidu01.com')).toBe('');
})

test('XSS攻击字符：{data:alert("dd")}', () => {
  expect(xss.parse('{data:alert("dd")}')).toBe('{data:alert&#40;&quot;dd&quot;&#41;}');
})

test('XSS攻击字符：www.example.com/abc?a=(function(){xss;})()', () => {
  expect(xss.parse('www.example.com/abc?a=(function(){xss;})()')).toBe('www.example.com/abc?a=((){xss;})()');
})

test("sql注入攻击：' or 1=1#", () => {
  expect(xss.parse("' or 1=1#")).toBe('&apos; or 1=1#');
})

test('sql注入攻击：admin"#', () => {
  expect(xss.parse('admin"#')).toBe('admin&quot;#');
})