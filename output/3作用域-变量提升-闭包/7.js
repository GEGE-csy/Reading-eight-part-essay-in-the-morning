console.log(foo); 
var foo = "A";
console.log(foo)  
var foo = function () {
  console.log("B");
}
console.log(foo); 
foo(); 
function foo(){
  console.log("C");
}
console.log(foo)  
foo(); 

/**
 * / 函数声明提升 优先于 变量提升
 * foo()会提升到顶部，其他好像没变化！
 * 
 *  function foo(){
      console.log("C");
    }
    console.log(foo); // function foo() { console.log("C"); }
    var foo = "A";
    console.log(foo)  // ’A'
    var foo = function () {
      console.log("B");
    }
    console.log(foo); // function foo() { console.log("B"); }
    foo();   // ’B'
    console.log(foo)  // function foo() { console.log("B"); }
    foo();  // ’B'
 */

