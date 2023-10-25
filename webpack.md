# 对 webpack 的理解

webpack 是模块打包工具，可以使用webpack管理模块，分析模块之间的依赖关系，最终编译输出一个静态文件

webpack利用loader可以处理各种类型的资源，还提供了很多plugin来优化构建过程

# bundle、chunk、module 分别是什么

bundle：打包生成的输出文件
chunk： webpack打包的时候，会根据文件引用关系（从入口开始，逐个打包）逐个打包module，这些module就形成了一个chunk

【如果有多个入口文件，会有多条打包路径，一个路径形成一个chunk】
module：模块，一个模块对应一个文件

# chunk vs bundle

大多数情况下，一个chunk生产一个bundle，但有时候不是

如果把devtool配置成source-map，只有一个入口文件，会产生一个chunk和两个bundle（一个.js一个.js.map）

chunk是过程中的代码块，bundle是结果的代码块

# 产生chunk的三种途径

1. entry入口
   
   entry产生chunk：
   
   - 传递一个字符串：`entry:'./src/main.js'`产生一个chunk
   
   - 传递数组：`entry:['./src/main.js', './src/other.js']`产生一个chunk
   
   - 传递对象：对象中一个字段就生成一个chunk，产生两个chunk
     
     ```js
     entry: {
         main: './src/main.js',
         other: './src/other.js'
     },
     output: {
         path: __dirname + '/public',
         filename: "[name].js"    // 这里不能是'bundle.js'，一个不够用
     }
     ```

2. 异步加载模块
   
   比如使用import或者require.ensure在运行时动态加载模块，也会生成chunk

3. 代码分割
   
   在webpack.config.js中配置
   
   ```js
   module.exports = {
       optimization: {
           splitChunks: {
               chunks: 'all',    // 所有模块都可以被分割
               cacheGroups: {} // 配置缓存组，为不同类型的模块创建不同的chunk
           }
       }
   }
   ```

# 说下 webpack 的 loader 和 plugin 的区别，都使用过哪些 loader 和 plugin

loader 

- 可以理解成一个转换器，将特定类型的文件(如css、图片等)转换成webpack可以处理的模块。【本质上是一个函数】【默认情况下webpack只支持处理js和json文件】

- babel loader将es6转成es5

- css loader解析css文件

- style loader将解析后的css注入页面

- vue loader用于vue单文件组件、ts loader将ts文件编译为js
  
  【注意loader执行顺序，从后往前执行，style-loader必须放在css-loader前面】

plugin

- 就是插件，可以扩展 webpack 的功能，可以在webpack整个构建过程中执行自定义的操作

- html-webpack-plugin根据模板生成html文件，并自动引入打包后资源

- compression-webpack-plugin压缩资源文件(gzip、brotli)

- hot-module-replacement-plugin启用热模块替换，不刷新页面的情况下更新模块

区别：

- 👆作用不一样

- 运行时机：loader运行在打包文件之前，plugin是在整个周期都起作用

- 配置：loader配置在module.rules中，plugin配置在plugins中

# webpack 的构建流程 ⭕️

- 初始化：从配置文件中读取并合并配置参数，根据参数初始化 Compiler 对象，加载 plugin
- 编译：根据配置中的 Entry 找出所有入口文件，递归地解析入口文件及依赖，构建整个依赖图。调用所有的loader翻译Module。
- 构建：根据依赖关系，将编译后的Module 组合成一个个Chunk，再将 Chunk 转换成文件
- 输出：将文件写入指定的输出目录
  【在这个过程中 webpack 会在特定的时间点广播，plugin 监听自己关心的事件然后执行】

# webpack的热更新原理 ⭕️

这个机制可以做到不用刷新浏览器而将新模块替换旧模块

热更新的核心是客户端从服务端拉取chunk diff(chunk需要更新的部分)，webpack-dev-server和浏览器之间维护了一个websocket，当本地资源发生变化的时候，dev server会向浏览器推送更新，并带上构建时的hash，让客户端和上一次资源对比，对比出差异后会向dev server发起请求获取更新内容

# 说下tree-shaking的原理 ⭕️

静态分析js模块的依赖关系，收集导出变量并记录到依赖图，遍历依赖图，标记没有使用过的导出变量，删除有标记的导出变量

# babel 的原理

babel 是一个 js 编译器

将使用了最新js特性的代码转译成向后兼容的js代码
babel 的编译过程分为 3 个阶段：

- 使用parser将代码解析成抽象语法树 ast，解析一般分为词法分析和语法分析
  
  【词法分析：将js代码转为标记tokens】【语法分析：将tokens组合成ast】

- 使用traverse对ast进行遍历，调用插件来转译，对ast 进行增删查改

- 使用generator将转换后的ast再转成代码字符串

# webpack 和 vite ⭕️

- vite 服务器启动速度比 webpack 快，因为 vite 启动的时候不需要打包和编译
  当浏览器请求需要的模块时，再对模块进行编译
- vite 热更新比 webpack 快，当某个模块改变时，让浏览器去重新请求该模块即可，不像 webpack 要重新编译该模块的所有依赖

【vite解析模块依赖关系使用了esbuild，使用go编写，比js编写的打包器构建依赖快10-100倍】

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

# webpack 做过哪些优化，开发效率方面、打包策略，构建速度等等 ⭕️

开发效率：

- dev server，快速启动一个本地开发环境

- source map，可以映射压缩后代码和源代码的对应关系，调试阶段很好定位错误

优化打包大小：

- 压缩代码，terser-webpack-plugin。mini-css-extract-plugin压缩css
  
  【webpack4默认开启压缩，进一步调整压缩可以用plugin】

- tree shaking，清除无用代码，减小打包大小

- scope hoisting，合并模块的代码作用域

- 代码分割，按需加载代码块，减小初始加载的包大小【配置splitChunks】

优化构建速度：

- thread-loader开启多进程打包【happypack在webpack5已弃用】

- 优化loader，babel-loader排除解析node_modules相关依赖，开启缓存

- 配置externals选项，将一些依赖改成cdn方式引用，这些依赖就不会包括在输出文件中

# webpack proxy为什么可以解决跨域？



# Webpack的hash值？（文件指纹）

- hash
  
  任何一个文件改变，整个项目的的构建hash值变化

- chunk hash
  
  文件的改动只会影响其所在chunk的hash值

- content hash
  
  文件的改动只会影响自身的hash值

# gulp、grant和webpack的区别

gulp、grant基于任务，对一个文件进行一系列链式操作，整条链式操作就是一个任务，多个任务就构成了整个构建流程。我们只需要定义任务，让gulp执行这些任务

webpack基于模块，它会根据入口，递归解析从入口找到的所有文件，用loader处理不同的文件

类似于webpack的工具：vite、rollup

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
