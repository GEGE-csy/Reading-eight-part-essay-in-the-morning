# 数据类型

## 1.js 有哪些数据类型？

8 种：Undefined、Null、Number、String、Boolean、Symbol、BigInt、Object

## 2.说一说 BigInt 和 Symbol？

- BigInt 和 Symbol 是 es6 新增的数据类型
- BigInt 和 Symbol 都是通过函数创建的
- Symbol 表示一个独一无二的值，它可以用作对象属性名，避免对象属性名冲突
- BigInt 是一种数字类型，一般用于存储和操作大整数，如果某个数超出了 Number 能表示的安全整数范围，就可以使用 BigInt 来操作

## js的安全整数范围

安全整数：（-2^53+1 ~ 2^53-1)

## 3.原始类型和引用类型的理解？

最大的区别：存储位置不同

- 原始类型是存储在栈中的简单数据段，占据空间小，大小固定。

- 引用类型是存储在堆中的对象，占据空间大，大小不固定。
  引用类型在栈中存储的是对象在堆中的引用地址
  访问引用类型时，会先检索在栈中的地址，再根据地址找到堆中的实体

## 堆和栈的区别，联系

数据结构中：栈是一种先进后出的数据结构，堆是一个优先级队列，通常用完全二叉树实现
操作系统中：内存分为栈区和堆区。栈区内存由编译器自动分配释放，堆区内存一般由程序员分配释放

## 4.数据类型检测的方式有哪些 ⭕️

1. typeof：能判断所有的基本类型
   不能准确判断引用类型，除了function 其他都会返回object

2. instanceof：能判断引用类型，不能判断基本类型(包装过的话可以,new String('123')这种)
   [] instanceof Array
   内部运行机制是判断该构造函数(右)的原型对象在不在实例对象(左)的原型链上

3. constructor：可以基本类型和引用类型（null undefined Symbol BigInt除外）
   
   （每个对象都会有的 constructor 属性，指向了构造函数本身）
   
   （数字，字符串本身没有属性，但访问其属性时js会使用Number()转成包装类型）
   (2).constructor === Number
   [].constructor === Array

4. Object.prototype.toString.call()：可以检测所有类型
   Object.prototype.toString.call(123) // ”[object Number]”
   Object.prototype.toString.call([]) // ”[object Array]”
   
   Object.prototype.toString.call(new Date()) // ”[object Date]”
   
   ⚠️：使用obj.toString()和Object.prototype.toString.call(obj)的结果不同，因为toString()是Object的原型方法，而Array、Function等类型作为Object的实例都重写了toString()

## 5.判断数组的方式

- [] instanceof Array
- [].constructor === Array
- Object.prototype.toString.call([]) === 'Array'
- Array.isArray([]) // es6 新增的原型方法

## 6.null 和 undefined 的区别

Undefined 和 Null 都是基本数据类型，它们都只有一个值，就是 undefined 和 null

- undefined 代表未定义，声明了变量但还没有定义的时候会返回 undefined
- null 代表空对象，主要用于初始化一些可能会返回对象的变量

## 7.typeof null 的结果是什么，为什么？

typeof null = Object
数据类型在底层保存为二进制，js 中二进制前 3 位都是 0 会被判断为 Object 类型
null 的二进制表示为全 0，所以会被判定为 Object

若要拿到真实的数据类型，可以使用Object.prototype.toString.call(null)

## 8.typeof NaN 的结果

typeof NaN = **Number**

Object.prototype.toString.call(NaN) = '[object Number]'
NaN 是唯一一个非自反值，NaN !== NaN

## isNaN和Number.isNaN的区别

isNaN()接收到参数后，会尝试转成数值，不能转成数值的数都会返回true，影响判断

Number.isNaN()会先判断是否为数字，是数字再继续判断是否为NaN，不会进行类型判断，对NaN的判断更为准确

## 9.为什么 0.1+0.2!==0.3

计算 0.1+0.2 的时候会被转成二进制计算，0.1 和 0.2 的二进制是无限循环的数
而 js 提供的有效数字最长为 53 个二进制位，后面的位数会被全部截掉，导致精度丢失

## 10.那么如何判断 0.1+0.2=0.3

可以设置一个误差范围，利用 **Number.EPSILON** 值，是 js 能表示的最小精度，大小是 **2^-52**
判断如果 0.1+0.2-0.3 是否小于 Number.EPSILON，如果小于就可以判断 0.1+0.2=0.3

## 11.|| 和 && 操作符的返回值

先对第一个操作数进行条件判断，如果不是布尔值就转为布尔值

- 对于||来说，如果第一个操作数判断为 true 就返回第一个操作数，否则第二个操作数
- 对于&&来说，如果第一个操作数判断为 true 就返回第二个操作数，否则第一个操作数
  ⚠️：不会返回条件判断的结果！！！返回的是操作数

## 12.什么是 js 中的包装类型？

js 中的基本数据类型是没有属性和方法的
但是 js 中的字符串、数值、布尔值在使用时又可以调用一些方法和属性
这是因为这几个类型在 js 底层会使用 `Object()` 函数进行包装
比如在调用字符串的 length 时，js 会隐式将基本类型转为包装类型

我们也可以使用 Object 函数显式地将基本类型转为包装类型
Object('abc') // String {'abc'}

还可以使用`valueOf()`将包装类型转回基本类型
const abc = Object('abc')
abc.valueOf() // 'abc'

## 13. Object.assign 和扩展运算符是深拷贝还是浅拷贝

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

## 强制类型转换和隐式类型转换

强制类型转换一般是使用了js函数转换

隐式类型转换一般是自动转换

## 14.js 中的隐式类型转换

基本类型的转换：

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

- undefined、null 对象没有 valueOf()

- Array => 数组本身

- Function => 函数本身

- Object => 对象本身
  
  （复杂数据类型的话其实就是返回本身）

调用 toString()返回的结果：

- Boolean => 'true'/'false'

- Number => 数字转成的字符串

- String => 字符串本身

- Array => 用逗号分隔数组每个元素形成的字符串

- Function => 函数的文本定义

- Object => '[object Object]'
  
  如果是 new 关键字+内置对象创建的 Object 类型，调用 toString()会先转成对应的基本类型再调用 toString()
  new String('abc').toString() // 'abc'

## 15. !符号转换规则

`!`会将后面的数据先转成布尔值，然后取反

```js
console.log(!!{}); // true
// {} => true（除了null其他对象都为true）
console.log(!!null); // false
```

## 16. == 符转换规则

**当我们使用==操作符进行比较时，若两边类型相同，并且比较的是两个对象，则比较两个对象的指针是否指向同一个对象**

**当我们使用==操作符进行比较时，若两边类型不同，则两边都尝试转成 number 类型**

（如果是基本类型，考虑14中基本类型的转换规则，如果是对象，考虑14中对象的转换规则）

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

## 17. 比较运算符 > < 转换规则

如果两边都是 string 类型，不进行类型转换
如：
`console.log('666' < '7') // true`
而是逐位比较 ascii 码（数字<大写字母<小写字母），比较到不同的就直接返回结果
这里就是第一位 6 小于 7，直接返回了 true 不会继续比较了

否则两边都会转换为 number 类型再进行比较

## 18. + 运算符转换规则

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

## 19. 如何获取安全的 undefined 值？

void 0

## 20. Object.is()和 === 和 == 的区别

== 会进行强制类型转换再比较，=== 不会进行类型转换

Object.is()基本上和===的判断相同，但处理了一些特殊情况，

比如-0不等于+0，两个NaN相等

## 21. 内部属性[[Class]]是什么

所有typeof返回值为"object"的对象都包含一个内部属性[[Class]]

这个值无法直接访问，只能通过Object.prototype.toString.call()间接获得

Object.prototype.toString.call( [1,2,3] );
// "[object Array]"  Array这部分就是[[Class]]

## 22. js中有哪些内置对象

1. 值属性，undefined null NaN

2. 函数属性，parseInt parseFloat 

3. 基本对象，Object Function Symbol

4. 错误对象，Error ReferenceError TypeError

5. 数字和日期对象，Number Math Date

## js中如何判断两个对象是否相等

1. 通过JSON.stringify()
   
   对象中的key顺序不同时会出错

2. lodash中的isEqual()

3. 遍历获取键名，比对键名数组长度和键名对应的键值，如果键值是对象递归比较

# es6

## 1. let、const、var 的区别

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

## 2. const 定义的变量可以修改吗？

- 定义的是基本数据类型，不能修改
- 定义的是复杂数据类型，可以修改

const 保证的其实是**变量指向的内存地址所保存的数据**不能改变，
对于基本数据类型，基本类型的值就保存在变量指向的内存地址
对于复杂数据类型，变量指向的内存地址保存的只是复杂类型在堆中的地址，const 只能保证这个地址不变，不能保证这个地址指向的实体变不变

## 3.箭头函数和普通函数的区别

- 箭头函数是匿名函数，普通函数可匿可不匿
- 箭头函数没有自己的 this，它内部的 this 是它上层作用域的 this
- 箭头函数没有原型`prototype`，`__proto__`，`arguments`
- 箭头函数不能作为构造函数
- call()、apply()、bind()等方法不能改变箭头函数中 this 的指向
- 箭头函数继承来的this指向不会改变（但仍然受到外部作用域的影响）

## 4.扩展运算符的作用

- 对对象
  取出对象中的属性，拷贝到另一个对象中

- 对数组
  
  - 将数组转成参数序列
  - 复制数组
  - 合并数组

- 对字符串
  
  - 字符串分割成字符数组

## 5.Proxy

Proxy用来创建一个代理对象，可以拦截一个对象，并自定义对它的操作

`let proxy = new Proxy(target, handler)`

target代表需要添加代理的对象，handler用来自定义目标对象的操作

**应用场景**：

数据校验：设置属性时，拦截set，校验是否合法

惰性计算：访问属性时在get中检查缓存中是否有值，如果有就不计算

权限控制：拦截get，判断权限

实现观察者模式：拦截被观察对象的set，在set中通知观察者列表中的其他观察者

## 6.对 rest 参数的理解

rest 参数就是把扩展运算符用在函数形参上
它可以把参数序列整合成一个数组：

```js
function multiple(...args) {
    console.log(args); // [1,2,3,4]
}
multiple(1, 2, 3, 4);
```

可以用来获取函数的多余参数，用来**处理函数参数个数不确定**的情况

# javascript基础

## js预编译(做输出题用到)

js中预编译一般有两种：全局的预编译和函数的预编译

- 函数预编译：
  
  - 创建AO对象
  
  - 形参和变量声明作为AO的属性名，值赋予undefined
  
  - 将实参的值赋给形参
  
  - 找函数声明，函数名作为AO属性名，值赋予函数体（覆盖前面的变量声明和形参）

- 全局预编译：
  
  - 创建GO对象
  
  - 找变量声明作为GO的属性名，如果window对象上存在这个变量，则跳过这一步。否则值赋予undefined
  
  - 找函数声明作为GO的属性名，如果window对象上存在，则跳过这一步。否则值赋予函数体（覆盖前面的变量声明）

## 1. new 操作符的执行过程 ⭕️

1. 创建一个新的空对象
2. 将新对象的原型设置成构造函数的 prototype 对象
3. 让构造函数的 this 指向新对象，调用构造函数，并得到调用的返回值
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
    //3.将构造函数的this指向新对象，并调用构造函数
    let result = constructor.apply(newObj, arguments);
    //4.判断构造函数的返回值类型，如果返回的是值类型，则返回新对象。如果是引用类型，则返回引用类型
    let returnTypeIsObj = typeof result === "object" || typeof result === "function";
    return returnTypeIsObj ? result : newObj;
}

objFactory(构造函数, 初始化参数);
```

## forEach和for循环的区别

- forEach不支持break、return跳出，可以使用trycatch，抛出错误中断

- forEach中的index无法控制，只能增大，删除元素也无法重置index

- forEach无法控制循环起点，只能从0开始

- for循环没有额外的函数调用栈和上下文，性能比forEach好
  
  【性能：for循环>forEach>map，map会创建新数组，带来更大的性能开销】

## 2. map 和 object 的区别

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
  map 可迭代，实现了Iterable接口
  object 没有实现Iterable接口，可以用Object.entries()、Object.keys()、Object.values() 获取它的键值对/键/值，才能迭代

- 性能
  map 频繁增删键值对时性能更好

## 3. 怎么遍历 map

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

## 4. map 和 weakMap 的区别

- map 可以任意类型作为 key，weakMap 只接受对象作为 key
- weakMap 的键名引用的对象都是弱引用，不计入垃圾回收机制（该对象要被垃圾回收时这个引用不会阻止垃圾回收）

## 5. 对 json 的理解

json 是一种数据格式，经常使用 json 作为前后端数据交换的方式
前端将符合 json 格式的数据序列化为 json 字符串，然后传递到后端
后端将 json 格式的字符串解析成 json 对象

- JSON.stringify()：JSON 对象转为 JSON 字符串
- JSON.parse()：JSON 字符串转为 JSON 对象

JSON对象和js对象不一样，JSON中对象格式更严格，比如属性值不能是函数

## 6. js 脚本延迟加载的方式？

延迟加载：等页面加载完再加载 js 文件

- defer 属性：
  不会阻塞页面解析，加载完脚本不会立刻执行，会在文档解析完再执行脚本
  多个 defer 按顺序执行
- async 属性：
  可能会阻塞页面解析，加载完脚本之后立即执行脚本，如果此时页面还没解析完，则会阻塞页面解析
  多个 async 无顺序
- 动态创建 script 标签
  监听文档加载完再动态创建 script 标签来引入 js
- 将 js 脚本放在文档底部，最后加载

⚠️：不加 defer/async，普通的 script 标签如果要**加载**js 是会阻塞解析 html 的，
加了 defer/async，可以保证**加载**js 不阻塞解析 html
同时 defer 还能保证**执行**js 也不阻塞解析 html，但 async 无法保证执行 js 不阻塞解析 html

## 7. js 的类数组对象

通常有 length 属性和数字索引
常见的类数组对象有 arguments 和一些 dom元素集合

但他们不具有数组的方法，例如push、pop、forEach等

类数组转为数组的方法：

- Array.prototype.slice.call(arrayLike)
- Array.from(arrayLike)
- [...arrayLike]

## 8. 数组有哪些原生方法

转成字符串：join()
操作首部：unshift()和 shift()
操作尾部：push()和 pop()
重排序：reverse()和 sort()
截取：slice()
插入删除：splice()
迭代：every()、some()、filter()、map()、forEach()

## 9. ASCII、Unicode、UTF-8、UTF-16、UTF-32

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

## 10. 函数的 arguments 参数

arguments 是类数组对象
遍历 arguments：

1. `Array.prototype.forEach.call(arguments, item => { console.log(item) })`
2. `const arrArgs = Array.from(arguments)`
3. `const arrArgs = [...arguments]`

## 11. 什么是 DOM 和 BOM

DOM 是文档对象模型，指把文档当成一个对象，这个对象定义了处理网页的方法
BOM 是浏览器对象模型，指把浏览器当成一个对象，这个对象定义了和浏览器交互的方法

## 12. escape()、encodeURI()、encodeURIComponent() 的区别

- escape(已废弃) 是对字符串进行编码，转义字符串中的特殊字符。encodeURI 和 encodeURIComponent 是对 url 进行编码。
- encodeURI会保留部分特殊字符(/ ? &)等，encodeURIComponent 会对所有特殊字符进行编码。encodeURIComponent的编码范围比 encodeURI 的编码范围大
  比如`https://www.baidu.com`，encodeURIComponent 会将`/`也编码了，但 encodeURI 不会

## 13. 对 ajax 的理解

ajax 是一种技术，能够和服务器交换数据并更新网页的部分内容，并且不用刷新网页

实现一个 ajax 请求：

- new 一个 XMLHttpRequest 对象

- 调用对象的 `open()`方法，传递参数设置请求类型，请求地址，是否异步(默认异步)

- 调用对象的`setRequestHeader()`为对象添加头信息

- 给对象添加状态监听函数，XMLHttpRequest 对象有 5 个状态，状态改变的时候会触发 onreadystatechange 事件
  
  【0未open 1已open 2send已调用，接收到响应头 3响应体部分接收 4响应体完全接收】
  当 readyState 变为 4 的时候表示服务器返回的数据接收完成，可以判断状态码来获取数据

- 调用对象的`send()`方法向服务器发送请求，可以传入参数作为请求体

## 14. js 为什么要进行变量提升 ⭕️

变量声明提升的原因是：
**js 在执行代码之前有一个解析的过程**，解析阶段创建一个执行上下文环境，初始化了一些代码执行时需要用到的对象，将即将执行的变量赋值为 undefined，函数声明好可使用

好处：

1.提高性能

js代码执行之前的解析过程只进行一次，不然每次执行代码前都要重新解析一次变量和函数

2.容错性更好

## 15. 什么是尾调用，好处？

指在函数的最后一步调用另一个函数
代码执行是基于执行栈的，当在一个函数里调用另一个函数时，会保留当前的执行上下文，再新建一个执行上下文加入栈中
但如果使用尾调用，因为是函数的最后一步，所以这时可以不用保留当前的执行上下文，节省了内存

## 16. use strict 是什么意思？使用它区别是什么？

use strict 是一种 es5 添加的运行模式，这种模式可以让 js 在更严格的条件下运行
区别：
变量必须声明才能使用（正常模式下一个变量没有声明就赋值默认是全局变量
全局作用域中定义的函数中的 this 为 undefined

## 17. 强类型语言和弱类型语言的区别

强类型语言：强制类型定义，一个变量指定了某个类型之后如果不经过强制转换，它的类型不会改变
弱类型语言：变量类型可以隐式地转换，比如在 js 中字符串“12”和整数 3 相加就会进行连接得到字符串“123”

## 18. 编译型语言和解释型语言的区别

编译型语言：

- 编译器一次性把源代码编译成一个可执行程序，之后直接运行这个可执行程序就行，不需要重复编译
- 一般编译出来的可执行程序不能跨平台
- 代表语言 c、c++等

解释型语言：

- 解释器把源代码一行一行的翻译成特定平台的机器码，不会生成可执行程序
- 解释型语言一般可以跨平台
- 代表语言 javascript、python 等

## 19. for...in 和 for...of 的区别

for...of 是 es6 新增的遍历方式，遍历有 iterator 接口的数据结构
（数组、类数组、字符串、map 等等等，但普通对象不行）

- for...in一般用来遍历对象的可枚举属性，返回键名。for...of一般用来遍历可迭代对象的元素，返回键值。

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

## 20. ajax、axios、fetch 的区别

ajax 是一个技术统称，包括了很多技术，XMLHttpRequest 只是实现 ajax 的一种方式
fetch 是一个 api，使用了 promise，它是 XMLHttpRequest 的替代品
axios 是一个库，使用 promise 对 XMLHttpRequest 进行了封装

关系：

- ajax
  - fetch
  - xhr
    - axios

## 21. esmodule、commonjs、AMD、UMD的区别 ⭕️

- cjs的require()是同步加载，esm的import()是异步加载

- cjs导出的是值的拷贝，esm导出的是值的引用

- AMD是异步加载，主要用于浏览器，cjs主要用于服务器

- UMD可以适应多种环境，会检测当前的执行环境，然后根据环境来选择使用哪种模块系统

## 22. Object.create()和 new Object()的区别

- new Object()继承内置对象 Object，Object.create()继承指定的对象
- Object.create(null)创建的对象没有原型，new Object(null)创建的对象的原型指向 Object.prototype

## 23. 赋值、浅拷贝、深拷贝

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

```js
function deepClone(obj) {
  let newObj = Array.isArray(obj) ? [] : {}
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }
}
```

## 24. 实现浅拷贝、深拷贝的方法

浅拷贝：
Object.assign()、扩展运算符、数组的 slice()、concat()

深拷贝：
JSON.parse(JSON.stringify())

## 25. js获取原型的方法

Object.getPrototypeOf(obj) 【推荐】

obj.______proto______ 【不推荐】

## 26. eval函数

接收一个字符串，并将字符串解析成js代码并执行

性能较低，要先解析字符串再执行代码

## 27. ["1", "2", "3"].map(parseInt) 答案是多少？

parseInt()第二个参数是解析的进制，

值在2～36之间，如果为0，则十进制。如果小于2，则返回NaN

parseInt("1", 0) => 1

parseInt("2", 1) => NaN

parseInt("3", 2) => NaN

答案是: [1, NaN, NaN]

## 28. 什么是Polyfill？

Polyfill指的是实现浏览器并不支持的原生api的代码

一些新特性或api可能旧版本浏览器不支持，Polyfill会检查浏览器是否支持，如果不支持就自动添加所需代码来实现该功能

## js中的高阶函数

高阶函数：接受一个函数或多个函数作为参数 / 输出一个函数

- forEach((item,index,arr) => {}, thisArg)
  
  ```js
  Array.prototype.forEach = function(callback) {
    if(!(callback instanceof Function)) {
      throw new TypeError(callback + 'is not a function')
    }
    const arr = this, thisArg = arguments[1] || window
    for(let i = 0; i < arr.length; i++) {
      callback.call(thisArg, arr[i], i, arr)
    }
  }
  ```

- map，返回新的数组
  
  ```js
  Array.prototype.map = function(callback) {
    if(!(callback instanceof Function)) {
      throw new TypeError(callback + 'is not a function')
    }
    const arr = this, thisArg = arguments[1] || window
    let res = []
    for(let i = 0; i < arr.length; i++) {
      res.push(callback.call(thisArg, arr[i], i, arr))
    }
    return res
  }
  ```

- filter，返回结果为true的
  
  ```js
  Array.prototype.filter = function(callback) {
    if(!(callback instanceof Function)) {
      throw new TypeError(callback + 'is not a function')
    }
    const arr = this, thisArg = arguments[1] || window
    let res = []
    for(let i = 0; i < arr.length; i++) {
      if(callback.call(thisArg, arr[i], i, arr)) {
        res.push(arr[i])
      }
    }
    return res
  }
  ```

- every
  
  ```js
  Array.prototype.every = function(callback) {
    if(!(callback instanceof Function)) {
      throw new TypeError(callback + 'is not a function')
    }
    const arr = this, thisArg = arguments[1] || window
    for(let i = 0; i < arr.length; i++) {
      if(!(callback.call(thisArg, arr[i], i, arr))) {
        return false
      }
    }
    return true
  }
  ```

## js生成随机数的方法

1. 生成[0,1)范围内的随机浮点数
   
   Math.random()

2. 生成[m,n)范围内的随机浮点数
   
   Math.random() * (n-m) + m

3. 生成[m,n)范围内的随机整数
   Math.floor(Math.random() * (n-m)) + m

## js实现数组随机排序

```javascript
function randomSort(arr) {
    let length = arr.length
    for(let index = 0; index < length; index++) {
      let randomIndex = Math.floor(Math.random() * (length - index)) + index
      [arr[randomIndex], arr[index]] = [arr[index], arr[randomIndex]]
    }
    return arr
}
```

# DOM BOM

## 1. 常见的DOM操作有哪些

1. DOM节点的获取
   
   getElementById
   
   getElementByClassName
   
   querySelector

2. DOM节点的创建

   createElement

   appendChild

3. DOM节点的删除

   removeChild

## 2. 事件是什么？IE 与火狐的事件机制有什么区别？如何阻止冒泡？

1. 事件是用户操作网页时发生的交互动作，如click、mouseenter
   
   事件被封装成了一个event对象，包含了事件发生时的所有相关信息，以及可以对事件进行的操作

2. 绑定事件：IE早期使用attchEvent，火狐和其他现代浏览器使用addEventListener

3. event.stopPropagation()

## 3. 三种事件模型是什么 ⭕️

1. DOM0级模型
   
   事件发生后没有传播的概念，没有事件流
   
   相同事件的监听函数只能绑定一个
   
   element.onclick = function() {}

2. IE事件模型

   一次事件有两个过程：事件处理阶段+事件冒泡阶段

   先执行目标元素绑定的监听函数，然后事件从目标元素冒泡到document

   attachEvent('onclick', function() {})

   detachEvent('onclick', function() {})

3. DOM2级模型
   
   一次事件有三个过程：事件捕获阶段+事件处理阶段+事件冒泡阶段事件
   
   从document传播到目标元素，执行目标元素绑定的监听函数，然后事件从目标元素冒泡到document
   
   addEventListener('click', function() {})
   
   removeEventListener('click', function() {})

## addEventListener的第三个参数

true - 在事件捕获阶段调用函数

false - 在事件冒泡阶段调用函数

默认false

## 4. 事件委托/事件代理是什么？

事件委托利用了事件冒泡的机制，事件在冒泡的过程中会上传到父节点，所以可以把子元素的监听函数绑定在父元素上，用父元素的监听函数统一处理子元素的事件。e.target可以获取到实际触发事件的元素。

好处：不需要给多个子元素都绑定监听函数、动态绑定(新增节点的监听函数绑在父元素上)

# 原型与原型

## 1. 对原型的理解

每个构造函数都有一个 prototype 属性，属性值是一个对象，这个对象就是构造函数的原型，
这个对象的所有属性和方法都可以被构造函数的实例共享。
（所有原型还会有一个 constructor 属性，是一个指针，指回了原型所在的构造函数）
当使用构造函数新建一个实例对象后，这个实例对象会有一个`__proto__`属性，指向了构造函数的原型，这个是对象的原型
一般对象的原型不要直接使用属性获取，可以使用 Object.getPrototypeOf()方法来获取

## 2. 对原型链的理解

访问一个对象的属性时，如果这个对象身上没有这个属性，就会去它的原型对象上查找这个属性
它的原型对象也会有自己的原型对象，这样一层一层向上查找形成的链式结构就是原型链
一直找找到匹配的属性或者到达原型链的终点 `Object.prototype.__proto__`，就不会继续找了，返回一个 null

## 3. 原型的修改和重写

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

要将constructor指回原来的构造函数
此时的 Person.prototype 指向一个新对象，新对象上根本没有 constructor 属性，就会顺着原型链向上找
然后找到 Object.prototype 上有 constructor 属性

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

## 4. 原型链指向

好无聊的题。。

(Person.prototype也是一个对象，继承了构造函数Object的方法和属性)

```js
p.__proto__; // Person.prototype
Person.prototype.__proto__; // Object.prototype
p.__proto__.__proto__; // Object.prototype
p.__proto__.constructor.prototype.__proto__; // Object.prototype
Person.prototype.constructor.prototype.__proto__; // Object.prototype
p.__proto__.constructor; // Person
Person.prototype.constructor; // Person
```

## 5. 原型链的终点？如何打印终点？

终点是 `Object.prototype.__proto__`
= null

## 6. 如何获取对象非原型链上的属性？

`for...in`遍历对象，然后用`hasOwnProperty()`来判断属性是否是属于原型链的属性

（hasOwnProperty会检查该属性是否是对象自身的属性，而不会沿着原型链向上查找）

# 执行上下文/作用域链/闭包

## 1. 对闭包的理解？⭕️

闭包是**可以访问另一函数作用域中变量的函数**

当一个函数被定义在另一个函数内部时，内部函数可以访问外部函数的变量，即使外部函数已经执行完毕，因为内部函数形成了对外部函数作用域的引用。
优点：

- 闭包中的变量是私有的，可以避免全局污染
- 延长了变量的生命周期，（因为闭包保留了对外部函数作用域的引用）运行结束的函数中的变量继续留在内存中，不会被垃圾回收

缺点：被引用的变量不能销毁，滥用闭包可能造成内存泄漏
（在数据被引用的情况下，不会被垃圾回收，因为闭包内的数据在外部有使用，所以不会被释放内存）

应用场景：

- 封装私有变量和函数
- 实现防抖和节流函数
- 实现立即执行函数
- 模拟块级作用域
- 实现单例模式：确保一个类只有一个实例

输出： 5 5 5 5 5，因为setTimeout是异步任务暂时不会执行，会先执行循环，等到输出i的时候，i已经是5了

```js
for (var i = 1; i <= 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, i * 1000);
}
```

解决方法：

每次迭代的立即执行函数都会创建一个闭包，并将当前迭代值i传进参数

闭包有自己独立的作用域和捕获的变量，setTimeout回调执行的时候会从闭包中获取到j值

```js
for (var i = 1; i <= 5; i++) {
    (function (j) {
        setTimeout(() => {
            console.log(j);
        }, j * 1000);
    })(i);
}
```

## 2. 对执行上下文的理解 ⭕️

执行上下文是js 代码执行时创建的一个环境

主要由三个成分组成：变量对象、作用域链、this值

变量对象：变量对象包含了当前上下文中声明的变量、函数。变量对象是一个和上下文有关的特殊对象，在全局上下文中是全局对象，在函数上下文中是活动对象。

作用域链：是一个指向变量对象的指针列表，用来查找变量和函数。当查找一个变量时，首先会在当前执行上下文的变量对象中查找，如果没找到，会沿着作用域链向上一级执行上下文的变量对象中查找，直到找到该变量或到达全局执行上下文。

this值：this值表示当前执行上下文中的this引用，它在函数执行时确定。

js解释器遇到可执行代码时，会创建一个执行上下文，执行上下文中的变量和函数会被提升，即在代码执行之前就已经被分配内存空间。代码执行的时候，解释器会根据作用域链查找变量，执行函数，并将结果保存在变量对象中

分类：

- 全局执行上下文
  运行代码主体的时候创建的执行上下文
- 函数执行上下文
  执行代码的时候遇到函数调用，会创建函数执行上下文
- eval 函数执行上下文(不常用)

**执行上下文栈：用来管理执行上下文的**
js 执行代码，遇到全局代码会创建全局执行上下文，压入执行上下文栈
每遇到一个函数调用，就创建一个函数执行上下文，压入栈，函数执行完之后，就会从栈中弹出
继续执行下一个执行上下文
所有代码执行完之后，从栈中弹出全局执行上下文

## 3. 对作用域、作用域链的理解

作用域就是变量和函数的可访问范围
作用：隔离变量，避免命名冲突，防止对变量的意外修改，管理变量的生命周期

主要分为：全局作用域、函数作用域、块级作用域

- 全局：全局作用域中声明的变量在任何地方都能访问到，
  但是过多全局作用域变量容易引起命名冲突
- 函数：函数中声明的变量只能在函数内部访问到
- 块级：在大括号{}中使用 let 和 const 声明的变量，只能在块级作用域中访问到

作用域链：从当前作用域找某个变量，没找到就去父级作用域找，然后这样一层一层向上找，直到找到变量或到达全局作用域就结束，一层层的关系就是作用域链
作用：保证变量和函数的有序访问，通过作用域链可以访问到外部的变量和函数
**本质上是一个指向变量对象的指针列表，变量对象包含了当前执行上下文中声明的变量和函数**
作用域链的前端是当前执行上下文的变量对象，最后一个是全局执行上下文的变量对象

## 4. 对 this 的理解 ⭕️

this 是一个关键字，它代表当前执行上下文对象，它的值是在运行时动态确定的，this在不同情况下可能指向不同的对象

全局上下文中的this：this指向全局对象。在浏览器环境中指向window对象，在nodejs中指向global对象

函数中的this：

- 普通函数中：this 指向全局对象

- 函数作为对象的方法中：this指向调用该方法的对象

- 构造函数中：this指向新创建的实例对象

- 使用apply、call、bind进行显式绑定：this指向作为参数传递的对象

箭头函数中的this：箭头函数的this是继承自外部作用域，而不是根据函数调用动态确定。因为他们没有自己的this值，它们会捕获外部作用域的this值并绑定到函数内部。

## 5. apply、call、bind 的区别

bind 调用是会返回一个函数，还需要我们手动调用，apply 和 call 则是立即调用
apply 和 call 区别在于它们传入参数的不同
第一个参数都是函数的 this 指向，
apply 第二个参数是传一个数组，数组里的元素就是要作为参数传递给函数的
call 后面的参数数量不固定，从第二个参数开始往后，每个参数都被传递给函数

# 异步编程

## 1. 异步编程的实现方式

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

## 2. 对 Promise 的理解

Promise 是异步编程的一种解决方案
Promise 是一个构造函数，接收一个函数作为参数，返回一个 promise 实例
promise 实例有三种状态，分别是 pending、resolved、rejected 代表进行中、已成功、已失败

通过 resolve()和 reject()函数来改变状态，一般在异步操作结束后调用这两个函数来改变状态
一旦状态变成其他状态就永远不能改变状态了
promise 还有一个 then()方法，使用 then()可以为成功的状态和失败的状态注册回调函数，当状态改变的时候就执行对应的回调

## 3. Promise 常用的方法

- then()
  接收两个回调，第一个是成功的回调，第二个是失败的回调
  then()返回一个新的 promise 实例，因此可以采用链式写法，一个 then()后再调用另一个 then()
  
  【then()返回的promise的状态取决于then()指定的回调函数的执行结果】
  
  【then()执行回调，回调抛出异常 => then()返回失败的promise】
  
  【then()执行回调，回调返回非promise值 => then()返回成功的promise】
  
  【then()执行回调，回调返回一个promise => then()返回的promise状态与回调返回的promise相同】               

- catch()
  接收一个失败的回调，如果异步操作抛出错误，状态会变为 rejected，然后调用 catch()指定的回调
  如果 then()指定的回调抛出错误，也会被 catch()捕获
  catch()也是返回一个新的 promise 实例

- Promise.all()
  **返回一个 promise 对象**
  接收一个数组，数组的每一项都是一个 promise 对象，当数组中所有 promise 的状态都变成 resolved，promise 对象的状态就会变成 resolved，成功值也是一个数组，数组里的元素是每个 promise 的成功值
  如果有一个promise状态变成 rejected，promise 对象的状态就会变成 rejected，失败值就是第一个导致失败的值
  
  【当有promise失败了，会直接返回，其他promise还会继续执行，但其结果被忽略】
  
  【注意promise中没有cancel的概念，promise.all不会cancel其他promise】

- Promise.race()
  **返回一个 promise 对象**
  接收一个数组，数组的每一项都是一个 promise 对象，哪个 promise 状态最先改变(无论成功失败)，这个 promise 对象就返回哪个的状态和值
  （可以用于要做一件事情，超过多长时间就不做了）

- finally()
  不管 promise 状态如何都会执行，不接收参数，finally()里面的操作和状态无关

- Promise.allSettled()
  
  返回一个promise对象
  
  接收一个数组，数组的每一项都是一个promise对象，当数组中所有promise的状态都改变之后，promise对象的状态就会变成resolved，成功值是一个对象数组
  
  【如果传空数组，也会返回成功的promise】
  
  每个对象都有这些属性：
  
  - status("fulfilled"/"rejected")
  
  - value，就是这个promise的成功值，当status为fulfilled时才有这个属性
  
  - reason，就是这个promise的失败值，当status为rejected时才有这个属性

## Promise.resolve()

- 接收一个固定值value => 返回成功的promise，成功值是value

- 接收一个promise =>  返回这个promise
  
  ```js
  const original = Promise.resolve(1)
  const cast = Promise.resolve(original)
  console.log(cast === original) // true
  ```

- 接收一个thenable（带有then()的对象）=> 返回的promise状态跟随这个then()
  
  ```js
  const p = {
    then(onFulfill, onReject) {
      onFulfill("fulfilled!");
    }
  }
  ```

实现：

```js
Promise.myResolve = function(value) {
    return new Promise(resolve => {
        resolve(value)
    })
}
```

不需要判断value是不是promise对象，因为resolve()方法会自己处理，如果resolve()收到一个不是promise的值，它会创建一个promise来传递这个值，如果resolve()收到一个promise，它就直接传递这个promise

同时，如果给resolve()传递一个具有then()的对象，resolve()会尝试将这个对象转成真正的promise对象，它会调用then()，然后根据then()的执行结果来决定新创建的promise的状态

所以这里都不用判断，return一个promise就解决了，，

## 4. Promise 解决了什么问题 ⭕️

1. 解决回调地狱问题，代码结构不清晰难维护

2. 提供了更优雅的方法 链式调用 来管理异步操作的状态和结果

3. 提供方便的错误处理，利用catch()捕获和处理异步操作中的错误

4. 提供了promise.all、promise.allSettled方便我们处理需要同时进行的多个异步操作

## 5. Promise.all 和 Promise.race 的使用场景

- Promise.all()成功的时候返回的结果数组和传入的数组里面的数据是一一对应的，
  可以用于：
  
  1. 并行执行多个异步操作
  
  2. 同时获取多个数据（例如同时请求多个接口） 

- Promise.race()哪个结果快就返回哪个，不管是成功还是失败
  可以用于：
  
  1. 竞速条件（多个异步操作中获取最快的结果）
  
  2. 超时控制（使用Promise.race()来竞争完成一个异步操作和一个计时器的promise，来实现如果规定时间没有完成异步操作就执行特定操作）

## 6. 对 async/await 的理解

async/await 可以让我们写出同步化代码，相比 promise then 的链式调用，提高了代码可读性
async 关键字可以声明一个函数是异步的，await 后一般是一个 promise 对象，函数会等待这个 promise 对象的状态变化，状态变为 resolved 了才会继续执行后面的代码，如果状态变为 rejectd 函数会中断执行
async 函数返回一个 promise 对象，如果在函数中 return 一个直接量，返回的promise 对象状态就是成功的，如果在函数中抛出异常，则返回的promise对象状态就是失败的。（如果没有返回值，则返回一个成功值为undefined的promise)

## 7. async/await 如何捕获异常

- try/catch（await 表达式放进 try 里）
- 在 await 表达式后接一个 catch()

## promise的值穿透和异常穿透

- 值穿透
  
  then()和catch()期望的参数是一个函数，传入非函数就会发生值穿透

```js
Promise.resolve(1)
.then(2)
.then(Promise.resolve(3)
.then(console.log)
// 1
```

```js
Promise.resolve(1)
.then(() => 2)
.then(() => Promise.resolve(3))
.then(console.log)
// 3
```

- 异常穿透

如果某个失败的promise的异常没有被捕获处理，就会继续向下传递到链中下一个catch或是then的失败回调中

```js
Promise.reject(1)
.then(res => console.log(res))
.then(res => console.log(res), error => console.log(err)) // 输出
.catch(err => console.log(err)) // catch就捕获不到了，已经在上面被捕获
```

## 8. 并发和并行的区别？⭕️

并发：多个任务在同一时间段内交替执行，在单核处理器上。

也就是实际上在同一时刻多个任务不会同时运行

并行：多个任务在同一时刻同时执行，通常在多核处理器上。

也就是多个任务可以在同一时刻同时运行

## 9. setTimeout、setInterval、requestAnimationFrame各有什么特点 ⭕️

setTimeout、setInterval不一定准时执行，因为js是单线程的，必须等主线程上的任务都执行完，才能执行它们的回调，如果在指定时间内遇到了阻塞耗时的代码，就可能导致它们的回调延迟执行

setInterval可能出现任务重叠问题，假设设定的时间间隔是100ms，每隔100ms执行一次回调，如果某次回调的执行时间超过了100ms，下一个任务将会立即开始执行，而不会等前一个任务完成，就造成了任务重叠，影响性能

requestAnimationFrame相较于setTimeout和setInterval，提供了更精确的定时执行。RAF基于浏览器的刷新频率进行回调的，并会自动进行节流和优化

# 面向对象

## 1. 对象创建的方式有哪些 ⭕️

1. 对象字面量  const obj = {}

2. 构造函数 new实例对象

3. 类 new实例对象

4. 工厂函数 
   
   缺点：创建出来的对象无法识别类型。对象标识不清晰。
   
   ```js
   function createPerson(name, age) {
       return {
           name,
           age,
       }
   }
   const p = createPerson('poem', 20)
   ```

5. Object.create()

## 2. js中继承的方式和多种优缺点 ⭕️

子类要拥有父类的全部属性和方法，同时子类还能定义自己特有的属性和方法
实现继承：

1. es6 使用 extends 关键字

2. 原型链继承
   父类的共享方法和属性都在父类的原型对象上，
   将子类的原型指向父类的实例对象，就可以通过父类的实例对象间接访问到父类的原型对象
   Child.prototype = new Parent()
   
   缺点：
   
   - 要将 Child.prototype.constructor 指回原来的构造函数
   
   - 不能继承父类的实例属性和方法
   
   - 子类的所有实例共享同一个父类实例，如果一个子类实例修改了引用类型的属性，其他实例也会被影响

3. 构造函数继承
   定义一个父构造函数和子构造函数，子构造函数中通过 call()继承父构造函数的属性
   
   引用类型的属性不会被所有实例共享
   
   缺点：不能继承父类原型上的属性和方法

```js
function Father(name, age) {
    this.name = name;
    this.age = age;
}
function Child(name, age, sex) {
    Father.call(this, name, age);
    this.sex = sex;
}
```

4. 组合式继承

原型链继承+构造函数继承

缺点：父类构造函数被调用两次，一次是通过 `new Parent()` 调用，一次是在 `Child` 构造函数内部调用。

5. 原型式继承

利用Object.create()创建一个原型指向为父类的对象

```js
const father = { xxx }
const child = Object.create(father)
```

缺点：

- 无法传递构造函数参数，因为Object.create不涉及构造函数调用

- 也存在引用类型的属性共享问题
6. 寄生式继承

在原型式继承的基础上，给新对象增加一些额外的方法和属性

```js
const father = { xxx }

function clone(father) {
    const child = Object.create(father)
    child.newFunction = function() {}
    return child
}
const child = clone(father)
```

缺点: 和👆一样

7. 寄生组合式继承

寄生式+组合式

目前最成熟

```js
function Father(name, age) {
    this.name = name;
    this.age = age;
}
function Child(name, age, sex) {
    Father.call(this, name, age);
    this.sex = sex;
}
// 使用Object.create()减少一次构造函数的调用
// 组合式继承中右边是new Father()
Child.prototype = Object.create(Father.prototype)
Child.prototype.constructor = Child
```

能实现继承父类的实例和原型上的属性和方法，**并且避免了组合继承中多次调用父类构造函数的问题**

# 垃圾回收与内存泄漏

## 1. 垃圾回收机制 ⭕️

垃圾回收：创建变量的时候给变量分配了内存，当变量不再用到，系统就会收回被占用的内存

垃圾回收机制：自动管理内存的一种机制，会自动识别和清理不再使用的内存空间，以便释放给系统重用

垃圾回收的策略：

1. 标记清除
   标记阶段：垃圾回收器从全局对象开始遍历，将所有能通过引用链访问到的对象标记为“存活”
   清除阶段：垃圾回收器清除掉没有被标记的对象，释放它们占用的内存空间

缺点：清除之后剩余的内存位置是不变的，就会出现很多内存碎片

2. 引用计数
   记录每个值被引用的次数
   声明一个变量并赋一个引用值时，这个值引用数为 1，如果有别的变量也赋了这个引用值，引用数+1，如果这个变量又被其他值覆盖了，引用数会减 1，一个值引用数为 0 的时候会被释放内存

缺点：循环引用问题
a 对象和 b 对象通过属性相互引用，它们的引用数都不会为 0，就没办法进行内存释放
解决：手动释放 赋值为 null

为了提高性能，减少垃圾回收：

优化数组：清空时将长度设为0，而不是赋值为一个新的空数组

优化object：不再使用的对象设置为null，加速回收

注意循环引用

## 2. 哪些情况会导致内存泄漏

不再用到的内存空间，没有被及时回收时，称为内存泄漏

- 意外的全局变量：在函数中给一个未声明的变量赋值，就会让他变成一个全局变量，函数执行完变量还会留在内存中

- 遗忘的定时器和事件监听，如果不手动清理，回调函数和函数里的变量都无法被垃圾回收

- dom引用，当引用了dom节点，即使移除dom节点，也会保留引用
  
  【如果置空了父节点，子节点仍然被引用，也会导致父节点无法被垃圾回收】

- 滥用闭包，闭包会导致函数中引用的变量一直保存在内存中，内存占用空间过大，会有内存泄漏的威胁

- 循环引用

## 3. 简述V8引擎的垃圾回收机制 ⭕️

(V8引擎作为js的执行引擎之一，会实现并优化上面的垃圾回收策略)

V8引擎将堆内存分为新生代和老生代。新生代存放的是大部分临时对象，而老生代存放的是存活时间较长的对象

新生代内存被分为From空间和To空间，From空间占满时就会进行垃圾回收

新生代垃圾回收的过程：先检查From空间的存活对象，如果存活则判断是否可以晋升到老生代，【晋升条件：1. 已经经历过一次垃圾回收 2.To空间内存占用超过25%】无法晋升则移动到To空间。回收所有非存活对象。对调From空间和To空间

老生代垃圾回收的过程：先进行标记-清除，标记所有存活的对象，标记结束后清除掉没有标记的对象。然后整理内存碎片，将存活的对象全部向一端移动。

由于js是单线程的，在进行垃圾回收的过程中，会暂停业务逻辑的执行。老生代相比新生代耗时会比较长，为了提高性能，引入了**增量标记**的方法，将一次标记任务分为多步，每执行完一步就执行一会应用逻辑，就这样交替进行。

·优点：

存活时间短的频率较高快速清理，存活时间长的频率较低清理，新老生代回收机制和频率不同，提高了垃圾回收的效率

# ts

## 1. 为什么要用ts

- 类型检查，可以在编译时就发现潜在的错误

- 编辑器中提供代码提示和自动补全

- 可维护性高，类型注解和接口定义有助于长期的维护

## 2. ts和js有什么区别

- ts引入了静态类型系统，编译器会在编译阶段检查类型错误。js的类型错误只有在运行时才能被发现

- 支持接口和类的定义

- 枚举

## 3. ts中的type和interface有什么区别

- interface只能定义对象类型，type可以定义基础类型、联合类型、交叉类型

- interface可以重复声明，会合并。type不可以

- interface通过extends来扩展接口，type通过交叉类型&来合并多个类型()

## 4. unknown和any的区别

unknown表示未知类型，可以是任意类型。不能直接对unknown类型进行操作，需要先通过类型检查或类型断言来缩小类型范围才能操作

any表示任何类型，可以直接对any类型进行操作，不会触发类型检查或编译错误

## 5. 有哪些方法告诉编译器unknown一定是某个类型

1. 类型断言

2. 使用typeof、instanceof等缩小unknown类型

## 6. 类型守卫

类型守卫用于在运行时确定变量的类型

类型守卫主要包括几种方式：

- typeof

- instanceof

- in

- 自定义类型守卫

## 7. 联合类型和交叉类型

联合类型：竖线|分割多个类型，表示变量可以是其中任意一个类型

交叉类型：与符&连接多个类型，表示变量包含这些类型的所有特性

## 8. 写一个函数类型

参数为string返回number，参数为number返回string

```typescript
type Func<T extends (...args: any) => any> 
= T extends (...args: infer P) => any ? (P extends string ? number : string) : never
```
