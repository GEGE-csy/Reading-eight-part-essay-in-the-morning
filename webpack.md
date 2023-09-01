# 对 webpack 的理解

webpack 是模块打包工具，可以使用webpack管理模块，分析模块之间的依赖关系，最终编译输出一个静态文件

webpack利用loader可以处理各种类型的资源，还提供了很多plugin来优化构建过程

# bundle、chunk、module 分别是什么

bundle： 打包生成的输出文件
chunk：code splitting过程中生成的文件块，由多个模块组合成

【打包代码时可以将文件切割成不同的chunk，实现按需加载】
module：模块，一个模块对应一个文件

# 说下 webpack 的 loader 和 plugin 的区别，都使用过哪些 loader 和 plugin

loader 

- 可以理解成一个转换器，将特定类型的文件(如css、图片等)转换成webpack可以处理的模块。【本质上是一个函数】

- babel loader将es6转成es5、css loader解析css文件、style loader将解析后的css注入页面、file loader用于处理文件

plugin

- 就是插件，可以扩展 webpack 的功能，可以在webpack整个打包过程中执行自定义的操作

- html-webpack-plugin根据模板生成html文件，并自动引入打包后资源、terser-webpack-plugin压缩代码、define plugin定义全局变量，编译时将常量替换到代码中

# webpack 的构建流程 ⭕️

- 初始化：从配置文件中读取并合并配置参数，根据参数初始化 Compiler 对象，加载 plugin
- 编译：根据配置中的 Entry 找出所有入口文件，从入口文件出发，调用所有的loader翻译Module，再找到该 Module 依赖的 Module，递归进行编译处理
- 构建：将编译后的Module 组合成一个个Chunk，并根据配置执行优化操作【比如压缩代码、合并模块等等】，再将 Chunk 转换成文件
- 输出：将文件写入指定的输出目录
  【在这个过程中 webpack 会在特定的时间点广播，plugin 监听自己关心的事件然后执行】

# webpack的热更新原理 ⭕️

这个机制可以做到不用刷新浏览器而将新模块替换旧模块

webpack通过websocket建立浏览器和dev server之间的连接，当本地资源发生变化的时候，dev server会向浏览器推送更新，并带上构建时的hash，让客户端和上一次资源对比，对比差异后会向dev server发起请求获取更新内容

# 说下tree-shaking的原理 ⭕️

tree-shaking通过代码分析和依赖关系来删除未使用的代码

构建工具收集导出变量并记录到依赖图，遍历依赖图标记导出变量有没有被使用，删除没有使用的导出变量

# babel 的原理

babel 是一个 js 编译器
babel 的编译过程分为 3 个阶段：

- 将代码解析成抽象语法树 ast
- 对抽象语法树做转换，遍历抽象语法树 ast 的节点，对抽象语法树 ast 进行增删查改
- 将转换后的抽象语法树再转成 js 代码

# webpack 和 vite ⭕️

- vite 服务器启动速度比 webpack 快，因为 vite 启动的时候不需要打包和编译
  当浏览器请求需要的模块时，再对模块进行编译
- vite 热更新比 webpack 快，当某个模块改变时，让浏览器去重新请求该模块即可，不像 webpack 要重新编译该模块的所有依赖

# 你知道哪些模块化标准? 说下cjs和esm的区别

commonjs(CJS)、es modules(ESM)、AMD、UMD

- cjs的require是同步加载，esm的import是异步加载
- cjs导出的是值的拷贝，esm导出的是值的引用

# 脚手架具体做了哪些事？

1. 项目初始化
   
   创建项目的目录结构和配置文件package.json

2. 依赖管理
   
   项目依赖存储在package.json中，脚手架可以根据配置文件来安装需要的依赖项

3. 配置管理
   
   配置构建工具、代码规范工具、风格配置等等

4. 开发调试
   
   提供了开发者服务器(dev server)，dev server可以在开发过程中进行热更新

5. 打包构建
   
   将项目的源代码转换成最终的静态文件

# webpack具体做了什么事？⭕️

- 依赖管理，解析入口文件和依赖的模块，构建依赖关系图

- 模块转换，使用loader对不同类型的资源进行转换

- 代码分割，将代码分割成多个chunk，按需加载chunk，减小初始加载的文件大小

- 资源压缩，压缩图片、js、css等等等

- 打包构建，将经过转换处理的资源打包成最终的静态文件

# webpack 做过哪些优化，开发效率方面、打包策略方面等等 ⭕️

- 增量构建，只重新构建发生变化的模块，而不是每次都重新构建整个项目

- 开发者服务器，快速启动一个本地开发环境

- source map，可以映射压缩后代码和源代码的对应关系，调试阶段很好定位错误

- tree shaking，清除无用代码，减小打包大小

- scope hoisting，合并模块的代码作用域

- code splitting，按需加载代码块，减小初始加载的包大小

- 文件指纹，文件名添加哈希值，以便进行缓存

# webpack怎样优化打包大小？

代码分割、压缩代码、压缩图片、按需加载第三方库、tree shaking

# webpack怎样提高打包速度？

优化loader【babel-loader开启缓存】【cache-loader缓存性能开销大的loader的结果】

多进程打包【thread-loader】【happypack在webpack5已弃用】

压缩代码

# Webpack的hash值？（文件指纹）

- hash
  
  任何一个文件改变，整个项目的的构建hash值变化

- chunk hash
  
  文件的改动只会影响其所在chunk的hash值

- content hash
  
  文件的改动只会影响自身的hash值

# A、B 两个条件组件，如何做到 webpack 只打包条件为 true 的组件，false 的组件不打包

动态引入+条件判断

```js
if(condition) {
    import('./moduleA').then(module => {
        // 使用moduleA
    })
} else {
    import('./moduleB').then(module => {
        // 使用moduleB
    })
}
```

# 前端怎么做单元测试？

- 安装测试框架和断言库
  
  测试框架jest、mocha等，断言库chai、expect等

- 编写测试样例，使用断言库进行断言

- 运行测试样例，调试错误

- 持续集成，使用持续集成工具集成代码，确保代码提交后自动进行单元测试
