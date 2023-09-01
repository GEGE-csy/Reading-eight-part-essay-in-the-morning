const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3');
    console.log('timer1')
  }, 0)
  resolve('resolve1');
  resolve('resolve2');
}).then(res => {
  console.log(res) 
  setTimeout(() => {
    console.log(p1)
  }, 1000)
}).finally(res => {
  console.log('finally', res)
})

/**
 * // resolve1
 * // finally undefined
 * // timer1
 * // Promise {<resolved>: undefined}
*/

/**
 * / then()加入微任务队列，finally()加入微任务队列，finally没有参数，res就是undefined
 * / 然后注意then()和finally()返回的其实都是一个promise，所以p1最后返回的是finally()返回的promise 
 * / finally返回的promise是它的上一个promise，也就是then返回的，那么then实际上返回了一个undefined！
*/
