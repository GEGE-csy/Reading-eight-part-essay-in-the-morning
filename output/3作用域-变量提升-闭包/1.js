(function(){
  var x = y = 1;
})();

console.log(y); // 1
console.log(x); // Uncaught ReferenceError: x is not defined

/**
 * / y=1，y变成全局变量。var x = y，x是局部变量
 */

