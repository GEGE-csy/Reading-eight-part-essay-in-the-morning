// let obj = {
//   a: 1
// }
// // 数据劫持
// Object.defineProperty(obj, 'a', {
//   get() {
//     console.log('获取a')
//     return a;
//   },
//   set(val) {
//     console.log('a更新了')
//     a = val
//   }
// })

// obj.a = '2'
// console.log(obj.a)

let obj = {
  a: 1
}


// receiver确定this指向
let p = new Proxy(obj, {
  get(target, prop, receiver) {
    console.log(`获取${prop}`)
    return Reflect.get(target,prop,receiver)
  },
  set(target, prop, value, receiver) {
    console.log(`${prop}被修改了`)
    Reflect.set(target, prop, value,receiver)
  }
})

//  为什么要用Reflect进行映射？
// 保证正确的this指向，Reflect有和proxy的同名方法
let p2 = new Proxy(obj, {
  get(target, prop) {
    console.log(`获取${prop}`)
    return target[prop]
  },
  set(target, prop, value) {
    console.log(`${prop}被修改了`)
    target[prop] = value;
  }
})

p.a = 2
console.log(p.a)