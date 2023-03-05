
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组
}
*/
function parseParam(url) {
  let result = {}
  let paramsStr = url.split('?')[1]
  let paramsArr = paramsStr.split('&')
  paramsArr.forEach(item => {
    let key = item.split('=')[0];
    let value = item.split('=')[1];
    if(result.hasOwnProperty(key)) {
      result[key] = [].concat(result[key], value)
    } else {
      result[key] = value
    }
  })
  console.log(result)
}
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&id=789';
parseParam(url)