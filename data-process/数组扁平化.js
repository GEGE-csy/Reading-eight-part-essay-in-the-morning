
let arr = [1, [2, 3, 4]]

// toString + split
function flatten1(arr) {
  // [1, [2, 3, 4]].toString() => '1,2,3,4'
  return arr.toString().split(',')
}

function flatten2(arr) {
  let result = []
  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      result = result.concat(flatten2(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}

console.log(flatten2(arr));
