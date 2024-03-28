// https://bigfrontend.dev/zh/problem/can-you-shuffle-an-array

/*
能否手写一个shuffle() ?
当传入一个数组的时候，shuffle()需要更换元素的顺序，每一种最终的数列都需要被相等的概率生成。
比如
const arr = [1, 2, 3, 4]
以上的数组共有4! = 24 中不同的排列
你写的 shuffle() 需要按照相同的概率(1/24)来返回上述排列中的一种。
*/
function shuffle(arr) {
  for(let i = 0; i < arr.length; i++) {
    let randomIndex = Math.floor(Math.random()* (arr.length - i)) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
  }
}
