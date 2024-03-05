/**
 * / 正则表达式的组成：
 * /- 元字符
 *    /- 量词元字符
 *      * 零到多次
 *      + 一到多次
 *      {n,m} n到m次
 *   / - 特殊元字符
 *      ^    以哪个元字符开头
 *      $    以哪个元字符结尾
 *     \d    0-9的一个数字
 *     x|y   x或y中的一个字符
 *     [xyz] x或y或z中的一个字符
 *     [a-z] 指定a-z这个范围的任意字符
 * /- 修饰符 放在正则表达式的外面
 *    i 忽略大小写匹配
 *    / g 全局匹配 如果不加的话查找到第一个匹配项就会停止
*/

/**
 * / * 和 $ 
 * 为了严谨一般都要加这两个元字符
*/

/// 以数字开头的字符串
let reg1 = /^\d/
console.log(reg1.test('a1234')) // false
console.log(reg1.test('123')); // true 这里实际上匹配到开头为1

/// 以数字结尾的字符串
let reg2 = /\d$/
console.log(reg2.test('45aa')); // false
console.log(reg2.test('a123')); // true 这里实际上匹配到结尾为3

/// 以0-9的一个数字开头并结尾的字符
let reg3 = /^\d$/
console.log(reg3.test('123')) // false \d是0-9的一个数字，如果要多个数字要添加量词修饰符
console.log(reg3.test('2')) // true

/// 字符串中包含0-9的一个数字即可
let reg4 = /\d/
console.log(reg4.test('aa123aa')) // true 

/**
 * / x|y 
 * 一般配合小括号分组使用，单独使用会存在优先级问题
*/
/// 可能会匹配到：18开头或29结尾，1开头 8或2 9结尾 有多种匹配
let reg5 = /^18|29$/
console.log(reg5.test('18')) // true
console.log(reg5.test('129')) // true

/// 匹配18或29
let reg6 = /^(18|29)$/

/**
 * / [] 
 * 中括号里的字符一般就代表他本身的意义，比如 . 就是小数点 而不是代表除了换行符的任意字符
 * \d在中括号里仍然是0-9
 * [xyz]代表x或y或z
 */
//下面的‘.’就是小数点的意思
let reg7 = /^[.]+$/; // 和/^\.+$/ 转义符一个作用。 +代表一个或多个
console.log(reg7.test('...')) // true

// 匹配@或+ ，下面的+就是一个+的符号
let reg8 = /^[@+]$/
console.log(reg8.test('@')) // true
console.log(reg8.test('@@')) // false 没用量词元字符，默认就是只能一个

/// 匹配的含义是：1 或者 0~2 或者 9 注意这里可不是10～29！！
let reg9 = /^[10-29]$/;
console.log(reg9.test('10')); // false 
// 这个匹配的含义就是1～9 他是只识别单个字符。。
let reg10 = /^[1-9]$/
console.log(reg10.test('9'))
// 这个匹配的含义是10～29
let reg14 = /^[1-2][0-9]$/
console.log('14', reg14.test('27'))

/**
 * / {n,m}
 * 代表前面的元字符出现n到m次
*/
// 匹配数字出现2-4次
let reg11 = /d{2,4}/
console.log(reg11.test('1')) //false

/**
 * / g 全局匹配模式
 * 修饰符 放在表达式后面
*/
let reg12 = /abcd/
console.log('abcdabcd'.match(reg12)) // ['abcd']
// 使用全局匹配，能匹配到多个项，否则找到第一个就停止搜索了
let reg13 = /abcd/g
console.log('abcdabcd'.match(reg13)) // ['abcd', 'abcd']

