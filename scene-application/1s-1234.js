// 实现每隔1s打印1、2、3、4


/// let解决
// 如果用var会打印5 5 5 5
// for循环是同步代码会在主线程上先执行，定时器代码会进入任务队列，所以执行的时候i已经是5了（并且var块级作用域）
for(let i = 1; i <= 4; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}


/// 闭包解决
for(var i = 1; i <= 4; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(j)
    }, j * 1000)
  })(i)
}