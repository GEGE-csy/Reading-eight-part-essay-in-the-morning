// instanceof判断构造函数的prototype是否在对象的原型链上
function myInstanceOf(obj, constructor) {
  // 获取对象的对象原型，相当于let proto = obj.__proto__
  let proto = Object.getPrototypeOf(obj);
  let { prototype } = constructor;
  while(proto !== null) {
    if(proto === prototype) {
      return true;
    }
    // 不断更新对象原型，往原型链后方走
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
