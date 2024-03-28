// https://bigfrontend.dev/zh/problem/decode-message

/*
在一个字符串的二维数组中，有一个隐藏字符串。
I B C A L K A
D R F C A E A
G H O E L A D 
可以按照如下步骤找出隐藏消息
1.从左上开始，向右下前进
2.无法前进的时候，向右上前进
3.无法前进的时候，向右下前进
4.2和3的重复
无法前进的时候，经过的字符就就是隐藏信息
比如上面的二维数组的话，隐藏消息是IROCLED
注：如果没有的话，返回空字符串
*/
/// 取值上x轴从左到右是一直走到底的不会变，y轴上会从上到下，达到底部又从下到上，到顶部再从上到下...
function decode(message) {
  if(message.length === 0) return ''
  if(message[0].length === 0) return ''
  let str = ''
  let i = 0, j = 0
  let rows = message.length, cols = message[0].length
  /// 注意directionY，控制从上到下还是从下到上
  let directionY = 1
  /// 所以循环的结束条件设成横轴的长度即可
  while(j < cols) {
    str += message[i][j]
    i += directionY
    j++
    // 到底部，转向
    if(i > rows -1) {
      directionY = -1
      i -= 2
    }
    // 到顶部，转向
    if(i < 0) {
      directionY = 1
      i += 2
    }
  }
  return str
}



