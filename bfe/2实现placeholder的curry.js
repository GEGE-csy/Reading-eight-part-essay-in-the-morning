// https://bigfrontend.dev/zh/problem/implement-curry-with-placeholder/watch

/*
请实现一个支持placeholder的curry()，可以像这样使用。
const  join = (a, b, c) => {
  return `${a}_${b}_${c}`
}
const curriedJoin = curry(join)
const _ = curry.placeholder
curriedJoin(1, 2, 3) // '1_2_3'
curriedJoin(_, 2)(1, 3) // '1_2_3'   1会填充到placeholder的对应位置
curriedJoin(_, _, _)(1)(_, 3)(2) // '1_2_3' 1填充到第一个_，3填充到最后一个_，2就填充到剩下的中间的_
*/
const  join = (a, b, c) => {
  return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)
const _ = curry.placeholder

curriedJoin(1, 2, 3,_,_) // '1_2_3'

curriedJoin(_, 2)(1, 3) // '1_2_3'

console.log(curriedJoin(_, _, _)(1)(_, 3)(2)) // '1_2_3'

function curry(fn) {
	return function curried(...args) {
    // 比如(1,2,3_,_)截取出来参数是1,2,3满足条件
    // (1,_2,3)这种就是还不满足的，满足条件才能直接调用fn
		const isExpectArgsEnough =
			args.length >= fn.length &&
			args.slice(0, fn.length).every(item => item !== curry.placeholder);
		if (isExpectArgsEnough) {
			return fn.apply(this, args);
		} else {
      /// 这边还是要返回一个curried函数继续调用，但注意参数需要合并
			// 比如curriedJoin(_,_,1,2)(3,_)，前面的参数args(_,_,1,2)，curriedJoin(_,_,1,2)返回一个新函数，它收到的新传入的参数newArgs(3,_)
      // 要把参数进行合并 => (3,_,1,2)再传入curried
			return function (...newArgs) {
				let finalArgs = [];
				let i = 0,j = 0;
        // (_,_,1,2) (3,_) => finalArgs(3,_,1,2)
				while (i < args.length && j < newArgs.length) {
					if (args[i] === curry.placeholder) {
						finalArgs.push(newArgs[j]);
						i++, j++;
					} else {
						finalArgs.push(args[i]);
						i++;
					}
				}
				while (i < args.length) {
					finalArgs.push(args[i]);
					i++;
				}
				while (j < newArgs.length) {
					finalArgs.push(newArgs[j]);
					j++;
				}
				return curried(...finalArgs);
			};
		}
	};
}

curry.placeholder = Symbol();
