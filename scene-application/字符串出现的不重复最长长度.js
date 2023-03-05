// 滑动窗口 'abcabcbb'
const lengthOfLongestSubstring = s => {
  // 保存滑动窗口的最大值
  let res = 0;
  // 滑动窗口左边界，假设右边界在数组[0]，滑动窗口长度就是0-（-1）=1
  let l = -1;
  let map = new Map();
  // 滑动窗口不断向右扩大右边界
  for(let i = 0; i < s.length; i++) {
    if(map.has(s[i])) { // 重复元素
      // 出现重复的，向右移动左边界
      // 不能直接赋值为map.get(s[i])，如果在后面出现重复的字母，但map里存的还是最开始的索引，那么会导致左边界回退，比如abba
      l = Math.max(l, map.get(s[i]));
    } 
    // i-l是当前的滑动窗口长度，滑动窗口如果遇到重复元素可能越变越小，因此要记得取最大的滑动窗口值
    res = Math.max(res, i-l);
    map.set(s[i], i)
  }
  return res;
}

console.log(lengthOfLongestSubstring('abcabcbb'))