// 最先成功的最先返回
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    for(let i = 0; i < promises.length; i++) {
      promises[i].then(value => {
        resolve(value)
      }, reason => {
        reject(reason)
      }) 
    }
  })
}