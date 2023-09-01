global.number = 2;
var obj = {
	number: 3,
	db1: (function () {
		console.log('1', this); // global
		this.number *= 4;
		return function () { 
			console.log(this); 
			this.number *= 5;
		};
	})(),
};
var db1 = obj.db1;
db1();
obj.db1();
console.log(obj.number);
console.log(global.number);

/**
 * // 15
 * // 40
*/
/**
 * / obj.db1这个立即执行函数会直接调用，并且相当于由global(window)调用，number=2*4=8
 * / 执行完之后obj.db1 return一个function
 *
 * / db1()调用相当于也是由global(window)调用，在function中的this指向global，number=8*5=40
 * / 然后obj.db1()调用的时候，this指向obj，obj.number=3*5=15
*/