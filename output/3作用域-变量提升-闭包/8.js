var foo = 1;

function bar(a) {
  var a1 = a;
  var a = foo;
  function a() {
    console.log(a); 
  }
  a1();
}
bar(3);

/*
  var foo = 1;
  function bar(a) {
    function a() {
      console.log(a); 
    }
    var a1 = a;  // a1 = function a() { console.log(a)}
    var a = foo; // a = 1
  
    a1(); // 执行a1()，打印a，此时a为1
  }
  bar(3);
*/
