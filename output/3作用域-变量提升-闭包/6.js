var a = 1;
function b() {
  console.log(a);  
  a = 10;
  return;
  function a() { }
}
b();
console.log(a); 
/**
 * / 对于函数声明来说，提升的是一整个函数定义
 * 
 *  var a = 1;
    function b() {
      function a() {}
      console.log(a);   // function a() {}
      a = 10;
      return;
    }
    b();
    console.log(a);  // 1 这里是1因为b()中有了局部的a，所以a=10覆盖不到全局的a
 */

