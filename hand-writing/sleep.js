// js中没有内置的sleep函数
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}
// 暂停2s
sleep(2000).then(() => console.log('sleep end'))