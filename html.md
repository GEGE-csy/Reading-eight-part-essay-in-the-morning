# src 和 href 的区别

共同点：src 和 href 都是用来引入外部的资源
区别：

- src：
  当浏览器遇到 src，会暂停其他资源的下载，直到将 src 指向的资源加载执行完
  （为什么 script 标签放在底部而不是头部）
- href:
  当浏览器遇到 href，会并行下载资源，不会停止其他资源的下载

# 对 html 语义化的理解

语义化：根据网页内容来选择合适的标签
头部用 header、导航用 nav、底部用 footer、主体内容用 main，侧边栏用 aside
优点：

- 有利于 seo，语义化标签有助于爬虫爬取到更多的有效信息
- 代码增加可读性

# DOCTYPE（文档类型）的作用

一种文档类型声明，目的是告诉浏览器应该以什么样的**文档类型**来解析文档
浏览器渲染页面的两种模式:

- CSS1Compat：标准模式，默认模式，浏览器以其支持的最高标准呈现页面
- BackCompat：怪异模式，页面以一种比较宽松的向后兼容的方式显示

# script 标签中 defer 和 async 的区别

defer 和 async 都是异步加载外部的 js 文件，
如果没有 defer 和 async 属性，浏览器读到脚本就会立刻加载和执行，这样会阻塞后面 html 的解析

- defer：不会阻塞 html 的解析，加载完 js 脚本之后也会等到 html 解析完再执行 js 脚本
  按顺序执行
- async：可能会阻塞 html 的解析，加载完 js 脚本就会立刻执行 js 脚本，（执行的时候可能会阻塞
  不能保证按顺序执行

# 常用的 meta 标签

常用的：`http-equiv`属性、`name`属性、`charset`属性

name 属性主要用来描述网页，对应的属性值是`content`
name="keywords" content="具体的 keywords"
name="description" content="具体的 description"

http-equiv 属性可以模拟 http 响应头，对应的`content`属性就设置具体的头信息
http-equiv="content-type" content="text/html"

# html5 有哪些更新

1. 语义化标签
   header、nav、footer、aside
2. 媒体标签
   audio 音频、video 视频
3. localStorage、sessionStorage
4. canvas
5. websocket

# img 的 srcset 属性的作用

用于响应式页面中根据屏幕密度设置不同的图片
`<img src="image-128.png" srcset="image-256.png 2x" />`
使用上面的代码，就能实现在屏幕密度为 1x 的情况下加载 image-128.png, 屏幕密度为 2x 时加载 image-256.png

srcset 可以指定图片的地址和对应的图片质量

# 空(void)元素有哪些

没有闭合标签的元素
br hr img

# 说一下 web worker

web worker 可以给 js 创造多线程运行环境
主线程可以创建 worker 线程，分配任务给 worker 线程，主线程执行的同时 worker 线程也在执行，互不干扰
worker 线程执行结束后把结果返回给主线程
这样的好处是主线程可以把执行耗时的任务交给 worker 线程执行，GUI渲染线程和js引擎线程（主线程）互斥，如果主线程执行之间过长会阻塞页面渲染

# html5 的离线存储

启用离线缓存，在 html 标签中添加`manifest`属性
`<html manifest="demo.appcache">`
指定了 manifest 属性的页面在用户访问时会被缓存，
manifest 文件的扩展名是`.appcache`

# iframe 有哪些优点和缺点？

iframe 可以用来在一个网页里嵌入别的网页
优点：

- 如果有多个网页嵌入了同一个 iframe，修改 iframe 的内容可以实现每个网页的更改
- iframes允许从一个域中加载另一个域的内容。可以在网页中嵌入第三方内容

缺点：

- 面临跨站脚本攻击xss安全问题
- 无法被搜索引擎识别到，不利于网站的 seo
- 会阻塞window.onload事件

# canvas 和 svg 的区别

- svg：基于矢量的，使用XML语言描述图形，不依赖分辨率，支持事件处理器
  
  canvas：基于像素的，提供了一个画布，通过js来绘制图形，依赖分辨率，不支持事件处理器

- canvas更适合处理复杂动态的图形，处理大量复杂图形的性能更好。svg更适合静态简单的图形

# 浏览器乱码的原因是什么？

- 网页使用的编码和浏览器默认的编码不匹配，出现乱码

- 某些字符集可能在浏览器上没有被完全支持，导致字符无法正确显示

# 渐进增强和优雅降级之间的区别

渐进增强：针对低版本浏览器，保证基本功能的情况下，再针对高级浏览器追加功能
优雅降级：一开始就构建完整的内容，然后再针对低版本浏览器进行兼容
