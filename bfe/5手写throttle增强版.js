// https://bigfrontend.dev/zh/problem/implement-throttle-with-leading-and-trailing-option

/*
该题目是4. 手写throttle()的后续，请先完成第4题。
本题目中你需要实现一个增强的throttle()，使其支持第三个参数option: {leading: boolean, trailing: boolean}
leading: 是否立即执行
trailing: 是否在冷却后执行
4. 手写throttle() 实际上是 {leading: true, trailing: true}的特殊情形。

同样地按照之前的3单位的throttle来举例。
─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G 
用{leading: true, trailing: true}来throttle后，我们得到
─ A ─ ─ ─ C ─ ─ ─ D ─ ─ ─ ─ E ─ ─ ─ G 
如果是 {leading: false, trailing: true}，A 和 E 被跳过了
─ ─ ─ ─ C ─ ─ ─ D ─ ─ ─ ─ ─ ─ ─ G 
如果是 {leading: true, trailing: false}，只有 A D E 被保留
─ A ─ ─ ─ ─ D ─ ─ ─ ─ ─ ─ E
如果是 {leading: false, trailing: false}，显而易见，什么都不会发生
*/
function throttle(func, wait, option = { leading: true, trailing: true }) {
	let timer = null;
	let stashed = null;
	const startCooling = () => {
		timer = setTimeout(() => {
			timer = null;
      /// 此处多加一个判断，如果trailing为false，冷却后也不会执行暂存的
			if (stashed !== null && option.trailing) {
				func.apply(stashed[0], stashed[1]);
				stashed = null;
				startCooling();
			}
		}, wait);
	};

	return function (...args) {
		if (timer !== null) {
			stashed = [this, args];
		} else {
      /// 如果定时器为空，表明不在冷却阶段，要先判断leading，若为false，不立即执行，走暂存的那条判断
			if (option.leading) {
				func.apply(this, args);
				startCooling();
			} else {
				stashed = [this, args];
				startCooling();
			}
		}
	};
}
