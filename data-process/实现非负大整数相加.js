function sumBigNumber(a, b) {
  let res = '';
  let temp = 0;
  
  a = a.split('');
  b = b.split('');
  
  while (a.length || b.length || temp) {
    // temp如果在下面为true，这里加法就会隐式转成1
    temp += ~~a.pop() + ~~b.pop();
    // 将当前位加进去，比如10要进位，就将0加进去。假如是9不用进位，就将9加进去。
    res += temp % 10;
    // temp如果大于9说明要进位
    temp = temp > 9
  }
  return res
}

