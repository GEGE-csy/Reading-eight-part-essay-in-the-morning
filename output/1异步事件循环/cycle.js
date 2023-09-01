const promise = Promise.resolve().then(() => {
  return promise;
})
promise.catch(console.err)

/**
 * // Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
*/

/**
 * / then()或catch()返回的值不能是promise本身，否则会造成死循环
*/