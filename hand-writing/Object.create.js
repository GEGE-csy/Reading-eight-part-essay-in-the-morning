// Object.create(null) 表示创建一个没有原型的对象
// Object.create(obj) 表示创建一个原型指向了obj的对象
function create(obj) {
  // F构造函数new出来的对象的原型，指向了F的原型对象，而F的原型对象指向了obj
  // 所以new出来的对象的原型就指向了obj！
  function F() {}
  F.prototype = obj
  return new F()
}

const obj = {
  name: 'poem'
}
const obj2 = create(obj)
