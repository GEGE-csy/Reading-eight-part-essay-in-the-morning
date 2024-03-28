// https://bigfrontend.dev/zh/problem/implement-Array-prototype.flat

/*
Array.prototype.flat()可以用来扁平化数组。
你能够自己实现一个flat么？
const arr = [1, [2], [3, [4]]];
flat(arr) // [1, 2, 3, [4]]
flat(arr, 1) // [1, 2, 3, [4]]
flat(arr, 2) // [1, 2, 3, 4]
*/

function flat(arr, depth = 1) {
  let res = []
  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i]) && depth > 0) {
      res.push(...flat(arr[i], depth-1))
    } else {
      res.push(arr[i])
    }
  }
  return res
}
