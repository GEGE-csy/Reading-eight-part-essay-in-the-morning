const name = 'poem'
var obj = { 
  name : 'cuggz', 
  fun : function(){ 
    console.log(this.name); 
  } 
} 

obj.fun()     // cuggz
new obj.fun() // undefined

/**
 * / 构造函数中的this指向新创建的实例对象，这个对象上没有name属性
*/