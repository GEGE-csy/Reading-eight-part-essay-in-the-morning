var a = 10
var obj = {
  a: 20,
  say: () => {
    console.log(this.a)
  }
}
obj.say() 

var anotherObj = { a: 30 } 
obj.say.apply(anotherObj) 

/**
 * // 10 10
*/

/**
 * / obj的say()是箭头函数，this取上层作用域中的，对象不构成作用域，所以取全局作用域
 * / obj.say.apply(anotherObj)，注意apply无法改变箭头函数的this指向
*/