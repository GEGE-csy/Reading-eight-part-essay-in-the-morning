// https://bigfrontend.dev/zh/problem/implement-curry

/*
柯里化(Currying) 在JavaScript是一个常用的技巧。
请实现一个curry()方法，接受一个function然后返回一个柯里化过后的function。
这是一个例子
const join = (a, b, c) => {
  return `${a}_${b}_${c}`
}
const curriedJoin = curry(join)
curriedJoin(1, 2, 3) // '1_2_3'
curriedJoin(1)(2, 3) // '1_2_3'
curriedJoin(1, 2)(3) // '1_2_3'
*/
/**
 * / 用我的大白话描述一下：实现的curry函数，需要传入另一个函数fn，然后返回一个函数 a
 * /                     让我们可以使用返回的函数 a，传递任意的参数来得到fn的调用结果
 * /                     比如正常传参是 a(1,2,3)，可以a(1)(2)(3) a(1,2)(3) a(1)(2,3)...
*/
/// 核心思路：判断函数a收到的参数，如果收到的参数长度 小于 fn的参数长度，表明要返回一个函数，才能继续传参调用
//          比如 a(1,2)(3) 收到的参数1和2，小于fn的参数长度3，要返回的 a(1,2)也得是个函数才能继续传3调用
///         如果收到的参数长度 大于等于 fn的参数长度，那就相当于直接调用fn，返回调用的结果
function curry(fn) {
  return function curried(...args) {
    // 传入的参数长度达到fn的形参数目，直接调用这个函数，返回调用的结果
    if(args.length >= fn.length) {
      return fn.apply(this, args) 
    } else { // 没达到长度，就要返回一个函数继续给后面传剩下的参数调用
      return curried.bind(this, ...args)
    }
  }
}

