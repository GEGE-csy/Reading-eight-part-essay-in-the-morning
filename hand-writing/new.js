function objectFactory() {
  // 创建一个新对象
  let obj = null
  // 将新对象的原型设置为构造函数的原型
  let constructor = Array.prototype.shift.call(arguments)
  obj = Object.create(constructor.prototype)
  // 让构造函数的this指向新对象，调用构造函数
  let result = constructor.apply(obj, arguments)
  // 判断构造函数返回值类型，如果是引用类型就直接返回，如果是简单类型就返回新对象
  return (typeof result === 'object' || typeof result === 'function') ? result : obj

}

function F(name) {
  this.name = name
}

const obj = objectFactory(F, 'poem');
console.log(obj)