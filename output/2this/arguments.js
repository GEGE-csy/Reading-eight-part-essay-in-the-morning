var length = 10;
function fn() {
  console.log(this.length);
}
var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};
obj.method(fn, 1);

// 10 2

/**
 * // arguments[0]()，相当于arguments调用方法，this指向arguments
*/