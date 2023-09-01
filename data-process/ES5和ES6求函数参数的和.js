// es5
function sum() {
  let sum = 0
  let arr = Array.from(arguments)
  return arr.reduce((a, b) => a+b)
}


// es6
function sum(...rest) {
  return rest.reduce((a, b) => a+b)
}

console.log(sum(1,2,3,4,5))