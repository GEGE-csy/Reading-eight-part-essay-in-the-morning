# 1. vue 的基本原理

vue 实例创建时，vue 会遍历 data 中的属性，用 Object.defineProperty()（vue3 用 proxy）将它们转为 getter 和 setter，并跟踪其依赖，在属性被访问或者修改的时候就通知变化。每个组件实例有相应的 watcher 程序，它会在组件渲染的过程中把属性标记为依赖，之后当依赖项的 setter 被调用时会通知 watcher 重新计算从而更新组件

# 2.vue 的双向数据绑定原理

采用数据劫持结合了发布者-订阅者模式来实现的
有一个监听器 Observer ，通过 Object.defineProperty()或者 proxy 来劫持 data 中的属性，将它们转为 getter、setter 并监听变化，如果有变动就通知 订阅者 Watcher，因为订阅者不止一个，所以会有一个消息订阅器 Dep 收集订阅者，消息订阅器在 Observer 和 Watcher 之间通知变化
有一个解析器 Compile，解析模板指令，把模板中的变量替换成数据，给每个指令对应的节点绑定更新函数，并添加订阅者 Watcher 来监听数据，一旦收到通知数据变化了就更新视图
订阅者 Watcher 是 Observer 和 Compile 之间的一个桥梁，当订阅者 Watcher 收到消息订阅器 Dep 的通知，订阅者 Watcher 会执行相应的更新函数

# 3.使用 Object.defineProperty()来进行数据劫持的缺点

- 对象属性的增加删除无法拦截到
- 通过下标修改数组数据也拦截不到，vue 只重写了数组的部分方法，限制在 push、pop、shift、unshift、splice、sort、reverse，其他数组方法的操作也拦截不到

vue3 使用 proxy 实现数据劫持，可以监听到任何形式的数据改变，没有了这么多限制

# 4. 什么是 MVVM

MVVM 分为 Model、View、ViewModel
Model 代表数据模型，View 代表 UI 视图，ViewModel 负责监听 Model 中数据的改变并控制 View 视图的更新
Model 中的数据会绑定到 ViewModel，当数据改变时会触发 View 的更新，View 中因为用户交互而改变的数据也会在 Model 中同步更改
以前是操作 DOM 更新视图，现在是数据驱动视图

# 5. MVVM、MVC、MVP 的区别

MVVM、MVC、MVP 是三种常见的架构模式，都是为了解决 UI 界面和逻辑代码分离而出现的模式

- MVC
  Model-View-Controller
  Model 代表数据模型，View 代表 UI 视图，
  Controller 控制器，用来连接 Model 和 View，处理业务逻辑
  (用户和页面交互，触发 Controller，Controller 修改 Model，Model 再通知 View 更新)
- MVP
  Model-View-Presenter
  Model 代表数据模型，View 代表 UI 视图，
  Presenter 表示器
  MVC 中 Controller 只知道 Model 的接口，没办法控制 View 的更新，只能让 Model 数据变化时通知 View 更新，Model 层和 View 层耦合在一起，项目逻辑复杂时可能造成代码混乱
  MVP 中 View 的接口暴露给了 Presenter，可以在 Presenter 中将 Model 和 View 的变化绑定在一起，通过 Presenter 实现 Model 层和 View 层的解耦
- MVVM
  Model-View-ViewModel
  Model 代表数据模型，View 代表 UI 视图，
  ViewModel 负责监听 Model 中数据的改变并控制 View 视图的更新
  Model 和 View 没有直接联系，只能通过 ViewModel 联系，Model 和 ViewModel 有双向数据绑定的联系，
  Model 数据改变会触发 View 的更新，View 中因为用户交互而改变的数据也会在 Model 中同步更改，相较于 MVP 实现了 Model 和 View 的数据自动同步

# 6.Computed 和 Watch 的区别

computed

- 支持缓存，只有依赖的数据发生了变化，才会重新计算
- 不支持异步，computed 中有异步操作的时候，无法监听数据的变化
- watch
- 不支持缓存，数据变化时就触发相应操作
- 支持异步监听

应用场景：
当要进行数值计算，并且依赖其他数据时，使用 computed，可以利用缓存特性，避免每次获取值都要重新计算
当要在数据变化时执行异步操作时，使用 watch

# 6. Computed 和 Methods 的区别

computed 是有缓存的，依赖数据变化了才会重新计算，methods 每次调用都会执行

# 7. slot 是什么？有什么作用？

slot 就是插槽，一个标签元素
如果项目中有需要被重复使用的组件，但这个组件在不同的地方有少量修改，此时重写组件也没有必要，可以使用插槽在组件中占位
在不同的组件中自定义插槽中的内容，可以更好实现对组件的复用

插槽分三类：匿名插槽、具名插槽、作用域插槽
匿名插槽：slot 不指定 name 属性，默认名字 default，一个组件只能有一个匿名插槽
具名插槽：slot 指定了 name 属性，一个组件可以有多个具名插槽
作用域插槽：让父组件可以访问子组件中的数据并且显示在插槽的位置
子组件将数据作为一个属性绑定在 slot 元素上，比如`<slot :childData="data"></slot>`,childData 就是一个插槽 prop
父组件中使用 v-slot 来获取数据

```html
<!-- Father.vue -->
<child>
	<template v-slot:default="slotProps"> {{ slotProps.childData }} </template>
</child>
```

(slotProps 包含了所有的插槽 prop，v-slot:后面接插槽的名字)

# 8. v-if 和 v-show 的区别

- v-if 是动态向 DOM 树中添加或删除 DOM 元素，v-show 是通过设置 display 属性控制显示或隐藏
- v-if 切换有一个局部编译/卸载的过程，v-show 只是简单的 css 切换
- v-if 首次渲染的时候如果条件为假什么都不做，v-show 首次渲染无论条件是真是假都会编译
- v-if 切换性能消耗更大，v-show 初始渲染消耗更大

# 9.v-model 如何实现

v-model 就是一个语法糖
比如 v-model="a"

1. 用 v-bind 绑定 value 属性，值是 a
2. 绑定 input 事件，触发 input 事件的时候将 a 设置为目标值

# 10.data 为什么是一个函数而不是对象

一个组件可能会被复用多次，如果 data 是一个对象，那么会有多个组件实例引用同一个对象，只要一个实例操作了 data，其他实例的 data 也会变化
所以 data 要写成函数的形式，数据以函数返回值的形式定义，有自己的作用域，各个组件之间不会相互干扰

# 11.对 keep-alive 的理解

keep-alive 是 vue 的一个内置组件
它能在组件切换的时候保存组件状态，而不是直接销毁组件，避免反复渲染导致的性能问题
有两个独立的生命周期 `activated` 和 `deactivated`，keep-alive 缓存的组件被激活时会执行
`actived`，被停用时会执行`deactived`

keep-alive 有三个属性：
include(字符串或正则表达)：名称匹配的组件会被缓存
exclude(字符串或正则表达)：名称匹配的组件都不会被缓存
max(数字)：最多可以缓存多少组件

原理：
vue 内部将 DOM 节点抽象成了一个个的虚拟节点，keep-alive 的缓存也是基于虚拟节点的，不是直接存储 DOM 结构，它将需要缓存的组件存在 cache 对象中，需要渲染时再将虚拟节点从 cache 对象中取出并渲染

# 12.$nextTick

`$nextTick`是 vue 提供的一个 api，可以在`$nextTick`里获取更新后的 DOM
vue 更新 DOM 是异步执行的，数据发生变化后视图不会立刻更新，vue 会把更新的数据都放入一个队列，
视图会等队列中所有数据都更新完才更新，`$nextTick`在视图更新完就立刻执行

使用场景：

- 在修改数据后，立刻就想操作这个跟着数据变化的 DOM 结构，这个操作就要放在`$nextTick`里
- 在`created()`生命周期进行 DOM 操作，也要放在`$nextTick`里

# 13.单页应用和多页应用的区别

单页应用 SPA：
只有一个主页面的应用，一开始只需要加载一次 js、css 等资源
所有内容都包含在主页面，功能模块都进行了组件化
跳转页面就是切换相关的组件，只会刷新局部资源
适用场景：不利于 SEO

多页应用 MPA：
有多个独立页面的应用，每个页面都要重复加载 js、css 等资源
跳转页面需要刷新整页的资源
适用场景：对 SEO 要求高

# 14.vue 模板编译原理

模板编译：将 vue 中的模板 template 转化为 render 函数

1. 解析 template，转为抽象语法树 ast
2. 遍历 ast，找出静态节点，在页面重渲染的时候直接跳过这些静态节点
3. 用抽象语法树 ast 生成 render 函数

# 15. data 中某个属性的值发生改变后，视图会立即重新渲染吗？

不会
vue 实现响应式并不是数据变化后 DOM 立即变化
vue 更新 DOM 是异步执行的。数据发生变化后视图不会立刻更新，vue 会把更新的数据都放入一个队列，视图会等队列中所有数据都更新完才更新

# 16. 描述 vue 自定义指令

需要对 普通 DOM 元素进行底层操作的时候，就可以用到自定义指令

分为全局指令和局部指令
全局：在 main.js 中用 app.directive()注册，参数 1 是指令名称，参数 2 是包含一些类似生命周期钩子的对象，钩子会将指令绑定的元素作为参数，在触发时执行

局部：在 options 选项中设置 directive 属性，是一个对象，以指令名称作为 directive 对象的属性，指令名称是包含一些类似生命周期钩子的对象

# 17. 子组件可以直接修改父组件的数据吗？

不可以
在 vue 中要遵循单向数据流原则，子组件不能修改父组件传来的 props
这样可以防止子组件意外修改父组件的状态
如果有多个子组件依赖父组件的某个数据，那么一个子组件使父组件变化可能会引起多个子组件变化

如果想要修改：

- 新定义一个 data，初始化为 prop 值
- 新定义一个计算属性，处理 prop 值

# 18. vue 的优点

- 轻量级框架
- 中文文档，容易学习
- 双向数据绑定，数据和视图会同步变化，不需要我们去操作 DOM 更新视图
- 组件化开发，将页面拆成一个个可复用的组件，便于管理代码

# 20.assets 和 static

相同：都是存放静态资源文件
不同：assets 中的资源会被 webpack 处理，进行压缩格式化，在 dist 中合并成一个文件
static 中的资源不会被 webpack 处理，打包后直接复制到 dist 下

建议：自己的静态资源放在 assets 中，第三方资源放在 static 中

# 21.对 ssr 的理解

ssr 就是服务端渲染
把 vue 在客户端把标签渲染成 html 的工作放在服务端完成，再把 html 返回给客户端

优点：

- 更好的 seo
- 首屏加载速度更快

缺点：

- 服务端压力较大

# 22.为什么客户端渲染不利于 seo

有利于 seo 指的是让爬虫来爬我们的页面
搜索引擎的爬虫原理就是请求 url，url 返回的 html 就是爬虫爬取到的内容
但是爬虫不会加载和执行 js 脚本，客户端渲染返回的 html 几乎是空的
需要执行 js 脚本之后才会渲染真正的页面，所以爬虫几乎爬不到什么内容

# 23.为什么服务端渲染的白屏时间更短？

服务端渲染在浏览器请求 url 之后就得到了一个带数据的 html，浏览器只需要解析 html
但客户端渲染只得到一个空的 html，此时页面已经进入白屏，之后还要经过加载和执行 js 脚本、请求后端服务器获取数据，渲染页面等几个过程才能看到最后的页面
并且复杂应用中要加载的 js 会很大，这会使首屏时间很长

# 24.vue 的性能优化有哪些

代码层面：

- v-if 和 v-show 区分使用场景
- v-for 遍历添加 key，避免和 v-if 一起用
- 防抖、节流
- 路由懒加载
- 图片懒加载
- 长列表性能优化（纯粹的数据显示，用 Object.freeze()禁止 vue 劫持）
- 第三方插件按需引入
- 预渲染/服务端渲染

webpack 层面：

- 压缩图片
- 减少 es6 转为 es5 的冗余代码
  (babel 会注入一些辅助函数，每个输出文件都有，那辅助函数会出现很多次)
  （babel-plugin-transform-runtime 插件）

基础层面：

- 使用 cdn
- 开启 gzip 压缩
- 缓存静态资源

# 25.说一下 vue 的生命周期

vue 实例创建时会经过一系列初始化过程
生命周期钩子就是到达某一个阶段就会触发的函数，是为了完成一些操作
生命周期主要分为 8 个阶段：创建前后、挂载前后、更新前后、销毁前后
以及一些特殊场景的生命周期

创建阶段：（vue3 中没有这两个，只能放在 setup()里）

- beforeCreate：vue 实例创建前，data 和 methods 还没初始化
- created：vue 实例创建完，data 和 methods 已经初始化

挂载阶段：

- beforeMount：模板已经编译完，还未渲染到页面上
- mounted：模板已经渲染到页面上，此时可以操作 DOM

更新阶段：

- beforeUpdate：数据发生变化，模板还未更新
- updated：模板更新后

销毁阶段：

- beforeDestroy：vue 实例销毁前
- destroyed：vue 实例销毁后

特殊的：

- activated：keep-alive 缓存的组件被激活时
- deactivated：keep-alive 缓存的组件被停用时

# 26.vue 子组件和父组件执行顺序

加载渲染：

1. 父组件 beforeCreate
2. 父组件 created
3. 父组件 beforeMount
4. 子组件 beforeCreate
5. 子组件 created
6. 子组件 beforeMount
7. 子组件 mounted
8. 父组件 mounted

更新：

1. 父组件 beforeUpdate
2. 子组件 beforeUpdate
3. 子组件 updated
4. 父组件 updated

销毁：

1. 父组件 beforeDestroy
2. 子组件 beforeDestroy
3. 子组件 destroyed
4. 父组件 destroyed

# 27.created 和 mounted 的区别

created()在模板渲染成 html 之前调用，无法访问 DOM
mounted()在模板渲染成 html 之后调用，可以访问 DOM

# 28.组件通信的方式

父子：

- props 和$emit
  父组件通过 props 向子组件传递数据
  父组件的数据以一个属性值传给子组件，子组件中声明要接收的 prop 名、类型等

  子组件通过$emit 和父组件通信
  子组件中用$emit 触发一个父组件的方法并传递参数，父组件中用 v-on 监听方法并接收参数

- 依赖注入 provide 和 inject
  父子组件或者祖孙组件，不论子组件多深都可以通信
  provide()和 inject()是和 data、methods 同级的钩子
  provide 用来发送数据或方法，inject 用来接收数据或方法

  ```js
  provide() {
    return {
      num: this.num,
      // 这样写可以访问所有属性
      app: this
    }
  }
  ```

  ```js
  inject: ["num", "app"];

  console.log(this.app.num);
  ```

- ref 和$refs
  在子组件上设置 ref 属性，ref 会给子组件注册引用信息，ref="child"
  引用信息注册在父组件的$refs 对象上，在父组件中可以用 `this.$refs.child`访问子组件中的数据和方法

- $parent和$children
  子组件中使用$parent 可以访问父组件实例
  父组件中使用$children 得到子组件数组
  兄弟：

兄弟：

- eventBus 事件总线
  创建一个 vue 实例作为通信的对象，bus = new Vue()
  组件利用`bus.$emit()`、`bus.$on()`发送和接收事件

任意：

也可以使用 eventBus 事件总线
vuex

# 29.Vuex

Vuex 是一种状态管理模式，将组件的共享状态抽取为一个 store
并且 vuex 的状态是响应式的，组件从 store 读取状态时，若状态发生改变，该组件也会更新
Vuex 有几大属性：

- state：存储状态
- getters：类似于计算属性，可以对 state 进行加工
- mutations：用来修改 state，只能进行同步操作，要执行 mutation 中的方法时要 使用 commit 触发
- actions：用来提交 mutation，只能进行异步操作，执行 actions 中的方法要 dispatch
- modules：模块化 vuex，每个模块都有自己的 state、getters、mutations、actions

# 30. vuex 中 mutation 和 action 的区别

- mutations 中的方法可以直接修改 state，actions 中的方法是用来提交 mutation，而不是直接改变 state
- mutation 必须是同步方法，action 可以是异步方法

# 31.为什么 mutation 不能做异步操作？

每个 mutation 执行完都对应一个状态变化，devtools 就可以记录下来，便于我们调试
如果 mutation 支持异步操作，就不知道状态是什么时候更新的，devtools 跟踪不到

# 32.如何批量使用 vuex 的 getter 和 mutation

使用 mapGetters()和 mapMutations()，
用对象展开符把 getter 和 mutation 混入 computed 和 methods

```js
computed: {
  ...mapGetters([''])
},
methods: {
  ...mapMutations([''])
}
```

# 33. vuex 和 localStorage 的区别

- vuex 存储在内存中，localStorage 存储在本地，读取内存速度比读取硬盘快
- vuex 集中管理组件的状态，一般用于组件之间传递数据，localStorage 将数据存储到浏览器，一般用于跨页面传递数据
- 刷新页面时 vuex 存储的值会丢失，localStorage 不会
- vuex 可以实现数据响应式，localStorage 做不到

# 34.vue3 有什么更新

- 使用 proxy 实现数据监听，可以监听到任何形式的数据改变，没有 Object.defineProperty 的很多限制
- composition api
  vue2 中的 options，一个功能被分割到了 data、methods、computed 里，导致耦合度高难维护，vue3 的组合式 api 会把一个功能的代码放一起
- 重写虚拟 DOM
  优化了虚拟 DOM 的 diff 算法，之前需要比较每一个节点是否变化，vue3 中则只会跟踪被标记了的节点，不会管静态节点
- 生命周期钩子，去掉了 beforeCreate 和 created，增加了 setup，beforeDestroy 和 destroyed 也改名为 onBeforeUnmount 和 onUnmounted，并且所有的钩子都要放在 setup 里
- 新的组件 Fragment、Teleport、Suspense
  - Fragment，在 vue3 中组件可以没有根标签，内部会将多个标签包在一个 Fragment 中
  - Teleport 可以包裹 html 传送到指定地方
  - Suspense 展示异步组件
- 基于 tree-shaking 摇树优化，重构了一些 api，减小了代码量（比如 vue2 中的 Vue. nextTick 没有用到也会打包进来，vue3 就是只有引入进来的会打包）

# 35. 对虚拟 DOM 的理解

- 虚拟 DOM 本身是一个 js 对象，它用属性来描述一个视图
- 虚拟 DOM 设计的最初目的是为了更好的跨平台，它抽象了真实 DOM 的渲染过程，不局限于浏览器
- 使用虚拟 DOM 可以减少直接操作真实 DOM 的次数，利用 diff 算法比较新旧虚拟 DOM，只更新变化的部分，不会引起频繁的重排和重绘
- 缺点是首次渲染 DOM 的时候多了一层虚拟 DOM 的计算，速度比正常稍慢

# 36.diff 算法的原理

patch()方法，利用 sameVnode()比较新旧节点是否是相同节点，
不相同则新建节点替换掉旧节点，相同则调用 patchVnode()再比较子节点

patchVnode()判断双方是否都有子节点，
如果新节点没有子节点，旧节点有就将旧节点移除。
如果新节点有子节点，旧节点没有就添加新的子节点
如果新旧节点都有子节点就调用 updateChildren()继续比较

updateChildren()递归比较所有子节点

# 37. vue 中 key 的作用

- v-if 使用 key，v-if 切换前后会尽可能复用元素，如果是 input，切换前后用户的输入不会被清除
  这时候可以用 key 来唯一地标识一个元素，使用了 key 就不会复用
- v-for 使用 key，v-for 渲染的列表更新的时候是“就地更新”，就是尽可能复用节点，
  这时候给每一项绑定一个 key，能让 vue 更快地判断这一项是否能进行复用，提高效率

# 38. 为什么不建议 index 作为 key

如果有破坏顺序的操作，每个节点对应的 key 都会变化，导致不能复用
