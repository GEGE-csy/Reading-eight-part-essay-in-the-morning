Promise.reject('err!!!')
  .then((res) => {
    console.log('success', res)
  }, (err) => {
    console.log('error', err)
  }).catch(err => {
    console.log('catch', err)
  })

/**
 * // error err!!!
*/

/**
 * / 错误被then()捕获了，就不会再被catch捕获了。同样，如果先被catch()捕获了，也不会被后面的then()捕获了
*/