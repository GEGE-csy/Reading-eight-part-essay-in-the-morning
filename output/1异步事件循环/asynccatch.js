async function async1 () {
  await async2();
  console.log('async1');
  return 'async1 success'
}
async function async2 () {
  return new Promise((resolve, reject) => {
    console.log('async2')
    reject('error')
  })
}
async1().then(res => console.log(res))

/**
 * // async2 
 * // Uncaught (in promise) error
 * /  async函数抛出错误，不会继续执行，如果要错误之后的代码继续执行，可以catch
*/

async function async1 () {
  await Promise.reject('error!!!').catch(e => console.log(e))
  console.log('async1');
  return Promise.resolve('async1 success')
}
async1().then(res => console.log(res))
console.log('script start')

/**
 * // script start
 * // error!!!
 * // async1
 * // async1 success
*/

/**
 * / Promise.reject('error!!!')是同步任务，立即返回失败的promise，catch()进入微任务队列
 * / 并且catch错误之后后面可以正常执行
*/