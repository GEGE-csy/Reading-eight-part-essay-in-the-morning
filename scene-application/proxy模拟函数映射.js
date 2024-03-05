// 题目：这个函数的其他写法
function func(val) {
  if(val === 'a') return 1
  else if(val === 'b') return 2
  else if(val === 'c') return 3
  return 0
}
console.log(func('a')) // 1

function func2() {
  const map = {
    'a': 1,
    'b': 2,
    'c': 3
  }
  const proxyObj = new Proxy(map, {
    get(target, prop) {
      return prop in target ? target[prop] : 0
    }
  })
  return proxyObj
}
console.log(func2()['a']) // 1