// 柯里化是把接收多个参数的函数转变为接收一个参数的函数，并且还能返回接收剩余参数且返回结果的新函数
const add1 = (a,b,c) => {
  return a + b + c
}

const add2 = a => b => c => a + b + c

const add3 = a => {
  return b => {
    return c => {
      return a + b + c
    }
  }
}


console.log(add1(1,2,3));
console.log(add2(1)(2)(3));
console.log(add3(1)(2)(3));