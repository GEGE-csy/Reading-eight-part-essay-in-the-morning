function test() {
  if (a) {
    var b = 100;
  }
  console.log(b); 
  c = 234;
  console.log(c); 
}
var a; 
test();
a = 10;
console.log(c); 

/*
  var c
  function test() {
    var b
    console.log(b);  // undefined
    if (a) {        /// a为undefined，进不来
      b = 100;
    }
    console.log(b);  // undefined
    c = 234;
    console.log(c);  // 234
  }
  var a; 
  test();
  a = 10;
  console.log(c); // 234
*/