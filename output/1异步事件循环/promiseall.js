function runAsync (x) {
  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
  return p
}
function runReject (x) {
  const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x))
  return p
}
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
       .then(res => console.log(res))
       .catch(err => console.log(err))

/**
 * // 1s后
 * // 1 
 * // 3
 * // 2s后
 * // 2
 * // Error：2
 * // 4s后
 * // 4
*/

/**
 * / promise.all()里的promise都是同时开始执行的，就算有promise失败了，只是会直接成为Promise.all的结果
 * / 但开始执行的数组中的promise正常运行
 * / runAsync()中都是1s直接打印，所以1和3直接打印出来
 * / 2s的时候，runReject(2)就失败了，这时候Promise.all()直接返回失败值
 * / 4s的时候，不要忘记runReject(4)也要打印
*/