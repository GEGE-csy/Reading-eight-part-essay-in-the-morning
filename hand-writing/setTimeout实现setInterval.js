function mySetInterval(fn, millisec){
  function interval(){
    fn();
    setTimeout(interval, millisec);
    
  }
  setTimeout(interval, millisec)
}

function test() {
  console.log(1)
}
mySetInterval(test, 1000)