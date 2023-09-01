var friendName = 'World';
(function() {
  if (typeof friendName === 'undefined') {
    var friendName = 'Jack';
    console.log('Goodbye ' + friendName);
  } else {
    console.log('Hello ' + friendName);
  }
})();

// Goodbye Jack
/**
 * / var friendName = 'Jack';会提升到立即执行函数的作用域顶部，
 *  var friendName;
    if (typeof friendName === 'undefined') {
      friendName = 'Jack';
      console.log('Goodbye ' + friendName);
    }
 * 
 */