// / 封装私有变量
function createCounter() {
  let count = 0 // 私有变量

  return {
    getCount: function() {
      return count
    },
    increment: function() {
      count++
    }
  }
}

const counter = createCounter()
console.log(counter.getCount()) // 0
counter.increment() 
console.log(counter.getCount()) // 1

// / 单例模式
const getSingle = (function() {
  let instance
  // 返回函数控制实例何时创建
  return function() {
    if(!instance) {
      instance = new Object()
    }
    return instance
  }
})()

const instance1 = getSingle()
const instance2 = getSingle()

console.log(instance1 === instance2)

// / 实现防抖和节流
function debounce(fn, delay) {
  let timer = null
  return function() {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      // 将this设置为当前的this
      fn.call(this)
      timer = null
    }, delay)
  }
}
function throttle(fn, delay) {
  let timer = null
  return function() {
    if(!timer) {
      timer = setTimeout(() => {
        fn.call(this)
        timer = null
      }, delay)
    }
  }
}

// / 模拟块级作用域
for(var i = 0; i < 10; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(j)
    })
  })(i)
}