// constructor指向对象的构造函数
// prototype是每个函数对象有的属性，
// __proto__是每个对象有的属性，就是该对象的构造函数的prototype
// / Function.prototype是所有函数对象的原型
function Person(name) {
  this.name = name
}
var p2 = new Person('king')
// Person.prototype
console.log(p2.__proto__)
// Object.prototype
console.log(p2.__proto__.__proto__)
// null
console.log(p2.__proto__.__proto__.__proto__);
// 报错
console.log(p2.__proto__.__proto__.__proto__.__proto__)

// Person
console.log(p2.constructor)
// undefined，注意概念：p2不是函数没有prototype
console.log(p2.prototype)

// / Function，Person构造函数本身也是一个对象
console.log(Person.constructor)
// / Function.prototype Person的构造函数是Function
console.log(Person.__proto__);
// / Function.prototype Object的构造函数也是Function
console.log(Object.__proto__)

// Object.prototype，（Person.prototype）是一个对象，构造函数是Object
console.log(Person.prototype.__proto__)
// Object.prototype，（Function.prototype）是一个对象，构造函数是Object
console.log(Function.prototype.__proto__)
// null
console.log(Object.prototype.__proto__)

// 测试
console.log(p2.__proto__) 
console.log(p2.__proto__.__proto__) 
console.log(p2.__proto__.__proto__.__proto__) 
console.log(p2.constructor)
console.log(p2.prototype)
console.log(Person.constructor)
console.log(Person.prototype.constructor)
console.log(Person.prototype.__proto__)
console.log(Person.__proto__)
console.log(Function.prototype.__proto__)
console.log(Function.__proto__)
console.log(Object.__proto__)
console.log(Object.prototype.__proto__)