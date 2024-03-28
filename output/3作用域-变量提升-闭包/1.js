(function(){
  var x = y = 1;
})();

console.log(y); // 1
console.log(x); // Uncaught ReferenceError: x is not defined


/** 
 * / var x = y = 1，从右向左执行，先执行y=1
 * / y并未声明，所以被提升为全局变量

    var y;
    (function(){
      y = 1;
      var x = y
    })();

    所以 y 输出 1，x是局部变量，全局作用域访问不到，报错
 * 
*/



