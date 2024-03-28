// https://bigfrontend.dev/zh/problem/implement-debounce-with-leading-and-trailing-option

/*
该题目是6. 手写debounce()的延续，请先完成第6题。
本题目中你需要实现一个增强的debounce()，使其支持第三个参数option: {leading: boolean, trailing: boolean}
leading: 是否立即执行
trailing: 是否在冷却后执行
6. 手写debounce() 实际上是 {leading: false, trailing: true}的特殊情形。

具体说明
还是之前的3单位的例子来说明。
─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G 
用{leading: false, trailing: true}来debounce过后，我们得到：
─ ─ ─ ─ ─ ─ ─ ─ D ─ ─ ─ ─ ─ ─ ─ ─ ─ G
如果是{leading: true, trailing: true}的话：
─ A ─ ─ ─ ─ ─ ─ ─ D ─ ─ ─ E ─ ─ ─ ─ ─ ─ G
如果是{leading: true, trailing: false}：
─ A ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ E
如果是 {leading: false, trailing: false}，当然，什么都不会发生。
*/
function debounce(func, wait, option = {leading: false, trailing: true}) {
  let timer = null
  return function (...args) {
    /// 当函数立即执行了，就标记isInvoke为true，不要让它再进到定时器里延迟执行了
    let isInvoke = false
    /// 当leading为true，立即执行函数，注意还要判断timer为null => 不在冷却阶段
    if(timer === null && option.leading) {
      func.apply(this, args)
      isInvoke = true
    }
    
    clearTimeout(timer)
    timer = setTimeout(() => {
      /// 检查isInvoke为false
      if(option.trailing && !isInvoke) {
        func.apply(this, args)
      } 
      timer = null
    }, wait)
    
  }
}



