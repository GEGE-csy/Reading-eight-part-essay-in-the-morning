async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
    resolve('promise1 resolve')
  }).then(res => console.log(res))
  setTimeout(() => {
    console.log('async setTimeout')
  }, 0)
  console.log('async1 success');
  return 'async1 end'
}
console.log('script start')
async1().then(res => console.log(res))
setTimeout(() => {
  console.log('script setTimeout')
}, 0)
console.log('script end')

/**
 * // script start
 * // async1 start
 * // promise1
 * // script end
 * // promise1 resolve 
 * // async1 success
 * // async1 end
 * // script setTimeout
 * // async setTimeout
*/

/**
 * / await then加入微任务队列，async函数中await语句后面的语句也相当于加入微任务队列
 * / async1().then()暂时不加入微任务队列，因为async1()还未返回成功的promise
*/