const promise = new Promise((resolve, reject) => {
  console.log(1)
  console.log(2)
})
promise.then(() => {
  console.log(3)
})
console.log(4);

/**
 * // 输出结果：1
 * //          2
 * //          4
*/

/**
 * / promise状态没有变化，不会执行then()中的回调，不要想当然
 * / promise中就是同步代码
*/
