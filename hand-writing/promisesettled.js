Promise.myAllSettled = function(promises) {
  let res = []
  let len = 0
  return new Promise((resolve, reject) => {
      for(let i = 0; i < promises.length; i++) {
          promises[i].then(value => {
              res[i] = {
                  status: 'fulfilled',
                  value
              }
          }, reason => {
              res[i] = {
                  status: 'rejected',
                  reason
              }
          }).finally(() => {
              len++
              if(len === promises.length) {
                  resolve(res)
              }
          })
      }
  })
}