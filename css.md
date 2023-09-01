# 1.样式优先级规则

!important >
内联样式 1000 >
id 选择器 100 >
类/伪类/属性选择器 10 >
标签/伪元素选择器 1 >
子选择器/通配符选择器/相邻选择器

# 2.可继承和不可继承属性

有继承性的属性：

- 字体系列属性：font-
- text-align、line-height、color、..
- visibility..

无继承性的属性：

- 盒模型的属性：width、height、margin、border、padding
- 背景属性：background、background-color
- 定位属性：float、position、top、right、bottom、left
- display

# 3.display 的 block、inline、inline-block 的区别

- block 独占一行，可以设置 width、height、margin、padding 属性
- inline 不会独占一行，设置 width、height 无效。可以设置水平方向的 margin、padding，不能设置垂直方向的
- inline-block 不会独占一行，可以设置 width、height、margin、padding 属性

# 4.隐藏元素的方法

- display:none，元素在页面中不会占据位置，不会响应绑定的监听事件
- visibility:hidden，元素在页面中占据位置，不会响应绑定的监听事件
- opacity:0，元素在页面中占据位置，**会响应绑定的监听事件**
- transform: scale(0,0)，元素在页面中占据位置，不会响应绑定的监听事件

# 5.display:none 和 visibility:hidden 的区别 ⭕️

1. display:none 会让元素从渲染树中消失，渲染时不会占据空间

    visibility:hidden 不会让元素从渲染树中消失，渲染的元素还会占据空间

2. display:none 是不可继承属性

    visibility:hidden 是继承属性

3,修改 display 属性会引起文档的重排

    修改 visibility 属性只会引起本元素的重绘

# 6.link 和@import 的区别

都是外部引用 css 的方式，区别：
link 引入 css 时，在页面载入时同时加载
@import 在页面完全载入后再加载

# 7.伪元素和伪类的区别和作用？

伪元素：用于在一个元素前后插入额外的元素或样式，不会在文档中生成
伪类：把特殊的效果加到选择器上，可以用于给元素的一些状态（比如 hover 就是鼠标触摸到元素）添加样式

# 8.对盒模型的理解

盒模型有两种：标准盒模型、ie 盒模型
由四个部分组成：content、padding、border、margin
标准盒模型和 ie 盒模型的区别在于设置 width 和 height 时对应的范围不同：

- 标准盒的 width 和 height 只包括了 content
- ie 盒的 width 和 height 包括了 content、padding、border
  可以通过修改 box-sizing 属性来改变盒模型：
- 值 content-box 设为标准盒
- 值 border-box 设为 ie 盒

# 9.对 CSSSprites 精灵图的理解

精灵图：把许多图片包含在一张大图中去，利用 css 的 background-image、background-repeat、background-position
等属性进行定位
优点：能减少网页请求，提高页面性能

# 10.设备像素、设备独立像素、css 像素、dpr，为什么在移动端开发时需要用到@3x, @2x 这种图片？

设备像素(物理像素)：一个设备屏幕实际拥有的像素点，设备出厂后就无法改变
设备独立像素(逻辑像素)：手机的实际视口 viewport 大小
css 像素：css 中用的 px 就是 css 像素，**不考虑缩放**的时候 1 个设备独立像素=1 个 css 像素

dpr：设备像素 ：设备独立像素
（物理像素）（逻辑像素）
1:1 => 1 个物理像素显示 1 个逻辑像素
2:1 => 4 个(长 2 倍宽 2 倍)物理像素显示 1 个逻辑像素
3:1 => 9 个物理像素显示 1 个逻辑像素
比如 iphone6 的物理像素是 `750 * 1334`，逻辑像素是 `375 * 667`，dpr=2

对于图片来说，为了不失真，1 个物理像素要显示1 个图片像素
假设用来显示图片的设备的物理像素是图片像素的 2 倍，比如物理像素 200000，但图片像素只有 100000，
那剩下的 100000 物理像素只能就近取色来填充图片，就会看起来模糊
所以要采用 2 倍图来保证不失真

# 11.css 预处理器/后处理器是什么？为什么要用？

预处理器：less、sass，用来预编译 less 或 sass，提高 css 代码的复用性，可以使用层级、变量
后处理器：postcss，最常做的给 css 属性添加浏览器私有前缀，解决跨浏览器的兼容性问题

# 12.单行、多行文本溢出隐藏

单行：

```css
overflow: hidden;
text-overflow: ellipsis;

white-space: nowrap;
```

多行：

```css
overflow: hidden;
text-overflow: ellipsis;

display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
```

# 13.对媒体查询的理解？

可以针对不同的设备和不同的屏幕尺寸设置不同的样式

# 14.对 css 工程化的理解 ⭕️

采用一些规范和工具来管理css代码，

提高css代码的可维护性、复用性，减小代码体积之类的

比较流行的 css 工程化实践：

- 预处理器：less、sass 等（将类 css 语言编译成 css，提高 css 代码复用性，更好维护

- 代码规范和css风格检查：eslint、stylelint

- postcss（编译还不被浏览器支持的 css 语法，添加浏览器私有前缀

- 自动化构建工具：比如webpack，压缩代码、优化css文件体积和性能

- 样式复用：使用Tailwind css、unocss等css框架，封装常用的样式，来实现样式的复用
  
  *webpack loader（webpack 在 loader 的辅助下才能处理 css
  **如何用 webpack 实现对 css 的处理？**
  css-loader 和 style-loader，
  css-loader 导入 css 模块，编译 css 代码
  style-loader 创建 style 标签，把 css 内容写入标签
  css-loader 执行顺序一定要在 style-loader 前面

# 15.如何判断元素是否到达可视区域？

1. window.innerHeight：浏览器可视区高度
   document.body.scrollTop || document.document.scrollTop：浏览器滚动过的高度
   img.offsetTop：图片顶部到浏览器顶部的距离

   img.offsetTop < window.innerHeight + document.body.scrollTop

2. getBoundingClientRect()获取元素相对于视口的位置

3. intersection observer交叉观察器，观察目标元素和可视窗口的交叉区域，当目标元素进入和离开可视区域都会触发相应的回调函数

# 16. px、em、rem 的区别和使用场景

px 是固定的像素，无法适应页面大小而改变
em 和 rem 更灵活，em 相对于父元素，rem 相对于根元素，它们更适用于响应式布局

使用场景：需要适配各种移动设备的使用 em 和 rem

# 17.实现两栏布局（左边固定，右边自适应

- 左边浮动，右边 margin-left 为左边宽度
- 左边浮动，右边 overflow:hidden(右边触发了 bfc
- 左边绝对定位，右边 margin-left 为左边宽度
- 左边绝对定位，右边也绝对定位，设置 left 值为左边宽度
- 容器设置 flex，左边固定宽度，右边 flex:1

# 18.实现三栏布局（左右宽度固定，中间自适应

- 左右绝对定位，中间设置 margin-left 和 margin-right 分别为左右的宽度
- 容器设置 flex，左右固定宽度，中间 flex:1
- 左边左浮，右边右浮，中间设置 margin-left 和 margin-right 分别为左右的宽度，中间必须放在最后

# 19.实现圣杯布局和双飞翼布局

圣杯布局：
父元素 outer 设置左右 padding 为左右 left、right 子元素的宽度
中左右全部左浮，并且中间 center 放最前面，中间宽度为父元素宽度，左右会被挤到下一行
左右设置 margin 负值，margin-left 负值向左移，margin-right 负值向右移
左 margin-left: -100% (100%指的是父元素的宽度)
右 margin-left:-自身宽度
然后左右设置相对定位，分别向左和向右移动自身宽度

双飞翼布局：
父元素 outer 不用设置左右 padding（和圣杯不同
中左右全部左浮，并且中间 center 放最前面，中间宽度为父元素宽度，左右会被挤到下一行（和圣杯一样
左右设置 margin 负值，（和圣杯一样
左 margin-left: -100%
右 margin-left:-自身宽度
左右不用设置相对定位移动，（和圣杯不同
但是会发现中间 center 的内容看不见，要在中间 center 再嵌套一个子元素 content，并设置子元素的左右 margin 为左右 left、right 的宽度

# 20.水平垂直居中的实现

- 绝对定位，left50%，top50%，transform: translate(-50%,-50%)
- 绝对定位，left50%，top50%，margin-left 和 margin-top 自身一半负值
- 绝对定位，left0，right0，top0，bottom0，margin:auto，**必须有宽高**
- flex 布局，justify-content 和 align-items 设为 center

# 21.对 flex 布局的理解

把一个元素的 display 属性设置为 flex，可以使它成为一个 flex 容器，它的所有子元素都会成为它的项目
一个容器默认有两根轴：一个是水平的主轴，一个是和主轴垂直的交叉轴
可以使用 flex-direction 指定主轴的方向
使用 justify-content 指定在主轴上的排列方式，使用 align-items 指定在交叉轴上的排列方式
flex-wrap 指定换行方式
项目可以使用 order 属性来指定项目的排列顺序

# flex: 1 是哪些属性的缩写，对应属性代表什么含义

flex-grow：1、弹性盒的伸展比例，子元素宽度小于父元素时，剩余部分进行放大的比例
flex-shrink: 1、弹性盒的收缩比例，子元素宽度大于父元素时，超出部分进行缩小的比例
flex-basis: 0%、弹性盒的初始宽度，basis 和 width 同时存在时 width 无效

# 22.响应式设计

响应式设计是一个网站能兼容多个终端，而不是为每个终端做一个特定的版本（这是自适应）

原理：通过媒体查询检测不同的设备屏幕尺寸做不同的处理

# 23.清除浮动的方式

- 给父元素添加 height 属性
- 给父元素添加 overflow:hidden
- 给父元素添加一个清除浮动类，利用::after 伪元素

```css
.clear::after {
    content: "";
    display: block;
    clear: both;
}
```

（clear 只对块级元素有效，而伪元素都是内联元素）

# 24.使用 clear 属性清除浮动的原理

clear 不是清除掉浮动，是清除浮动元素对某元素的影响
比如 clear: left 就是元素的左边不允许出现浮动元素
clear 属性是只对前面的浮动元素起作用，对后面的浮动元素不起作用

# 25.对 BFC 的理解？⭕️

BFC：块级格式化上下文，是页面中的一块渲染区域，有自己的渲染规则
创建 BFC：（满足任 1

- 根元素 html（body 不是）(给 body 设置 margin-top,html 不会跟着塌陷，给 body 里的 div 设置 marin-top，body 会跟着塌陷)
- float：不为 none
- position: absolute/fixed
- overflow：不为 visible
- display: flex、inline-block、table 等

BFC 的特点：

- 每个 BFC 区域只包括其子元素，不包括其子元素的子元素（**也不包含自身**）
- 计算 BFC 高度时，浮动的子元素也会参与计算（避免父元素高度坍塌）
- BFC 不会和浮动元素发生重叠
- BFC 是独立容器，里外元素不会相互影响（避免父子 margin 重叠）

BFC 的一些作用：

- 解决 margin 的重叠问题：BFC 是独立区域，内部和外部元素不会互相影响
- 解决父元素高度坍塌问题：子元素设置浮动后，父元素会发生高度坍塌（高度变为 0，解决可以把父元素变成 BFC
- 创建自适应两栏布局：左边宽度固定，右边自适应，左边左浮，然后右边设置 overflow:hidden 触发 bfc，bfc 的特性就是不会和浮动元素重叠

# 26. margin 塌陷问题和 margin 重叠(合并)问题、解决

margin 塌陷问题：父子元素之间没有内边距或边框隔开时，他们的上边距或下边距相遇会合并为一个外边距
margin 重叠问题：两个相邻的兄弟元素之间的上下外边距相遇会合并为一个外边距

大小都是取外边距大的那个

**解决方法：**

塌陷问题：

- 父：给父设置 border 或 padding
- 父: 激活父的 BFC，overflow/float/absolute/fixed/inline-block/flex...

重叠(合并)问题：

- 下面的：float/absolute/fixed/inline-block
- 将任一放入 bfc 区域中（加一个设置了 bfc 的父元素嵌套）

# 27.position 属性有哪些

- relative：相对自身位置定位，不会脱离文档流
- absolute：相对于离自己最近的设置了 relative/absolute/fixed 的元素定位，
  如果没找到就相对于 body 定位，脱离文档流
- fixed：相对于 window 定位，脱离文档流
- sticky: 超过特定阈值前为 relative，超过后为 fixed

# 28.display、float、position 的关系

优先级：
position: absolute/fixed > float > display

（作用于同一元素上时）

# 29.重排(回流)和重绘的理解 ⭕️

重排(回流)：
发生重排时，浏览器会重新计算元素的位置和大小和布局，并更新渲染树，然后将新的布局信息应用到页面的元素上，这可能会影响其他元素重新排列 （更新了元素的几何属性(元素的位置和大小)）

重绘：
在重排之后，浏览器根据新的布局信息重新绘制页面元素，并不需要重新计算元素的布局和位置 （更新了元素的绘制属性(元素的外观)）

重排必定引发重绘，重绘不一定引发重排

重排涉及到布局计算、dom更新等操作，会消耗较多的计算资源

# 30.获取布局信息，没有改变元素的几何属性为什么会触发重排？

浏览器为了优化重排过程，会把修改操作都放到一个队列里，然后一次性执行，尽量避免重复渲染
但是获取布局信息的操作会强行清空队列，因为队列里有可能会影响布局信息的操作，
所以为了返回准确的数据，浏览器会立即进行重排

# 31.实现一个三角形

```css
width: 0
height: 0
border-bottom: 50px solid red;
border-right: 50px solid transparent;
border-left: 50px solid transparent;
```

绘制一个顶点朝上的三角形
(顶点对边设置颜色，邻边设置透明色)

# 32.如何解决 1px 问题 ⭕️

在一些Retina屏幕上，移动端页面的 1px 会变得很粗，呈现出不止 1px 的效果
因为 css 中的 1px 不等于移动设备上的 1px
常说的二倍屏指，dpr=2，物理像素/逻辑像素 = 2，也就是每 2 个物理像素显示一个逻辑像素（一个方向上）。这就意味着1px的css像素，在设备上会用2个物理像素来渲染，实际看到的就会比1px粗一些

解决：**利用 meta 标签里的 viewport 来解决，设置 initial-scale 的值为 1/dpr**

`initial-scale`是缩放值，缩放时元素的 css 像素数量不会变，（只是 css 像素大小改变），逻辑像素数量会变
比如一个元素 width:128px，原来宽度为 128 个 css 像素，也就是 128 个逻辑像素。缩放了 0.5 倍，宽度就变成 64 个 逻辑像素了，但依然是 128 个 css 像素

css像素个数 = 逻辑像素个数 / scale = (物理像素个数 / dpr) / scale 

得到css像素个数 = 物理像素个数

所以我们就将`initial-scale`的值设置为`1/dpr`就可以解决问题

```javascript
const scale = 1 / window.devicePixelRatio;
// 这里 metaEl 指的是 meta 标签对应的 Dom
metaEl.setAttribute(
    "content",
    `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`
);
```

副作用：一些原本不需要被缩小的内容，比如文字、图片等，也被无差别缩小掉了。
