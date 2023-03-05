// 生成n~m之间的随机整数：Math.round(Math.random() * (m-n)) + n
let arr = [1,2,3,4,5,6,7,8,9,10]
for(let i = 0; i < arr.length; i++) {
  // 取出一个随机索引值，范围在i ~ arr.length -1 之间
  const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
  // 将随机索引值和当前值交换
  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
}
