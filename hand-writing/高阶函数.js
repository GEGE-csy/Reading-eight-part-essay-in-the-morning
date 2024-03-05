Array.prototype.forEach = function(callback) {
  if(!(callback instanceof Function)) {
    throw new TypeError(callback + 'is not a function')
  }
  const arr = this, thisArg = arguments[1] || window
  for(let i = 0; i < arr.length; i++) {
    callback.call(thisArg, arr[i], i, arr)
  }
}

Array.prototype.map = function(callback) {
  if(!(callback instanceof Function)) {
    throw new TypeError(callback + 'is not a function')
  }
  const arr = this, thisArg = arguments[1] || window
  let res = []
  for(let i = 0; i < arr.length; i++) {
    res.push(callback.call(thisArg, arr[i], i, arr))
  }
  return res
}

Array.prototype.filter = function(callback) {
  if(!(callback instanceof Function)) {
    throw new TypeError(callback + 'is not a function')
  }
  const arr = this, thisArg = arguments[1] || window
  let res = []
  for(let i = 0; i < arr.length; i++) {
    if(callback.call(thisArg, arr[i], i, arr)) {
      res.push(arr[i])
    }
  }
  return res
}
Array.prototype.every = function(callback) {
  if(!(callback instanceof Function)) {
    throw new TypeError(callback + 'is not a function')
  }
  const arr = this, thisArg = arguments[1] || window
  for(let i = 0; i < arr.length; i++) {
    if(!(callback.call(thisArg, arr[i], i, arr))) {
      return false
    }
    return true
  }
}

const arr = [1,2,3]
const a = arr.every(function(item, i, arr) {
  return item>0
}, [1,2,3,4,5])
console.log(a)