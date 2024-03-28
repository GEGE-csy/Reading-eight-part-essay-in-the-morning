var friendName = 'World';
(function() {
  if (typeof friendName === 'undefined') {
    var friendName = 'Jack';
    console.log('Goodbye ' + friendName);
  } else {
    console.log('Hello ' + friendName);
  }
})();


/**
 * / 对于var声明来说不存在块级作用域，所以不用管这个if到底true还是false
 * / var friendName = 'Jack';会提升到立即执行函数的作用域顶部，
 * var friendName = 'World';
  (function() {
    var friendName
    if (typeof friendName === 'undefined') {
      friendName = 'Jack';
      console.log('Goodbye ' + friendName);
    } else {
      console.log('Hello ' + friendName);
    }
  })();
  * / 输出Goodbye Jack
 */