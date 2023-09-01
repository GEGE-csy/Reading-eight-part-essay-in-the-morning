Promise.resolve().then(() => {
  console.log('1');
  throw 'Error';
}).then(() => {
  console.log('2');
}).catch(() => {
  console.log('3');
  throw 'Error';
}).then(() => {
  console.log('4');
}).catch(() => {
  console.log('5');
}).then(() => {
  console.log('6');
});

/**
 * // 1 
 * // 3
 * // 5
 * // 6
*/

/**
 * / catch()抛出错误还会被下一个catch()接收
 * / catch()如果没有抛出错误，会执行后面的then()
*/