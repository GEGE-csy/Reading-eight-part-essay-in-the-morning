// 和call唯一不同在第二个参数是数组，要判断第二个参数是否有传
// 如果传了的话，调用函数的时候要将数组解构传入
Function.prototype.myApply = function(context) {
  context = context || window
  context.fn = this
  let result = null
  if(arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

global.a = 2
function test(...args) {
  console.log(this.a)
  console.log(args)
}
test(1,2,3)
const obj = {
  a: 3
}
test.myApply(obj,[1,2,3])