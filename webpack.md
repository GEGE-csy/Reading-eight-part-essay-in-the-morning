# 对 webpack 的理解

webpack 就是打包模块化 js 的工具，在 webpack 中一切文件都是模块
webpack 要经过一系列处理流程，它通过 loader 转译文件，通过 plugin 注入钩子
最后输出由多个模块组合成的文件

# bundle、chunk、module 分别是什么

bundle：由 webpack 打包出来的文件
chunk：一个 chunk 由多个模块组合成
module：模块，一个模块对应一个文件

# 有哪些常见的 loader？

image-loader、加载并压缩图片
babel-loader、将 es6 转换成 es5
sass-loader、将 sass 代码转换成 css
eslint-loader、通过 eslint 检查 js 代码

# 有哪些常见的 plugin？

uglifyjs-webpack-plugin、压缩代码
html-webpack-plugin、自动生成 index.html 文件并引入打包好的 bundle.js
clean-webpack-plugin、打包的时候自动删除上一次打的包

# loader 和 plugin 的区别？

- loader 本质上是一个函数，在函数中对接收到的内容进行转换，返回转换后的结果
  webpack 只认识 js，loader 就要对其他类型的资源做转译
- plugin 就是插件，可以扩展 webpack 的功能，实现 loader 无法实现的功能
- loader 在 rules 中配置，plugin 在 plugins 中单独配置

# webpack 的构建流程

- 从配置文件中读取合并配置参数，加载 plugin，初始化 Compiler 对象
- 根据配置中的 Entry 找出所有入口文件，从入口文件出发，针对每个 Module 调用相应的 loader 翻译内容，再找到该 Module 依赖的 Module，递归进行编译处理
- 将编译后 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中
  在这个过程中 webpack 会在特定的时间点广播，plugin 监听自己关心的事件然后执行

# babel 的原理

babel 是一个 js 编译器
babel 的编译过程分为 3 个阶段：

- 将代码解析成抽象语法树 ast
- 对抽象语法树做转换，遍历抽象语法树 ast 的节点，对抽象语法树 ast 进行增删查改
- 将转换后的抽象语法树再转成 js 代码

# webpack 和 vite

- vite 服务器启动速度比 webpack 快，因为 vite 启动的时候不需要打包，就不需要编译
  当浏览器请求需要的模块时，再对模块进行编译
- vite 热更新比 webpack 快，热更新的时候当某个模块改变时，让浏览器去重新请求该模块即可，
  不像 webpack 要重新编译该模块的所有依赖
