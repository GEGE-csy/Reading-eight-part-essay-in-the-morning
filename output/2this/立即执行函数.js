var myObject = {
  foo: "bar",
  func: function() {
      var self = this;
      console.log(this.foo);  
      console.log(self.foo);  
      (function() {
          console.log(this.foo);  
          console.log(self.foo);  
      }());
  }
};
myObject.func();
// bar bar undefined bar

/**
 * / 立即执行函数是由window调用的，this指向window
 * / 立即执行函数的作用域处于myObject.func的作用域中
*/
