# 对 webpack 的理解

webpack 将所有的资源都看成是模块，给定一个或多个入口文件，webpack从这些入口文件开始找到所有的依赖文件，然后将各个依赖文件通过loader和plugin处理后打包到一起，最终输出一个静态文件

# webpack解决什么问题

模块化管理和资源打包优化问题。传统前端开发使用全局变量和脚本标签引入文件容易导致命名冲突代码难维护。

# bundle、chunk、module 分别是什么

- bundle：打包生成的输出文件

- module：模块，一个模块对应一个文件

- chunk： chunk是module的集合，webpack打包的时候会从入口文件开始，根据依赖关系逐个处理module，chunk就是由这些module组成的。如果有多个入口文件，会有多条打包路径，一个路径就会形成一个chunk。除了入口entry会生成chunk，异步加载模块和代码分割也会生成chunk】

# chunk vs bundle

大多数情况下，一个chunk生产一个bundle，但有时候不是

如果把devtool配置成source-map，只有一个入口文件，会产生一个chunk和两个bundle（一个.js一个.js.map）

chunk是过程中的代码块，bundle是结果的代码块

# 产生chunk的三种途径

1. entry入口
   
   entry产生chunk：
   
   - 传递一个字符串：`entry:'./src/main.js'`产生一个chunk
   
   - 传递数组：`entry:['./src/main.js', './src/other.js']`产生一个chunk【多入口合并成一个chunk】
   
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
- 编译：根据配置中的 Entry 找出所有入口文件，针对每个module调用对应的loader翻译文件内容，再找到该module依赖的module，递归进行编译处理
- 构建：根据依赖关系，将编译后的Module 组合成一个个Chunk，再将 Chunk 转换成文件
- 输出：将文件写入指定的输出目录
  【在这个过程中 webpack 会在特定的时间点广播，plugin 监听自己关心的事件然后执行】

# webpack的热更新原理 ⭕️

这个机制可以做到不用刷新浏览器而将新模块替换旧模块

webpack-dev-server和浏览器之间维护了一个websocket，dev server监听模块变化，当有模块发生变化的时候，dev server对模块重新构建，并生成一个hash值，然后向浏览器推送更新，浏览器对比上一次hash值，对比出差异后会向服务器请求更新的内容

# 说下tree-shaking的原理 ⭕️

静态分析模块的依赖关系，构建模块之间的依赖树。

标记所有未引用的代码

从输出文件中删除未引用的代码

# babel 的原理

babel 是一个 js 编译器

将使用了最新js特性的代码转译成向后兼容的js代码
babel 的编译过程分为 3 个阶段：

- 使用parser将代码解析成抽象语法树 ast，解析一般分为词法分析和语法分析
  
  【词法分析：将js代码转为标记tokens】【语法分析：将tokens组合成ast】

- 使用traverse对ast进行遍历，调用插件来转译，对ast 进行增删查改

- 使用generator将转换后的ast再转成代码字符串

# webpack 和 vite的区别 ⭕️

1. vite服务器启动速度快
   
   vite启动不需要对整个项目进行编译打包，而是在浏览器需要加载某个模块的时候，拦截浏览器的请求，按需编译那个模块然后返回
   
   而且，vite基于esbuild预构建依赖，esbuild是go编写的，速度上比js编写的打包器预构建依赖快10-100倍
   
   【现代浏览器本身就支持 `es modules`，会`主动发起`请求去获取所需文件，vite也正是利用了`es modules`这个特性，使用vite运行项目时，首先会用`esbuild`进行预构建，将所有模块转换为`es module`，这样浏览器可以直接执行这些模块】

2. vite热更新快
   
   webpack中一个模块改变时要重新编译该模块的所有依赖，vite只需要让浏览器重新请求该改变的模块

【vite在生产环境下的打包工具是Rollup，Rollup是一款es module打包器，相比webpack打包生成的文件更小

虽然esbuild打包速度比rollup快，但vite目前使用的插件api和esbuild不兼容，vite选择了rollup更灵活的插件api。注意使用vite可能会存在开发环境和生产环境打包结果不一致的问题】

# 你知道哪些模块化标准? 说下cjs和esm的区别

commonjs(CJS)、es modules(ESM)、AMD、UMD

- cjs是同步加载，esm是异步加载

- cjs导出的是值的拷贝，esm导出的是值的引用

- AMD是异步加载，主要用于浏览器，cjs主要用于服务器

- UMD可以适应多种环境，会检测当前的执行环境，然后根据环境来选择使用哪种模块系统

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

# webpack 做过哪些优化 ⭕️

开发效率：

- 热更新

- source map，可以映射压缩后代码和源代码的对应关系，调试阶段很好定位错误

优化打包大小：

- 压缩代码，terser-webpack-plugin。mini-css-extract-plugin压缩css
  
  【webpack4默认开启压缩，进一步调整压缩可以用plugin】

- tree shaking，清除无用代码，减小打包大小

- scope hoisting，合并模块的代码作用域

- 代码分割，按需加载代码块，减小初始加载的包大小【配置splitChunks】

优化构建速度：

- thread-loader开启多进程打包【happypack在webpack5已弃用】

- 优化loader，babel-loader：排除解析node_modules相关依赖、开启缓存【减少对模块反复转译】

- 配置externals选项，将一些依赖改成cdn方式引用，这些依赖就不会包括在输出文件中

# webpack proxy为什么可以解决跨域？

开发阶段，webpack-dev-server会启动一个本地开发服务器，所以我们的应用运行在localhost的一个端口上，而后端服务运行在另一个地址，由于浏览器同源策略会出现跨域问题

设置webpack proxy相当于浏览器和服务端中间添加一个代理者，本地发送请求，代理服务器将请求转发到目标服务器，目标服务器响应后将数据发送到代理服务器，再转到本地

代理服务器和本地浏览器是同源的不会跨域，而代理服务器和目标服务器都是服务器也不会受浏览器的同源策略影响

# 手写一个loader

比如style-loader（将解析后的css注入页面）

```js
// loader/style-loader.js
function loader(source) {
    return `
        let style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.inndexHTML = ${source};
        document.head.appendChild(style)`
}
module.exports = loader
```

在webpack.config.js中：

```js
module.exports = {
    module: {
        rules: [
            {
                test: /main.css/,
                use: [{ loader: './loader/style-loader.js' }]
            }
        ]
    }
}
```

# Webpack的hash值？（文件指纹）

hash值通常指构建生成的文件名中包含的哈希值，每次构建webpack都会生成一个唯一的hash值，这样保证代码变化的时候浏览器重新下载文件

- hash
  
  构建过程中生成的全局哈希值，任何一个文件改变，整个项目的hash值变化

- chunk hash
  
  每个独立的chunk都有自己的hash值，一个chunk的改动不会影响其他chunk

- content hash
  
  根据文件内容生成的hash值，文件内容变化才会影响hash值

# gulp、grant和webpack的区别

gulp、grant基于任务，对一个文件进行一系列链式操作，整条链式操作就是一个任务，多个任务就构成了整个构建流程。我们只需要定义任务，让它们执行这些任务

webpack基于模块，它会根据入口，递归解析从入口找到的所有文件，用loader处理不同的文件



# 与webpack类似的工具还有什么？有什么区别

类似于webpack的工具：vite、rollup、parcel

【gulp grunt只能称为构建工具，不算模块化工具，和webpack不太像】

- rollup
  
  - es modules打包器，和webpack功能类似，但相比webpack更小巧
  
  - 默认支持tree shaking，不支持热更新
  
  - 相比webpack并不适合开发应用使用，因为rollup只支持es modules这种格式，如果应用中有第三方模块需要使用commonjs格式导入可能就需要插件来完成。但是rollup用于打包js库时比webpack更小更快

- parcel
  
  - 不需要任何配置就可以直接使用
  
  - 不需要和webpack一样配置loader就能加载其他类型的资源文件

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
