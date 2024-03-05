Function.prototype.myBind = function(context) {
  let args = Array.from(arguments).slice(1)
  let fn = this
  // bind返回的是一个函数
  return function () {
    // 这里要合并参数，一部分参数是调用bind传的，一部分是调用bind()返回的函数传的
    const newArgs = [...args, ...arguments]
    return fn.apply(context,newArgs)
  }
}

global.a = 2
function test(...rest) {
  let a = 1
  console.log(this.a)
  console.log(rest)
}

test.myBind(global, 1, 2, 3)(4)

// test.bind()()

