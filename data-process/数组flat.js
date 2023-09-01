let arr = [1, [2, [3, 4]]]

// depth是展开数组的深度
function _flat(arr, depth) {
  // 对比数组扁平化多了这一个判断，注意返回的是arr不是result
  if(depth === 0) {
    return arr
  }
  let result = []
  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      result = result.concat(_flat(arr[i], depth - 1))
    } else {
      result.push(arr[i])
    }
  }
  return result
}

console.log(_flat(arr, 1))
console.log(arr.flat(1))


