function add(a, b, c) {
  return a + b + c
}

function curry(fn) {
  let fnArgsLength = fn.length 
  let args = []
  function calc(...newArgs) {
    // 积累参数，10 20 30不断加入
    args = [...args, ...newArgs]
    // 当积累的参数没有达到fn，这里是add的参数长度，说明要返回函数
    if(args.length < fnArgsLength) {
      return calc
    } else { // 否则返回函数调用的结果
      return fn.apply(this, args)
      // return fn(...args)
    }
  }
  return calc
}
const curryAdd = curry(add)
console.log(curryAdd(10)(20)(30))