var a = 1
if(true) {
  console.log(a) 
  if(true) { 
    function a() {}
  }
  a()
}
console.log(a)

/**
 * function a(){}在块级作用域中会被处理成 var a = function(){}
    var a
    var a = 1
    if(true) {
      console.log(a) 
      if(true) {
        a = function a() {}
      }
      a()
    }
    console.log(a)
 */
