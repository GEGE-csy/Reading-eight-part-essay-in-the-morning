function findMostWord(article) {
  article = article.toLowerCase();
  let wordList = article.match(/[a-z]+/g)
  let map = new Map();
  wordList.forEach(word => {
    if(!map.has(word)) {
      map.set(word, 1)
    }else {
      map.set(word, map.get(word)+1)
    }
  })
  let max = Math.max(...map.values());
  for(let entry of map.entries()) {
    if(entry[1] === max) {
      return `频率最大的单词：${entry[0]}，次数：${max}`
    }
  }
}
console.log(findMostWord("world22 world hello word hello2222 hello3 hello "))