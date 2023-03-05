/// 1
// Promise.resolve(1) =>  new Promise(resolve => resolve(1))
/// then()接收的是函数，如果传递的不是函数，会解释称then(null)，会使前一个promise的结果传到下面
// then(console.log)会接收到resolve的成功值
// Promise.resolve(1)
//   .then(2)
//   .then(Promise.resolve(3))
//   .then(console.log)

/// promise1 Promise { <pending> }
/// promise2 Promise { <pending> }
/// throw new Error('error!!!')
/// 抛出异常之后程序暂停，不会继续执行了！
// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, 1000)
// })
// const promise2 = promise1.then(() => {
//   throw new Error('error!!!')
// })
// console.log('promise1', promise1)
// console.log('promise2', promise2)
// setTimeout(() => {
//   console.log('promise1', promise1)
//   console.log('promise2', promise2)
// }, 2000)
  

/// "then: " "Error: error!!!"
/// 这里是return了一个非promise的值，且没有抛出错误，那么then就会成功！！！进入第二个then()
/// 假如不是return new Error('error!!!') 而是 throw new Error('error!!!')就会失败！！进入到catch()中
Promise.resolve().then(() => {
  // 注意这里是return不是throw
  return new Error('error!!!')
}).then(res => {
  console.log("then: ", res)
}).catch(err => {
  console.log("catch: ", err)
})


// TypeError: Chaining cycle detected for promise #<Promise> 会报错陷入死循环
/// .then()和.catch()返回的值不能是promise本身，否则会陷入死循环
const promise = Promise.resolve().then(() => {
  return promise;
})
promise.catch(console.err)

