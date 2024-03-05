// 事件在一段时间内被触发多次，只会执行一次回调
function throttle(fn, delay) {
  let timer = null;
  return function() {
    if(!timer) {
      timer = setTimeout(() => {
        fn.call(this);
        timer = null;
      }, delay)
    }
  }
}
