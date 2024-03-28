var foo = 1;
function bar() {
  console.log(foo);  
  if (!foo) {
    var foo = 10;
  }
  console.log(foo); 
}
bar();

/**
 * / var foo = 10会提升到函数作用域顶部，
 * / 对于var声明来说不存在块级作用域，所以不用管这个if到底true还是false
 * 
 *  var foo = 1;
    function bar() {
      var foo;
      console.log(foo);   // undefined
      if (!foo) {
        foo = 10;
      }
      console.log(foo);  // 10
    }
    bar();
 * 
 */