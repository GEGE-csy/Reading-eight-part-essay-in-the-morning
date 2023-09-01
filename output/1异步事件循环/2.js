const promise1 = new Promise((resolve, reject) => {
  console.log('promise1')
  resolve('resolve1')
})
const promise2 = promise1.then(res => {
  console.log(res)
})
console.log('1', promise1);
console.log('2', promise2);

/**
 * // promise1
 * // 1 Promise{<resolved>: resolve1}
 * // 2 Promise{<pending>}
 * // resolve1
*/

/**
 * / 输出promise1 => resolve()，此时promise1状态为resolve: resolve1
 * / 然后遇到then()微任务，加入微任务队列
 * / 输出1 Promise{<resolved>: resolve1} 2 Promise{<pending>} promise2状态没改变
 * / 最后执行微任务
 * / 
*/