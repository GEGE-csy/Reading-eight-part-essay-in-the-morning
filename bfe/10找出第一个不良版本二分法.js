//https://bigfrontend.dev/zh/problem/first-bad-version

/*
一个程序有多个版本，不知道什么时候开始有个bug混在其中。请你找到第一个坏掉的版本。
特定版本是否有bug，可以用isBad(revision)进行判定。
注意
传入的都是非负整数
如果没有找到，返回-1
*/
/// 二分法，但普通的for循环遍历也可以解
function firstBadVersion(isBad) {
  return (version) => {
    let l = 0, r = version
    while(l <= r) {
      let m = l + ((r-l) >> 1)
      if(isBad(m)) {
        r = m - 1
      } else {
        l = m + 1
      }
    }
    return isBad(l) ? l : -1
  }
}

