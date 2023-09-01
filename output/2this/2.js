var a = 1;
function printA(){
  console.log(this.a);
}
var obj={
  a:2,
  foo:printA,
  bar:function(){
    printA();
  }
}
obj.foo(); // 2
obj.bar(); // 1
var foo = obj.foo;
foo(); // 1

/**
 * // obj.bar()中的printA()是相当于是window调用的
 * // foo()也是相当于是window调用的，注意foo()跟obj.foo()是不一样的
*/