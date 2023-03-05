function fib(n) {
  if(n == 1 || n == 2) {
    return 1;
  }
  return fib(n-1) + fib(n-2);
}

function fib2(n) {
  let res = [1, 1]
  if(n == 1 || n == 2) {
    return 1;
  }
  for(let i = 2; i < n; i++) {
    res[i] = res[i-1] + res[i-2];
  }
  return res[n-1];
}
