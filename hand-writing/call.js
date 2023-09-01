// 必须定义在函数原型上，不然函数无法共享
// 这里的this指向的是调用myCall的函数
Function.prototype.myCall = function(context) {
  // 传入的this指向，如果没传就默认为window
  context = context || window
  // 取出所有参数
  let args = Array.from(arguments).slice(1)
  // 假设我们要调用函数test()，使用上是：test.myCall(this指向)
  // 那么这里的this就指向了test函数，但我们希望调用test时this指向context，
  // 就可以给context对象添加一个属性fn，这样调用fn时this就会指向context
  context.fn = this
  // 调用fn并拿到返回值
  let result = context.fn(...args)
  // 这时的fn属性没用了，可以删除，因为只是为了修改this指向才添加的
  delete context.fn
  return result
}

// 这样取参数也可以
Function.prototype.myCall = function(context, ...rest) {
  // 传入的this指向，如果没传就默认为window
  context = context || window
  context.fn = this
  let result = context.fn(...rest)
  delete context.fn
  return result
}

window.a = 2
function test() {
  let a = 1
  console.log(this.a)
}

test.myCall()