Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)

/**
 * // 1
*/

/**
 * / Promise.resolve(1) = Promise{<resolved>: 1}
 * / then()接受的参数是函数，如果传递的不是一个函数，会发送值透传
 * / 这会导致resolve(1)直接传递到了最后一个then
*/