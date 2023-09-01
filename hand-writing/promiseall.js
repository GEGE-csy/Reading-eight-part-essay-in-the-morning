// 全部成功，才成功，返回成功值的数组，并且是按顺序的
// 有一个失败就失败
function promiseAll(promises) {
	// 记录成功值
	let resolveResult = [];
	// 记录有多少个promise改变了状态
	let resolveCnt = 0;
	return new Promise((resolve, reject) => {
		for (let i = 0; i < promises.length; i++) {
			promises[i].then(
				value => {
					resolveCnt++;
					// 这里不能用push！！！！！promise并不是按照数组顺序改变状态的，如果用push会导致是按照成功的顺序进数组
					resolveResult[i] = value;
					// 这里一定要有判断，全部promise都成功了才能返回
					if (resolveCnt === promises.length) {
						resolve(resolveResult);
					}
				},
				reason => {
					reject(reason);
				}
			);
		}
	});
}


// test
let p1 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve(1);
	}, 1000);
});
let p2 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve(2);
	}, 2000);
});
let p3 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve(3);
	}, 3000);
});
promiseAll([p3, p1, p2]).then(res => {
	console.log(res); // [3, 1, 2]
});
