// 事件在一段时间内被触发多次，只会执行一次回调
function throttle(fn, delay) {
	let timer = null;
	let stashed = null;
	const startCooling = () => {
		timer = setTimeout(() => {
			timer = null;
			if (stashed !== null) {
				fn.apply(stashed[0], stashed[1]);
				stashed = null;
			}
		}, delay);
	};
	return function (...args) {
		if (!timer) {
			fn.apply(this, args);
			startCooling();
		} else {
			stashed = [this, args];
		}
	};
}
