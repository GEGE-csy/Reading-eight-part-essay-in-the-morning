// https://bigfrontend.dev/zh/problem/implement-basic-debounce

/*
Debounce是web应用中经常用到的技巧，通常情况下你应该使用现有的实现，比如lodash debounce() 。
你能够自己实现一个基本的debounce()吗？
比如，在debounce之前如下的调用
─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G 
经过3单位的debounce之后变为了
─ ─ ─ ─ ─ ─ ─ ─ D ─ ─ ─ ─ ─ ─ ─ ─ ─ G 
*/
/*
debounce竟然轻松通过了测试点，，定时器不为空时清空定时器，否则开启定时器执行函数
*/
function debounce(func, wait) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
      timer = null
    }, wait)
  }
}