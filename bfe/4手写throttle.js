// https://bigfrontend.dev/zh/problem/implement-basic-throttle

/*
Throttle是web应用中经常用到的技巧，通常情况下你应该使用现有的实现，比如lodash throttle() 。
你能够自己实现一个基本的throttle()吗？
再次说明一下，throttle(func, delay)返回一个function，这个function无论多么频繁地调用，原始的func的调用也不会超过指定的频率。
比如，这是throttle之前的调用
再次说明一下，throttle(func, delay)返回一个function，这个function无论多么频繁地调用，原始的func的调用也不会超过指定的频率。
比如，这是throttle之前的调用
─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G
按照3个单位进行throttle过后
─ A ─ ─ ─ C ─ ─ ─D ─ ─ ─ ─ E ─ ─ ─ G 
注意到
A因为不在任何的冷却时间，所以立即被执行
B被跳过了，因为B和C都在A的冷却时间里。
*/

/*
  * 是否在冷却(定时器不为空说明在冷却) => 在冷却，则暂存一下当前的执行上下文和参数
                                    => 不在冷却，则从暂存区取出来执行，然后开一个新定时器

  *                 
*/
function throttle(func, wait) {
  let timer = null
  let stashed = null
  // 开启冷却：开启一个定时器，将暂存的拿出来执行，然后再次启动冷却      
  const startCooling = () => {
    timer = setTimeout(() => {
      timer = null // 执行计时器内函数立刻清空timer
      if(stashed !== null) {
        func.apply(stashed[0], stashed[1])
        stashed = null
        startCooling()
      }
    }, wait)
  }
  return function(...args) {
    if(timer !== null) {      // 在冷却阶段
      stashed = [this, args] // 暂存一下当前的执行上下文和参数
    } else {  // 不在冷却阶段，就直接执行函数，并开启冷却
      func.apply(this, args)
      startCooling()
    }
  }
}

