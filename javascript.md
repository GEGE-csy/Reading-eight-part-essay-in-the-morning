# 1.js 有哪些数据类型？

8 种：Undefined、Null、Number、String、Boolean、Symbol、BigInt、Object

# 2.说一说 BigInt 和 Symbol？

- BigInt 和 Symbol 是 es6 新增的数据类型
- BigInt 和 Symbol 都是通过函数创建的
- Symbol 表示一个独一无二的值，它可以用作对象属性名，避免对象属性名冲突
- BigInt 是一种数字类型，一般用于存储和操作大整数，如果某个数超出了 Number 能表示的安全整数范围，就可以使用 BigInt 来操作
  (Number 表示-2^53 ~ 2^53)

# 3.原始类型和引用类型的理解？

原始类型和引用类型的区别在于存储位置的不同：

- 原始类型是直接存储在栈中的简单数据段，占据空间小，大小固定
- 引用类型是存储在堆中的对象，占据空间大，大小不固定。
  引用类型在栈中存储的是对象在堆中的引用地址
  访问引用类型时，会先检索在栈中的地址，再根据地址找到堆中的实体

# 4.判断数据类型的方法

1. typeof：能判断所有的基本类型和函数
   不能准确判断 null、对象、数组（都会返回 object）
2. instanceof：能判断引用类型，不能判断基本类型(包装过的话可以,new String('123')这种)
   [] instanceof Array
   内部运行机制是判断该构造函数(右)的原型对象在不在实例对象(左)的原型链上
3. constructor：可以判断基本类型和引用类型，（每个对象原型都会有的 constructor 属性，同样也是一个指针，指向了构造函数本身
   (2).constructor === Number
   [].constructor === Array
4. Object.prototype.toString.call()
   Object.prototype.toString.call(123) // 'Number'
   Object.prototype.toString.call([]) // 'Array'

# 5.判断数组的方式

- [] instanceof Array
- [].constructor === Array
- Object.prototype.toString.call([]) === 'Array'
- Array.isArray([]) // es6 新增的原型方法

# 6.null 和 undefined 的区别

Undefined 和 Null 都是基本数据类型，它们都只有一个值，就是 undefined 和 null

- undefined 代表未定义，声明了变量但还没有定义的时候会返回 undefined
- null 代表空对象，主要用于初始化一些可能会返回对象的变量

# 7.typeof null 的结果是什么，为什么？

typeof null = Object
对象在底层保存为二进制，js 中二进制前 3 位都是 0 会被判断为 Object 类型
null 的二进制表示为全 0，所以会被判定为 Object

# 8.typeof NaN 的结果

typeof NaN = **Number**
NaN 是唯一一个非自反值，NaN !== NaN

# 9.为什么 0.1+0.2!==0.3

计算 0.1+0.2 的时候会被转成二进制计算，0.1 和 0.2 的二进制是无限循环的数
而 js 提供的有效数字最长为 53 个二进制位，后面的位数会被全部截掉，导致精度丢失

# 10.那么如何判断 0.1+0.2=0.3

可以设置一个误差范围，利用 **Number.EPSILON** 值，是 js 能表示的最小精度，大小是 **2^-52**
判断如果 0.1+0.2-0.3 是否小于 Number.EPSILON，如果小于就可以判断 0.1+0.2=0.3

# 11.|| 和 && 操作符的返回值

先对第一个操作数进行条件判断，如果不是布尔值就转为布尔值

- 对于||来说，如果第一个操作数判断为 true 就返回第一个操作数，否则第二个操作数
- 对于&&来说，如果第一个操作数判断为 true 就返回第二个操作数，否则第一个操作数
  ⚠️：不会返回条件判断的结果！！！返回的是操作数

# 12.什么是 js 中的包装类型？

js 中的基本数据类型是没有属性和方法的
但是 js 中的字符串、数值、布尔值在使用时又可以调用一些方法和属性
这是因为这几个类型在 js 底层会使用 `Object()` 函数进行包装
比如在调用字符串的 length 时，js 会隐式将基本类型转为包装类型

我们也可以使用 Object 函数显式地将基本类型转为包装类型
Object('abc') // String {'abc'}

还可以使用`valueOf()`将包装类型转回基本类型
const abc = Object('abc')
abc.valueOf() // 'abc'

# 13. Object.assign 和扩展运算符是深拷贝还是浅拷贝

都是**浅拷贝**
扩展运算符：

```js
let obj = {
	inObj: { a: 1, b: 2 },
};
// 利用扩展运算符拷贝obj对象
let newObj = { ...obj };
newObj.inObj.a = 2;

console.log(newObj); // { inObj: { a: 2, b: 2 } }
// 原对象也跟着改变
console.log(obj); // { inObj: { a: 2, b: 2 } }
```

Object.assign()：

```js
let obj = {
	inObj: { a: 1, b: 2 },
};
let newObj = Object.assign({}, obj);
newObj.inObj.a = 2;

console.log(newObj); // { inObj: { a: 2, b: 2 } }
// 原对象也跟着改变
console.log(obj); // { inObj: { a: 2, b: 2 } }
```

# 14.js 中的隐式类型转换

- **转换为 boolean 类型**
  只有 0、""、undefined、null、NaN 为 false，其他均为 true
- **转换为 number 类型**
  ""=>0
  非空字符串有除了数字以外=>NaN
  **null=>0**
  **undefined=>NaN**
- **转换为 string 类型**
  null=>'null'
  undefined=>'undefined'
  true=>'true'
  false=>'false'

对象转换成基本类型的时候会调用 ToPrimitive(hint)来指定目标类型
(以下是对象转成 number 和 string 类型要经历的步骤)

- hint 为 number
  先调用对象的 valueOf()，若为**原始值**则返回，否则下一步
  再调用对象的 toString()，若为原始值则返回，否则下一步
  抛出异常
- hint 为 string
  先调用对象的 toString()，若为原始值则返回，否则下一步
  再调用对象的 valueOf()，若为原始值则返回，否则下一步
  抛出异常

调用 valueOf()返回的结果：

- Boolean => 布尔值
- Number => 数字值
- String => 字符串值
- Array => 数组本身
- Function => 函数本身
- Object => 对象本身
  undefined、null 对象没有 valueOf()

调用 toString()返回的结果：

- Boolean => 'true'/'false'
- Number => 数字转成的字符串
- String => 字符串本身
- Array => 用逗号分隔数组每个元素形成的字符串
- Function => 函数的文本定义
- Object => '[object Object]'
  如果是 new 关键字+内置对象创建的 Object 类型，调用 toString()会先转成对应的基本类型再调用 toString()
  new String('abc').toString() // 'abc'

# 15. !符号转换规则

`!`会将后面的数据先转成布尔值，然后取反

```js
console.log(!!{}); // true
// {} => true（除了null其他对象都为true）
console.log(!!null); // false
```

# 16. == 符转换规则

**当我们使用==操作符进行比较时，若两边类型相同，并且比较的是两个对象，则比较两个对象的指针是否指向同一个对象**

**当我们使用==操作符进行比较时，若两边类型不同，则两边都尝试转成 number 类型**

```js
const a = "123";
console.log(a == false); // false，a => 123，false => 0
```

```js
const a = new String(123); // 注意a是Object类型
console.log(a == 123); // true
// a要转成number类型，a.valueOf() => "123"，"123"为原始值直接返回
// "123" == 123 => 123 == 123
```

```js
const a = {};
console.log(a == 1); // false
// a.valueOf() => {}，{}不是原始值，继续调用toString()
// {}.toString() => "[object Object]"
// 也就是"[object Object]" == 1 => NaN == 1
```

```js
console.log([] == ![]); // true
// !优先级比==高，所以先转换右边，[]转成布尔值为true，取反为false，false=>0
// 再转换左边，[].valueOf() => []，不是原始值，继续调用[].toString() => ''
// '' == 0 => 0 == 0 => true
```

# 16.比较运算符 > < 转换规则

如果两边都是 string 类型，不进行类型转换
如：
`console.log('666' < '7') // true`
而是逐位比较 ascii 码（数字<大写字母<小写字母），比较到不同的就直接返回结果
这里就是第一位 6 小于 7，直接返回了 true 不会继续比较了

否则两边都会转换为 number 类型再进行比较

# 17.+ 运算符转换规则

- 操作单操作数的时候，会将这个数转为数字类型

```js
let a = "6";
console.log(+a); // 6
```

- 操作两个操作数的时候
  - 1.如果左右都是 number 类型，直接相加
  - 2.如果左右任一是 string 类型，另一个也转成 string 类型，然后拼接
  - 3.上面两个都不满足，则左右都会隐式转为 number 类型，再相加
    例如`[1,2,3]+4`：
    不满足 1、2
    左边是对象转为 number 类型，`[1,2,3].valueOf()` = `[1,2,3]`，返回的不是原始值，继续调用`toString()`
    `[1,2,3].toString()` = `'1,2,3'`
    也就转换成了`'1,2,3'+4`，左边是字符串了，满足 2，将右边也转为字符串
    得到`'1,2,34'`

# 18.let、const、var 的区别

1. 作用域：
   let、const 块级 作用域
   var 函数作用域
2. 变量提升：
   let、const 没有变量提升
   var 有变量提升
3. 重复声明：
   let、const 不可以
   var 可以
4. 暂时性死区：
   let、const 有，**使用 let、const 声明的地方到块极作用域顶部形成暂时性死区，暂时性死区内使用该变量都会报错**
   var 没有
5. 设置初始值：
   var、let 不用设置初始值
   const 必须设置

# 19.const 定义的变量可以修改吗？

- 定义的是基本数据类型，不能修改
- 定义的是复杂数据类型，可以修改

const 保证的其实是**变量指向的内存地址所保存的数据**不能改变，
对于基本数据类型，基本类型的值就保存在变量指向的内存地址
对于复杂数据类型，变量指向的内存地址保存的只是复杂类型在堆中的地址，const 只能保证这个地址不变，不能保证这个地址指向的实体变不变

# 20.箭头函数和普通函数的区别

- 箭头函数是匿名函数，普通函数可匿可不匿
- 箭头函数没有自己的 this，它内部的 this 是它上层作用域的 this
- 箭头函数没有原型`prototype`，`__proto__`，`arguments`
- 箭头函数不能作为构造函数
- call()、apply()、bind()等方法不能改变箭头函数中 this 的指向

# 21.扩展运算符的作用

- 对象的扩展运算符
  用于取出对象中的属性，拷贝到另一个对象中

- 数组的扩展运算符
  - 将数组转成参数序列
  - 复制数组
  - 合并数组

# 22.对 rest 参数的理解

rest 参数就是把扩展运算符用在函数形参上
它可以把参数序列整合成一个数组：

```js
function multiple(...args) {
	console.log(args); // [1,2,3,4]
}
multiple(1, 2, 3, 4);
```

可以用来获取函数的多余参数，用来**处理函数参数个数不确定**的情况

# 23.new 操作符的执行过程

1. 创建一个新的空对象
2. 将新对象的原型设置成构造函数的 prototype 对象
3. 让构造函数的 this 指向新对象，执行构造函数的代码
4. 判断构造函数的返回值类型，如果是值类型，返回新对象，如果是引用类型，就直接返回引用类型的对象
   (第四步为什么这样返回呢？因为构造函数本来就是这样。。。)
   构造函数可以没有返回值，默认返回 undefined，new 就默认返回实例化对象
   如果返回的是 number、boolean、string 这种基本类型，也是返回实例化对象
   但如果构造函数直接返回了一个对象，那么 new 就会返回这个对象

```js
function objFactory() {
	//1.创建一个空对象
	let newObj = null;
	// 取出构造函数
	let constructor = Array.prototype.shift.call(arguments);
	//2.将空对象的原型设置为构造函数的原型对象
	newObj = Object.create(constructor.prototype);
	//3.将构造函数的this指向新对象，并执行构造函数
	let result = constructor.apply(newObj, arguments);
	//4.判断构造函数的返回值类型，如果返回的是值类型，则返回新对象。如果是引用类型，则返回引用类型
	let returnType = typeof result === "object" || typeof result === "function";
	return returnType ? result : newObj;
}

objFactory(构造函数, 初始化参数);
```

# 24.map 和 object 的区别

- 键的类型
  map 的键可以是任意值，包括函数、对象等等
  object 的键必须是 string 或 symbol

- 键的顺序
  map 的键是有序的
  object 的键是无序的

- 获取键值对的数目
  map 的键值对个数可以通过 size 属性获取
  object 的键值对个数只能手动计算

- 是否可迭代
  map 可迭代
  object 需要获取它的键才能迭代

- 性能
  map 频繁增删键值对时性能更好

# 25.怎么遍历 map

map 提供了三个遍历器生成函数和一个遍历方法：

- keys()
  `for (let key of map.keys()) {}`
- values()
  `for (let value of map.values()) {}`
- entries()
  `for (let items of map.entries()) {}`
  `// ["foo", 1] ["bar", 2]`
- forEach()
  `map.forEach((value, key, map) => {})`

# 26.map 和 weakMap 的区别

- map 可以任意类型作为 key，weakMap 只接受对象作为 key
- weakMap 的键名引用的对象都是弱引用，不会被垃圾回收
  （垃圾回收机制：创建变量的时候自动分配了内存，不使用变量时内存会自动释放）

# 27.对 json 的理解

json 是一种数据格式，经常使用 json 作为前后端数据交换的方式
前端将符合 json 格式的数据序列化为 json 字符串，然后传递到后端
后端将 json 格式的字符串解析成 json 对象

- JSON.stringify()：JSON 对象转为 JSON 字符串
- JSON.parse()：JSON 字符串转为 JSON 对象

# 28.js 脚本延迟加载的方式？

延迟加载：等页面加载完再加载 js 文件

- defer 属性：
  文档解析和脚本加载同步，但会在文档解析完再执行脚本，不会阻塞页面解析
  多个 defer 按顺序执行
- async 属性：
  文档解析和脚本加载同步，但脚本加载完之后立即执行脚本，如果此时页面还没解析完，会阻塞页面解析
  多个 async 无顺序
- 动态创建 script 标签
  监听文档加载完再动态创建 script 标签来引入 js
- 将 js 脚本放在文档底部，最后加载

⚠️：不加 defer/async，普通的 script 标签如果要**加载**js 是会阻塞解析 html 的，
加了 defer/async，可以保证**加载**js 不阻塞解析 html
同时 defer 还能保证**执行**js 也不阻塞解析 html，但 async 无法保证执行 js 不阻塞解析 html

# 29.js 的类数组对象

一个有 length 属性和一些索引属性的对象
常见的类数组对象有 arguments 和一些 dom 方法返回的结果

类数组转为数组的方法：

- Array.prototype.slice.call(arrayLike)
- Array.prototype.splice.call(arrayLike, 0)
- Array.from(arrayLike)

# 30. 数组有哪些原生方法

转成字符串：join()
操作首部：unshift()和 shift()
操作尾部：push()和 pop()
重排序：reverse()和 sort()
截取：slice()
插入删除：splice()
迭代：every()、some()、filter()、map()、forEach()

# 31. ASCII、Unicode、UTF-8、UTF-16、UTF-32

ASCII 码定义了一种从**二进制到字符**的映射，
字符包括英文字母 a-z 的大小写，数字 0-9 和一些常见符号
ASCII 码能表示的字符有限，因为**只能使用 7 位/8 位（后 128 个字符是扩展 ASCII 码）二进制数**

**Unicode 和 ASCII 之间主要区别是编码的位数不同**，Unicode 是 ASCII 的超集
Unicode 是一个字符集，由许多代码点组成，
我理解的代码点就是跟字符对应的代码值，大量字符映射成了不同的键，这些键就是代码点
比如 U+0041 就是字符 A 的代码点

Unicode 的编码方式就有 UTF-8，UTF-16，UTF-32 等
**Unicode、UTF-8、UTF-16、UTF-32 区别：**
Unicode 是一个字符集，但是 UTF-8，UTF-16，UTF-32 是编码方式
UTF-8（占用 1-4 字节） 和 UTF-16 （占用 2-4 字节）是可变长度编码，
UTF-32 是固定长度编码（每个字符占 4 个字节）

# 32. 函数的 arguments 参数

arguments 是类数组对象
遍历 arguments：

1. `Array.prototype.forEach.call(arguments, item => { console.log(item) })`
2. `const arrArgs = Array.from(arguments)`
3. `const arrArgs = [...arguments]`

# 33. 什么是 DOM 和 BOM

DOM 是文档对象模型，指把文档当成一个对象，这个对象定义了处理网页的方法
BOM 是浏览器对象模型，指把浏览器当成一个对象，这个对象定义了和浏览器交互的方法

# 34.escape()、encodeURI()、encodeURIComponent() 的区别

- escape 是对字符串进行编码，encodeURI 和 encodeURIComponent 是对 url 进行编码
- encodeURIComponent 的编码范围比 encodeURI 的编码范围大
  比如`https://www.baidu.com`，encodeURIComponent 会将`/`也编码了，但 encodeURI 不会
  所以如果要使用这个 url，要用 encodeURI 而不是 encodeURIComponent

# 35.对 ajax 的理解

ajax 是一种技术，能够和服务器交换数据并更新网页的部分内容，并且不用刷新网页

实现一个 ajax 请求：

- new 一个 XMLHttpRequest 对象
- 调用对象的 `open()`方法，传递参数设置请求类型，请求地址
- 调用对象的`setRequestHeader()`为对象添加头信息
- 给对象添加状态监听函数，XMLHttpRequest 对象有 5 个状态，状态改变的时候会触发 onreadystatechange 事件
  当 readyState 变为 4 的时候表示服务器返回的数据接收完成，可以判断状态码来获取数据
- 调用对象的`send()`方法向服务器发送请求，可以传入参数作为请求体

# 36.js 为什么要进行变量提升

变量声明提升的原因是：
**js 在执行代码之前有一个解析的过程**，解析阶段会检查语法并对函数进行预编译，**将即将执行的变量赋值为 undefined**

这样做可以提高性能，因为解析过程只进行一次，不然每次执行代码前都要重新解析一次变量和函数

# 37.什么是尾调用，好处？

指在函数的最后一步调用另一个函数
代码执行是基于执行栈的，当在一个函数里调用另一个函数时，会保留当前的执行上下文，再新建一个执行上下文加入栈中
但如果使用尾调用，因为是函数的最后一步，所以这时可以不用保留当前的执行上下文，节省了内存

# 38.use strict 是什么意思？使用它区别是什么？

use strict 是一种 es5 添加的运行模式，这种模式可以让 js 在更严格的条件下运行
区别：
变量必须声明才能使用（正常模式下一个变量没有声明就赋值默认是全局变量
全局作用域中定义的函数中的 this 为 undefined

# 39.强类型语言和弱类型语言的区别

强类型语言：强制类型定义，一个变量指定了某个类型之后如果不经过强制转换，它的类型不会改变
弱类型语言：变量类型可以被忽略，比如在 js 中字符串“12”和整数 3 相加就会进行连接得到字符串“123”

强类型语言在速度上<弱类型语言，但是强类型语言能避免不必要的错误

# 40.编译型语言和解释型语言的区别

编译型语言：

- 编译器一次性把源代码编译成一个可执行程序，之后直接运行这个可执行程序就行，不需要重复编译
- 一般编译出来的可执行程序不能跨平台
- 代表语言 c、c++等

解释型语言：

- 解释器把源代码一行一行的翻译成特定平台的机器码，不会生成可执行程序
- 解释型语言一般可以跨平台
- 代表语言 javascript、python 等

# 41.for...in 和 for...of 的区别

for...of 是 es6 新增的遍历方式，遍历有 iterator 接口的数据结构
（数组、类数组、字符串、map 等等等，但普通对象不行）

- for...in 获取的是键名，for...of 获取的是键值
- for...in 会遍历对象的整个原型链，性能差。for...of 只会遍历当前对象不会遍历原型链
- for...in 遍历数组，会返回数组中所有可枚举的属性(包括原型链上的)，for...of 返回的是数组索引对应的值

```js
const arr = [1, 2, 3];
arr.name = "222";
Array.prototype.age = 20;

for (let value of arr) {
	console.log(value); // 1 2 3
}
for (let index in arr) {
	console.log(arr[index]); // 1 2 3 '222' 20
}
```

# 42. ajax、axios、fetch 的区别

ajax 是一个技术统称，包括了很多技术，XMLHttpRequest 只是实现 ajax 的一种方式
fetch 是一个 api，使用了 promise，它是 XMLHttpRequest 的替代品
axios 是一个库，使用 promise 对 XMLHttpRequest 进行了封装

关系：

- ajax
  - fetch
  - xhr
    - axios

# 43. 对原型的理解

每个构造函数都有一个 prototype 属性，属性值是一个对象，这个对象就是构造函数的原型，
这个对象的所有属性和方法都可以被构造函数的实例共享。
（所有原型还会有一个 constructor 属性，也是一个指针，指回了原型所在的构造函数）
当使用构造函数新建一个实例对象后，这个实例对象会有一个`__proto__`属性，指向了构造函数的原型，这个是对象的原型
一般对象的原型不要直接使用属性获取，可以使用 Object.getPrototypeOf()方法来获取

# 44. 对原型链的理解

访问一个对象的属性时，如果这个对象身上没有这个属性，就会去它的原型对象上查找这个属性
它的原型对象也会有自己的原型对象，这样一层一层向上查找形成的链式结构就是原型链
一直找找到匹配的属性或者到达原型链的终点 `Object.prototype.__proto__`，就不会继续找了，返回一个 null

# 45. 原型的修改和重写

修改原型：
在原型上直接添加属性和方法

```js
function Person(name) {
	this.name = name;
}
Person.prototype.getName = function () {};
let p = new Person("poem");
console.log(Person.prototype.constructor === Person); // true
```

重写原型：
用新对象覆盖原来的
此时的 Person.prototype 指向一个新对象，新对象上根本没有 constructor 属性，就会顺着原型链向上找
然后找到 Object 上有 constructor 属性

```js
function Person(name) {
	this.name = name;
}
Person.prototype = {
	getName: function () {},
};
let p = new Person("poem");
console.log(Person.prototype.constructor === Person); // false
console.log(Person.prototype.constructor === Object); // true

// 重写原型一定要要把constructor指回来！！
Person.prototype.constructor = Person;
console.log(Person.prototype.constructor === Person); // true
console.log(Person.prototype.constructor === Object); // false
```

# 46. 原型链指向

好无聊的题。。

```js
p.__proto__; // Person.prototype
Person.prototype.__proto__; // Object.prototype
p.__proto__.__proto__; // Object.prototype
p.__proto__.constructor.prototype.__proto__; // Object.prototype
Person.prototype.constructor.prototype.__proto__; // Object.prototype
p.__proto__.constructor; // Person
Person.prototype.constructor; // Person
```

# 47. 原型链的终点？如何打印终点？

终点是 `Object.prototype.__proto__`
= null

# 48. 继承

子类要拥有父类的全部属性和方法，同时子类还能定义自己特有的属性和方法
实现继承：

- es6 使用 extends 关键字，

- 原型链继承
  父类的共享方法和属性都在父类的原型对象上，
  将子类的原型指向父类的实例对象，就可以通过父类的实例对象间接访问到父类的原型对象
  Child.prototype = new Parent()
  要将 Child.prototype.constructor 指回原来的构造函数
- 构造函数继承
  定义一个父构造函数和子构造函数，子构造函数通过 call()继承父构造函数的属性
  缺点：不能继承父类原型上的属性和方法
  ```js
  function Father(name, age) {
  	this.name = name;
  	this.age = age;
  }
  function Child(name, age) {
  	Father.call(this, name, age);
  }
  ```

# 48.如何获取对象非原型链上的属性？

`for...in`遍历对象，然后用`hasOwnProperty()`来判断属性是否是属于原型链的属性

# 49. 对闭包的理解？

闭包是**可以访问另一函数作用域中变量的函数**
优点：

- 闭包中的变量是私有的，可以避免全局污染
- 运行结束的函数中的变量继续留在内存中

缺点：被引用的变量不能销毁，滥用闭包可能造成内存泄漏
（在数据被引用的情况下，不会被垃圾回收，因为闭包内的数据在外部有使用，所以不会被释放内存）

应用场景：

- 封装私有变量和函数
- 实现防抖和节流函数
- 实现立即执行函数
- 模拟块级作用域

```js
for (var i = 1; i <= 5; i++) {
	(function (j) {
		setTimeout(() => {
			console.log(j);
		}, i * 1000);
	})(i);
}
```

# 50.对执行上下文的理解

执行上下文：js 代码被解析和执行时所在的环境
可以说 js 代码实际上是运行在执行上下文中的

- 全局执行上下文
  运行代码主体的时候创建的执行上下文
- 函数执行上下文
  执行代码的时候遇到函数调用，会创建函数执行上下文
- eval 函数执行上下文(不常用)

在执行 js 代码之前，需要先解析代码，解析的时候会创建一个全局执行上下文
把即将执行的变量和函数声明都拿出来，变量赋值为 undefined，函数声明好可使用
然后才开始执行代码

**执行上下文栈：用来管理执行上下文的**
js 执行代码，遇到全局代码会创建全局执行上下文，压入执行上下文栈
每遇到一个函数调用，就创建一个函数执行上下文，压入栈，函数执行完之后，就会从栈中弹出
继续执行下一个执行上下文
所有代码执行完之后，从栈中弹出全局执行上下文

# 51.对作用域、作用域链的理解

作用域就是变量和函数的可访问范围
主要作用是隔离变量，不同作用域下的同名变量不会有冲突

主要分为：全局作用域、函数作用域、块级作用域

- 全局：全局作用域中声明的变量在任何地方都能访问到，
  但是过多全局作用域变量容易引起命名冲突
- 函数：函数中声明的变量只能在函数内部访问到
- 块级：在大括号{}中使用 let 和 const 声明的变量，只能在块级作用域中访问到

作用域链：从当前作用域找某个变量，没找到就去父级作用域找，然后这样一层一层向上找，直到找到 window 对象就结束，一层层的关系就是作用域链
作用：保证变量和函数的有序访问，通过作用域链可以访问到外部的变量和函数
**本质上是一个指向变量对象的指针列表，变量对象存储了在执行上下文中定义的变量和函数声明**
作用域链的前端是当前执行上下文的变量对象，最后一个是全局执行上下文的变量对象

# 52.对 this 的理解

this 是一个关键字，它是函数执行时自动生成的一个对象，随着使用场合的不同，this 的值也会发生变化

- 在函数中，this 指向全局对象
- 在方法中，就是在一个对象的方法中使用，this 指向了这个对象
- 如果一个函数用 new 调用，会创建一个新对象，this 指向这个新对象
- apply、call、bind 调用，this 就指向它们指定的对象

# 53.apply、call、bind 的区别

bind 调用是会返回一个函数，还需要我们手动调用，apply 和 call 则是立即调用
apply 和 call 区别在于它们传入参数的不同
第一个参数都是函数的 this 指向，
apply 第二个参数是传一个数组，数组里的元素就是要作为参数传递给函数的
call 后面的参数数量不固定，从第二个参数开始往后，每个参数都被传递给函数

# 54.异步编程的实现方式

1. 回调函数
   缺点：多个回调函数嵌套会造成回调函数地狱，而且代码耦合度高
2. 发布订阅模式
   假定有一个信号中心，某个任务完成就向中心发布信号，其他任务可以向中心订阅信号，中心收到信号之后就通知其他任务可以开始执行
3. Promise 对象
   利用 Promise 可以将回调函数的嵌套调用改成链式调用
4. Generator 函数
   generator 函数里的异步操作可以写成同步的顺序
   在函数内用 yield 可以暂停函数执行，函数外 next()可以恢复函数执行
   直接调用 generator()函数返回一个遍历器对象，调用一次遍历器对象的 next()就执行函数里的一个 yield 表达式
5. async/await
   执行 await 语句，如果语句返回一个 promise 对象，函数会等到 promise 状态变为 resolve 再继续往下执行

# 55.对 Promise 的理解

Promise 是异步编程的一种解决方案
Promise 是一个构造函数，接收一个函数作为参数，返回一个 promise 实例
promise 实例有三种状态，分别是 pending、resolved、rejected 代表进行中、已成功、已失败

通过 resolve()和 reject()函数来改变状态，一般在异步操作结束后调用这两个函数来改变状态
一旦状态变成其他状态就永远不能改变状态了
promise 还有一个 then()方法，使用 then()可以为成功的状态和失败的状态注册回调函数，当状态改变的时候就执行对应的回调

# 56. Promise 常用的方法

- then()
  接收两个回调，第一个是成功的回调，第二个是失败的回调
  then()返回一个新的 promise 实例，因此可以采用链式写法，一个 then()后再调用另一个 then()
- catch()
  接收一个失败的回调，如果异步操作抛出错误，状态会变为 rejected，然后调用 catch()指定的回调
  如果 then()指定的回调跑出错误，也会被 catch()捕获
  catch()也是返回一个新的 promise 实例
- Promise.all()
  **返回一个 promise 对象**
  接收一个数组，数组的每一项都是一个 promise 对象，当数组中所有 promise 的状态
  都变成 resolved，promise 对象的状态就会变成 resolved，成功值也是一个数组，数组里的元素是每个 promise 的成功值
  如果有一个状态变成 rejected，promise 对象的状态就会变成 rejected，失败值就是第一个导致失败的值
- Promise.race()
  **返回一个 promise 对象**
  接收一个数组，数组的每一项都是一个 promise 对象，哪个 promise 状态最先改变，这个 promise 对象就返回哪个的状态和值
  （可以用于要做一件事情，超过多长时间就不做了）
- finally()
  不管 promise 状态如何都会执行，不接收参数，finally()里面的操作和状态无关

# 57.Promise 解决了什么问题

回调地狱问题，提高了代码可读性

# 58. Promise.all 和 Promise.race 的使用场景

- Promise.all()成功的时候返回的结果数组和传入的数组里面的数据是一一对应的，
  可以用于：发送多个请求，并且等多个请求都返回数据后再一起处理
- Promise.race()哪个结果快就返回哪个，不管是成功还是失败
  可以用于：要做一件事，超过多长时间就不做了

# 59. 对 async/await 的理解

async/await 可以让我们写出同步化代码，相比 promise then 的链式调用，提高了代码可读性
async 关键字可以声明一个函数是异步的，await 后一般是一个 promise 对象，函数会等待这个 promise 对象的状态变化，状态变为 resolved 了才会继续执行后面的代码，如果状态变为 rejectd 函数会中断执行
async 函数返回一个 promise 对象，如果在函数中 return 一个直接量，这个 promise 对象状态就是成功的，值就是 return 的这个值，如果没有返回值，就会返回一个值是 undefined 的成功对象

# 60. async/await 如何捕获异常

- try/catch（await 表达式放进 try 里）
- 在 await 表达式后接一个 catch()

# 61. 垃圾回收机制

垃圾回收：创建变量的时候给变量分配了内存，当变量不再用到，系统就会收回被占用的内存

垃圾回收机制：js 有自动垃圾回收机制，会定期释放不再使用的变量占用的内存

垃圾回收的策略：

1. 标记清理
   当变量进入执行环境，就标记进入环境，被标记为进入环境的变量不能被回收，因为正在被使用
   变量离开环境也会被标记离开环境，这就会被内存释放
   垃圾回收程序会先标记内存中所有变量，然后去掉执行环境中变量的标记，之后销毁带标记的变量并回收它们的内存
2. 引用计数
   **记录每个值的被引用次数**
   声明一个变量并赋一个引用值时，这个值引用数为 1，如果有别的变量也赋了这个引用值，引用数+1，如果这个变量又被其他值覆盖了，引用数会减 1，一个值引用数为 0 的时候会被释放内存

   缺点：循环引用问题
   a 对象和 b 对象通过属性相互引用，它们的引用数都不会为 0，就没办法进行内存释放
   解决：手动释放 赋值为 null

# 62. 哪些情况会导致内存泄漏

我们访问不到的变量，但依然占据着内存空间，不能被利用起来

- 在函数中给一个未声明的变量赋值，就会让他变成一个全局变量，函数执行完变量还会留在内存中
- 设置了 setInterval 定时器忘记取消
- dom 对象的事件监听函数，没有移除监听
- 滥用闭包，闭包会导致函数中引用的变量一直保存在内存中，内存占用空间过大，会有内存泄漏的威胁

# 63. Object.create()和 new Object()的区别

- new Object()继承内置对象 Object，Object.create()继承指定的对象
- Object.create(null)会创建一个没有原型的对象，new Object()创建的对象的原型指向 Object.prototype

# 64. 赋值、浅拷贝、深拷贝

赋值 !== 浅拷贝
赋值：
新对象属性改变，也会引起原对象属性改变

```js
const obj1 = {
	name: "poem",
	age: [20],
};
const obj2 = obj1;
obj2.name = "poem2";
obj2.age[0] = 30;
console.log(obj1.name, obj2.name, obj1.age[0], obj2.age[0]);
// poem2 poem2 30 30
```

浅拷贝：
新对象属性改变，如果变的是简单类型，原对象属性不会改变
如果变的是复杂类型，原对象属性会改变

```js
const obj1 = {
	name: "poem",
	age: [20],
};
function shallowCopy(obj) {
	let obj2 = {};
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			obj2[key] = obj[key];
		}
	}
	return obj2;
}
const obj2 = shallowCopy(obj1);
obj2.name = "poem2";
obj2.age[0] = 30;
console.log(obj1.name, obj2.name, obj1.age[0], obj2.age[0]);
// poem poem2 30 30
```

深拷贝：
新对象属性改变，原对象不会变

# 65. 实现浅拷贝、深拷贝的方法

浅拷贝：
Object.assign()、扩展运算符、数组的 slice()、concat()

深拷贝：
JSON.parse(JSON.stringify())

# 66.数组去重有哪些方法
