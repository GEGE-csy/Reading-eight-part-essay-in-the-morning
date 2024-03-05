// 事件触发后要过一段时间才会执行回调，这段时间内如果再次触发，则重新计时
function debounce(fn, delay) {
  let timer = null;
  return function() {
    if(timer) {
      clearTimeout(timer);   
    }
    timer = setTimeout(() => {
      fn.call(this);
      timer = null;
    }, delay)
  }
}

