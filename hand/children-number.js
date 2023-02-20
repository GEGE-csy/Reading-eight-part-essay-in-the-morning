function childNum(num, count) {
  let players = [];
  for(let i = 0; i < num; i++) {
    players[i] = i+1;
  }
  console.log(players)
  // 退出的人数
  let exitNum = 0;
  // 当前报数
  let curCount = 0;
  // 当前下标
  let curIndex = 0;
  // 只剩最后一个人
  while(num - exitNum > 1) {
    // 不为0时才报数
    if(players[curIndex] !== 0) {
      curCount++;
    }
    // 当前报数 = 指定的数字
    if(curCount === count) {
      // 此人退出
      players[curIndex] = 0;
      curCount = 0;
      exitNum++;
    }
    curIndex++;
    // 保持循环
    if(curIndex === num) {
      curIndex = 0;
    }
  }
  for(let i = 0; i < num; i++) {
    if(players[i] !== 0) {
      return players[i]
    }
  }
} 

console.log(childNum(5, 3))
