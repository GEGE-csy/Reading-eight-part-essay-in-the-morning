var obj = {
  say: function() {
    var f1 = () =>  {
      console.log("1111", this);
    }
    f1();
  },
  pro: {
    getPro:() =>  {
       console.log(this);
    }
  }
}
var o = obj.say;
o(); 
obj.say();
obj.pro.getPro();

/**
 * // 1111 window对象
 * // 1111 obj对象
 * // window对象
*/

/**
 * / o()是全局调用的，f1箭头函数的this指向say()的this，也就是全局作用域
 * / getPro()处于pro中，而对象不构成单独的作用域，所以指向全局作用域
*/