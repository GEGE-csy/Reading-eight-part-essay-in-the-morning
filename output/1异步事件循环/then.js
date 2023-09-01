Promise.resolve().then(() => {
  return new Error('error!!!')
}).then(res => {
  console.log("then: ", res)
}).catch(err => {
  console.log("catch: ", err)
})

/**
 * // "then: " "Error: error!!!"
*/

/**
 * / then()返回的promise的状态，要看他执行的回调的返回值
 * / return new Error()，就是返回了一个非promise值，那么返回的就是成功的promise，成功值就是返回值
 * / 所以会进第二个then()，而不是进catch()!!!，如果是throw new Error，那就会进catch()
*/