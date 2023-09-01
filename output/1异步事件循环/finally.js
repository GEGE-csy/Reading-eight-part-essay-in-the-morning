Promise.resolve('1')
  .then(res => {
    console.log(res)
  })
  .finally(() => {
    console.log('finally')
  })
Promise.resolve('2')
  .finally(() => {
    console.log('finally2')
  	return '我是finally2返回的值'
  })
  .then(res => {
    console.log('finally2后面的then函数', res)
  })

/**
 * // 1
 * // finally2
 * // finally
 * // finally2后面的then函数 2
*/

/**
 * / 1. finally()类似于then() 
 * / 2. finally()默认返回上一次的promise对象值，如果抛出的是一个异常则返回异常的promise对象
 * / resolve('1')的then()和resolve('2')的finally()在第一次循环的微任务队列中
 * / resolve('1')的finally()和resolve('2')的then()在第二次循环的微任务队列中
*/