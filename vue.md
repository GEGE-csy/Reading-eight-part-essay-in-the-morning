# vue基础

## 1.vue2 的响应式原理 / 双向数据绑定原理 ⭕️

vuejs采用数据劫持结合了发布-订阅模式的方式来实现响应式

- Observer监听器：递归遍历数据对象，利用Object.definePropety拦截每个属性，转成getter和setter，在getter中收集依赖(订阅者)，setter中通知订阅者更新视图

- Compile解析器：解析模板指令，将模板变量替换为数据，给节点绑定更新函数

- Dep和Watcher发布订阅模型：作为连接Observer和Compile的桥梁，Dep是发布者，Watcher是订阅者，getter中收集的依赖就是保存在Dep的一个列表里，每个属性变化时触发setter会通知Dep收集的所有Watcher，执行节点绑定的更新函数，从而更新视图【通知Watcher执行update()，update()将Watcher加入异步队列，等待执行Watcher的回调更新视图，Watcher记录了更新视图的函数】

## 2.vue是如何收集依赖的 ⭕️

依赖收集就是收集订阅了数据变化的watcher

目的是，当响应式数据发生变化的时候，触发了setter时，要知道应该通知哪些订阅者

基于三个类实现，Observer、Dep、Watcher

Observer类负责数据劫持，触发getter时调用dep的depend()收集依赖，触发setter时调用dep的notify()通知Watcher更新视图

Dep类负责收集Watcher，有一个全局的静态属性Dep.target会跟踪当前正在执行的watcher，Dep的depend()会通知Dep.target保存的这个watcher订阅dep[调用watcher的addDep()]，notify()会遍历subs列表，通知watcher执行update()

Watcher类负责订阅dep，addDep()会调用dep的addSub()，让dep收集当前的watcher加入subs列表，update()将watcher加入异步队列，等待调用watcher的回调更新视图

【省略大部分】

```js
class Observer {
    constructor(value) {
        if(Array.isArray(value)) {}    // 对数组的响应式处理
        else {    // 对对象的响应式处理
            this.walk(value)
        }
    }
    walk(obj) {
        const keys = Object.keys(obj)
        // defineReactive对每个属性作响应式处理
        for(let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[key[i]])
        }
    }
}
function defineReactive(obj, key, value) {
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        get: function reactiveGetter() {
            if(Dep.target) { // 保存当前正在执行的Watcher
                dep.depend() // 进行依赖收集
            }
            return value
        }
        set: function reactiveSetter() {
            dep.notify() // 通知Watcher更新视图
        }
    })
}
class Dep {
    constructor() {
        this.subs = [] // 保存Watcher的列表
    }
    addSub (sub: Watcher) {
        this.subs.push(sub)
    }
    depend() { // Dep.target调用addDep()，将自己收集进Dep的subs列表
        if(Dep.target) {
            Dep.target.addDep(this)
        }  
    }
    notify() {
        const subs = this.subs.slice()
        for(let i = 0; i < subs.length; i++) {
            subs[i].update()
        }
    }
}
class Watcher {
    constructor() {
        Dep.target = this
    }
    addDep(dep) {
        dep.addSub(this)
    }
    update() {
       queueWatcher(this) // 加入异步更新队列
    }
}
```

## 3.使用 Object.defineProperty()来进行数据劫持的缺点

- 对象属性的增加删除无法监听到
- 数组下标更改和直接修改length无法监听到，只能监听到7个重写数组原型上的方法， push、pop、shift、unshift、splice、sort、reverse
- 在代理嵌套层级很深的对象时需要一次性递归整个对象，可能会导致性能问题

vue3 使用 proxy 实现数据劫持，可以监听到任何形式的数据改变，没有了这么多限制
（proxy 代理的是整个对象，Object.defineProperty 代理的是属性）

而且proxy实现了按需递归，只在访问到属性时才会递归，减少性能开销

## vue2新增/删除属性为什么需要额外的api

因为Object.definePropety监听属性，而不是监听对象

vue2中的defineReactive()就是遍历对象的每个属性对它们进行响应式处理

新增/删除属性的时候需要使用\$set/\$delete

\$set的原理：使用defineReactive对新增的属性进行响应式处理，调用notify()通知watcher更新视图

## Object.defineProperty 真的不能监听数组的变化吗？

vue2对数组的监听是通过重写原型上的7个方法，为什么不使用Object.defineProperty?

是因为 Object.defineProperty 真的不能监听数组的变化吗？

Object.defineProperty 可以监听到下标变化，但无法监听到length变化

为什么选择改写数组的方法来实现监听：

数组元素太多时性能消耗太大

## vue2中如何重写的数组方法

1.创建了一个以原生Array的原型为原型的新对象

2.为新对象添加了数组的重写方法

3.将监听的对象的原型设置为这个新对象，被监听的对象调用数组方法的时候会使用被重写后的方法

【思想和寄生式继承类似，使用Object.create(parent)创建新对象，在新对象上添加属性和方法】

```js
class Observer {
    constructor(value) {
        // 给已经代理过的对象添加一个__ob__属性，并且这个属性不可枚举，值指向这个实例
        Object.defineProperty(value, '__ob__', {
            enumerable: false,
            value: this
        })
        if(Array.isArray(value)) {// 对数组的响应式处理
            this.observeArray(value)
        }    
        else { 
            this.walk(value) // 对对象的响应式处理
        }
    }
    observeArray(arr) {
        // 改变数组的原型链
        arr.__proto__ = proxyPrototype
        arr.forEach(item => {
            observe(item)
        })
    }
}
function observe(data) {
    ...
    return new Observer(data)
}
```

```js
const oldPrototype = Array.prototype
// 创建一个代理原型链
const proxyPrototype = Object.create(oldPrototype)
['push','pop','unshift','shift','reverse','sort','splice'].forEach(method => {
    proxyPrototype[method] = function(...args) {
        let ob = this.__ob__    // 拿到Observer实例
        let insert // 记录新增元素
        switch (method) {
            case 'push':
            case 'unshift':
                insert = args
                break
            case 'splice':
                insert = args.slice(2)
                break
            default:
                break
        }
        // 对新增的元素进行响应式处理
        insert && ob.observeArray(insert)
        // 调用原生方法
        const result = oldPrototype[method].apply(this, args)
        return result
    }
})
export default proxyPrototype
```

## vue3 的响应式原理

使用proxy劫持了对象getter和setter，在getter中进行依赖收集，收集的依赖是数据变化后执行的副作用函数，在setter中执行收集的副作用函数

(省略大部分)

```js
let activeEffect; // 存储注册的副作用函数

/**
 * target1 => depsMap: key1 => effect1、effect2...
 *                     key2 => effect1、effect2...
 * target2 => depsMap: key1 => effect1、effect2...
 *                     key2 => effect1、effect2...
 *                     (Set)---------------------
 *            (Map)------------------------------
 * (WeakMap)-------------------------------------
 */
const targetMap = new WeakMap(); // 存储副作用函数
function effect(fn) {
    // 注册副作用函数
    activeEffect = fn;
    fn();
}
const obj = new Proxy(data, {
    get(target, key) {
        track(target, key);
        return Reflect.get(target, key);
    },
    set(target, key, val) {
        Reflect.set(target, key, val);
        trigger(target, key);
    },
});
function track(target, key) {
    // 拿到target相关的依赖Map
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    // 拿到依赖Map中key对应的副作用函数集合
    let deps = depsMap.get(key);
    if (!deps) {
        deps = new Set();
        depsMap.set(key, deps);
    }
    if (!deps.has(activeEffect)) {
        deps.add(activeEffect); // 将当前激活的副作用函数加入到集合中
    }
}
function trigger(target, key) {
    let depsMap = targetMap.get(target); // 拿到target相关的依赖Map
    const effects = depsMap.get(key); // 拿到依赖Map中key对应的副作用函数集合
    effects && effects.forEach(fn => fn());
}
```

## 4. 什么是 MVVM

MVVM 分为 Model、View、ViewModel
Model 代表数据模型，View 代表 UI 视图，ViewModel 负责监听 Model 中数据的改变并控制 View 视图的更新
Model 中的数据会绑定到 ViewModel，当数据改变时会触发 View 的更新，View 中因为用户交互而改变的数据也会在 Model 中同步更改
以前是操作 DOM 更新视图，现在是数据驱动视图

## MVVM的优缺点 ⭕️

优点：

- 分离了视图逻辑和业务逻辑，降低了代码耦合，更容易维护扩展

- 提高了可测试性，视图逻辑和业务逻辑分开，更容易进行单元测试

- 提高开发效率，数据驱动视图，开发者无需手动操作dom，可以更专注于业务逻辑

缺点：

- bug很难被调试，页面异常可能是view有问题，也可能是model有问题

- 对于过大的项目，数据绑定会导致内存开销大，影响性能【只将必要的数据绑定到视图上，减少不必要的更新】

## 5. MVVM、MVC、MVP 的区别 ⭕️

MVVM、MVC、MVP 是三种常见的架构模式，都是为了解决 UI 界面和逻辑代码分离而出现的模式

- MVC
  Model-View-Controller
  Model 代表数据模型，View 代表 UI 视图，
  Controller 控制器，用来连接 Model 和 View
  用户和页面交互，触发 Controller，Controller 更新 Model，Model 再通知 View 更新

- MVP
  Model-View-Presenter
  Model 代表数据模型，View 代表 UI 视图，
  Presenter 表示器
  
  MVP和MVC唯一不同在于Presenter和Controller
  MVC 中 Controller 只知道 Model 的接口，没办法控制 View 的更新，只能让 Model 数据变化时通知 View 更新，Model 层和 View 层耦合在一起，项目逻辑复杂时可能造成代码混乱
  MVP 中 View 的接口暴露给了 Presenter，可以在 Presenter 中将 Model 和 View 的变化绑定在一起，通过 Presenter 实现 Model 层和 View 层的解耦

- MVVM
  Model-View-ViewModel
  Model 代表数据模型，View 代表 UI 视图，
  ViewModel 负责监听 Model 中数据的改变并控制 View 视图的更新
  Model 数据改变会触发 View 的更新，View 中因为用户交互而改变的数据也会在 Model 中同步更改，
  相较于 MVP 采用了数据双向绑定，实现了 Model 和 View 的数据自动同步

## 6.Computed 和 Watch 的区别

computed

- 支持缓存，只有依赖的数据发生了变化，才会重新计算
- 不支持异步，computed 中有异步操作的时候，无法监听数据的变化
- 一开始就会执行一次

watch

- 不支持缓存，数据变化时就触发相应操作
- 支持异步监听
- 一开始默认不执行，除非设置 immediate 为 true

应用场景：
当要进行数值计算，并且依赖其他数据时，使用 computed，可以利用缓存特性，避免每次获取值都要重新计算
当要在数据变化时执行异步操作时，使用 watch

## 6. Computed 和 Methods 的区别

computed 是有缓存的，依赖数据变化了才会重新计算，methods 每次调用都会执行

## 7. slot 是什么？有什么作用？

slot 就是插槽，一个标签元素
如果项目中有需要被重复使用的组件，但这个组件在不同的地方有少量修改，此时重写组件也没有必要，可以使用插槽在组件中占位
在不同的组件中自定义插槽中的内容，可以更好实现对组件的复用

插槽分三类：匿名插槽、具名插槽、作用域插槽

- 匿名插槽：slot 不指定 name 属性，默认名字 default，一个组件只能有一个匿名插槽

- 具名插槽：slot 指定了 name 属性，一个组件可以有多个具名插槽

- 作用域插槽：子组件可以在slot元素上绑定属性将传递给父组件，因为如果插槽内容需要子组件的数据，它是访问不到子组件的
  
  【插槽内容是在父组件的模板中被定义的，所以只能访问父组件的作用域，不能访问子组件的作用域】

子组件：

```html
<slot :childData="data"></slot>
```

父组件中使用 v-slot(#)来获取数据】

```html
<Child>
<!-- 可以直接解构 <template #default="{ childData }">{{childData}}</template> --> 
    <template #default="slotProps"> {{ slotProps.childData }} </template>
</Child>
```

(slotProps 包含了所有的插槽 prop，v-slot:后面接插槽的名字)

## 8. v-if 和 v-show 的区别

- v-if 是通过向 DOM 树中添加或删除 DOM 元素控制显示或隐藏，v-show 是通过设置 display 属性控制显示或隐藏
- v-if 切换有一个局部编译/卸载的过程，v-show 只是简单的 css 切换
- v-if 首次渲染的时候如果条件为假什么都不做，v-show 首次渲染无论条件是真是假都会编译
- v-if 切换性能消耗更大，v-show 初始渲染消耗更大
- 需要频繁切换，v-show更好

## v-if和v-for的优先级是什么

vue2: v-for优先级高

vue3: v-if优先级高

## 9.v-model 如何实现

v-model 就是一个语法糖，用来建立双向数据绑定
比如 v-model="a"，如果用在表单元素上，

1. 用 v-bind 绑定 value 属性，值是 a
2. 使用 v-on 监听 input 事件，触发事件的时候会更新绑定的属性值

如果用在自定义组件上，实际上组件内部要实现

v-bind绑定modelValue属性，并且触发事件的时候emit('update:modelValue')并发送

## 10.data 为什么是一个函数而不是对象

一个组件可能会被复用多次，如果 data 是一个对象，那么会有多个组件实例引用同一个对象，只要一个实例操作了 data，其他实例的 data 也会变化
所以 data 要写成函数的形式，数据以函数返回值的形式定义，有自己的作用域，各个组件之间不会相互干扰

## 11.对 keep-alive 的理解 ⭕️

- keep-alive 是 vue 的一个内置组件
  它能在组件切换的时候保存组件状态，而不是直接销毁组件，避免反复渲染导致的性能问题
  有两个独立的生命周期 `activated` 和 `deactivated`，keep-alive 缓存的组件被激活时会执行`actived`，被停用时会执行`deactived`
  
  keep-alive 有三个属性：
  include(字符串或正则表达)：名称匹配的组件会被缓存
  exclude(字符串或正则表达)：名称匹配的组件都不会被缓存
  max(数字)：最多可以缓存多少组件
  
  keep-alive默认使用LRU缓存策略，当缓存达到最大限制时，会自动销毁最久未使用的组件实例

- 使用场景：tab页切换保存切换前状态

- 原理：keep-alive 利用cache对象和keys数组存储和管理组件实例，cache中存储的是组件实例对应的虚拟dom。当一个组件被缓存的时候，会将其对应的虚拟节点存储到cache对象，并通过一个key来标识。组件被激活时再将虚拟节点从 cache 对象中取出并渲染

## 12. 说说对 nextTick 的理解 ⭕️

`nextTick`是 vue 提供的一个 api，可以在`nextTick`里获取更新后的 DOM
vue 更新 DOM 是异步执行的，侦听到数据变化，vue会开启一个队列，并缓冲在同一事件循环中发生的所有数据变更，这是为了去除重复的不必要的dom操作和计算。然后在下一个事件循环中，vue才会执行工作。调用nextTick()，传入的回调函数会被添加到这个队列中，因此可以保证nextTick()中能拿到最新的dom结构

使用场景：

- 在修改数据后，立刻就想操作这个跟着数据变化的 DOM 结构，这个操作就要放在`nextTick`里
- 在`created()`生命周期进行 DOM 操作，也要放在`nextTick`里

实现原理：

1. nextTick() 将收到的回调函数压入一个 callbacks 数组保存

2. **判断在当前环境下应该使用哪种异步延迟函数来执行回调**，将回调放到微任务或宏任务中，优先微任务【判断当前环境是否支持promise => 是否支持MutationObserver 】，如果不支持则降级为宏任务 【判断是否支持setImmediate() => 上述都不满足使用setTimeout()】

3. 等事件循环到了微任务或宏任务，依次调用回调

【 MutationObserver用于异步监视DOM中发生的变化，在变化时执行指定的回调 】

[[面试官：Vue中的$nextTick有什么作用？ | web前端面试 - 面试官系列](https://vue3js.cn/interview/vue/nexttick.html#%E4%B8%89%E3%80%81%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)]

## 13.单页应用 SPA 和多页应用 MPA 的区别 ⭕️

单页应用 SPA：

- 只有一个主页面，只需要初始加载一次 js、css 等资源

- 跳转页面只会刷新局部资源

- 适用场景：对体验度和流畅度较高的应用，不利于 SEO

多页应用 MPA：

- 有多个主页面，每个页面都要重复加载 js、css 等资源

- 跳转页面需要刷新整页的资源

- 适用场景：对 SEO 要求高

## SPA首屏加载慢如何解决

1. 减少资源大小
   
   - 压缩图片资源、压缩代码
   
   - 配置gzip压缩

2. 减少http请求次数
   
   - 缓存静态资源

3. 提高http请求响应速度
   
   - 静态资源部署cdn

4. 优化资源加载时机
   
   - 第三方ui框架按需加载
   
   - 路由懒加载减小入口文件体积，把不同路由对应的组件分割成不同代码块，路由被请求的时候会单独打包，使入口文件变小，加载速度快

5. 优化页面渲染
   
   - 优化js：放body后、异步加载
- 使用ssr

## 对SPA的理解，它的优缺点分别是什么？⭕️

只有一个主页面的应用，它在加载完初始页面后，只会动态更新页面内容，不会重新加载整个页面

优点：

- 用户体验好。用户和页面交互都是异步加载数据，更新部分内容，不需要重新加载整个页面

- 降低服务器负载。加载初始页面后，后续不再需要重新加载整个页面

- 前后端松耦合。spa 通常采用前后端分离开发。前端负责页面渲染和交互，后端负责处理数据和业务逻辑

缺点：

- 首屏加载速度慢，首次需要加载大量html、js、css等资源

- SEO难度大，页面上的内容大部分是js动态渲染出来的，爬虫爬取几乎不到什么内容

## 14.vue 模板编译原理

模板编译：将 vue 中的模板 template 转化为 render 函数

1. 调用parse()，将template转为抽象语法树 ast
2. 遍历 ast，标记静态节点，在页面重渲染的时候直接跳过这些静态节点
3. 调用generate()，将 ast 编译成render字符串，生成 render 函数

## 15. data 中某个属性的值发生改变后，视图会立即重新渲染吗？

不会
vue 实现响应式并不是数据变化后 DOM 立即变化
vue 更新 DOM 是异步执行的，侦听到数据变化，vue会开启一个队列，并缓存发生在同一事件循环中的所有数据变更，这是为了去除重复的不必要的dom操作和计算。然后在下个事件循环中，vue才会执行实际工作。

## 16. 描述 vue 自定义指令

需要对 普通 DOM 元素进行底层操作的时候，就可以用到自定义指令

分为全局指令和局部指令
全局：在 main.js 中用 Vue.directive()注册，参数 1 是指令名称，参数 2 是包含一些类似生命周期钩子的对象，钩子会将指令绑定的元素作为参数，在触发时执行

局部：在 options 选项中设置 directive 属性，是一个对象，以指令名称作为 directive 对象的属性，指令名称是包含一些类似生命周期钩子的对象

使用案例：实现图片懒加载，使用第三方库，按钮权限控制

## vue常用的修饰符有哪些？有什么使用场景

- stop
  
  阻止事件冒泡，相当于调用 event.stopPropagation()

- prevent
  
  阻止事件默认行为，相当于调用 evnet.preventPropagation()

- self
  
  仅当evnet.target是当前元素自身时才触发函数
  
  `<div @click.self="handleClick"></div>`
  
  【`@click.self.prevent` 只会阻止元素自身的默认行为】
  
  【`@click.prevent.self` 会阻止所有元素的默认行为】

- once
  
  绑定的事件只会触发一次

- native
  
  监听组件的原生事件

## 17. 子组件可以直接修改父组件的数据吗？

不可以
在 vue 中要遵循单向数据流原则，子组件不能修改父组件传来的 props
这样可以防止子组件意外修改父组件的状态
如果有多个子组件依赖父组件的某个数据，那么一个子组件使父组件变化可能会引起多个子组件变化

如果想要修改props：

- 新定义一个 data，初始化为 prop 值
- 新定义一个计算属性，处理 prop 值

## 18. vue 的优点

- 轻量级框架：大小只有几十kb
- 中文文档，容易学习
- 双向数据绑定，数据和视图会同步变化，不需要我们去操作 DOM 更新视图
- 组件化开发，将页面拆成一个个可复用的组件，便于管理代码

## 19. assets 和 static

相同：都是存放静态资源文件
不同：assets 中的资源会在构建过程中被打包压缩优化
static 中的资源不会被打包压缩优化

建议：自己的静态资源放在 assets 中，第三方资源放在 static 中

## 20. 说说对 mixin 的理解

mixin本质上是一个js对象，如果希望在多个组件之间复用一套组件选项，例如生命周期、方法、data等，就可以把它编写成mixin，然后在组件中使用mixin选项混入，mixin中的内容会合并到组件中

缺点：

- 多个mixin中相同的属性、方法之类的，会造成命名冲突
- 增加耦合度

mixin的生命周期会比组件自己的生命周期先执行，组件可以覆盖

## 21.对 ssr 的理解

ssr 就是服务端渲染
在服务端渲染 html，再把 html 返回给客户端

【传统的csr中，是在浏览器端完成对html的渲染】

优点：

- 更好的 seo
- 首屏加载速度更快

缺点：

- 服务端压力较大
- 开发和部署难度变大

## 22.vue 的性能优化有哪些 ⭕️

代码层面：

- v-if 和 v-show 区分使用场景
- v-for 遍历添加 key，避免和 v-if 一起用
- 防抖、节流
- 路由懒加载
- 图片懒加载
- 频繁使用的组件使用keep-alive
- 长列表性能优化（纯粹的数据显示，用 Object.freeze()禁止 vue 劫持）
- 第三方插件按需引入

SEO层面：

- 预渲染

- 服务端渲染

打包优化：

- 压缩代码
- tree shaking/scope hoisting【移除未使用的代码/合并模块间的代码作用域】
- thread-loader多线程打包【将任务拆分成多个子线程并行处理，加快打包速度】
- splitChunks代码分割【将代码分割成更小的块，减少首次加载时间，还能实现按需加载】

用户体验：

- 使用骨架屏
- 开启 gzip 压缩
- 使用缓存优化

## 官网总结的vue相关的性能优化

（和vue相关）

web应用性能的两个主要方面：

- 页面加载性能：首次访问时应用展示出内容的速度
  
  1. 选用正确的架构：SSR或SSG(静态站点生成)
  
  2. 减小打包体积：充分利用构建工具提供的功能和优化选项
     
     压缩代码、tree-shaking、代码分割

- 更新性能：应用响应用户输入更新的速度
  
  1. props稳定性：传给子组件的props尽可能稳定
  2. v-once：仅渲染元素和组件一次，跳过之后更新
  3. v-memo：绑定一个数组，如果数组中元素没变，就跳过该元素的更新

- 通用优化：同时改善页面加载性能和更新性能
  
  1. 大型列表-使用虚拟列表
  2. 减少深层不可变数据的响应性开销-

## vue中组件和插件的区别

- 组件是把一部分逻辑抽取出来，方便我们进行复用、降低代码耦合度、快速定位错误
  
  插件通常给vue添加全局功能：全局方法/属性、全局资源、vue实例方法

- 编写上不同：
  
  **组件通常使用.vue单文件编写**，具有<template> <script> <style>等模块
  
  **插件的实现需要暴露一个`install`方法**
  
  (vue2写法)
  
  ```js
  // 参数1是Vue实例构造函数，参数2配置项
  MyPlugin.install = function (Vue, options) {
      // 添加全局方法
      Vue.myGlobalMethod = function () {}
      // 添加实例方法
      Vue.prototype.$myMethod = function () {}
  }
  ```
  
  (vue3写法)
  
  ```js
  // /src/plugins/xxx.js
  export default {
      // 参数1是createApp()生成的vue实例
      install: (app, options) => {}
  }
  ```

- 注册方式不同：  
  **组件分为全局注册和局部注册**
  
  全局：2Vue.component() 3createApp().component()
  
  局部：2components选项 3script setup中直接导入无需注册/否则components选项
  
  **插件通过`use()`方法注册**
  
  use()会自动阻止多次注册相同插件，只会注册一次
  
  ```js
  Vue.use(插件名，{ 配置项 }) // v2
  
  app.use(插件名，{ 配置项 }) // v3
  ```

## vue权限管理要怎么做？如果控制到按钮级别的权限怎么做？

- 路由权限设置
  
  用户访问无权限的页面，跳转登录页
  
  - 在全局前置守卫中检查要访问的路由是否有权限限制(配置meta属性)，有权限限制的话有无token，无token跳转到登录页

- 接口权限设置
  
  接口访问无权限一般返回401，跳转登陆页
  
  - 在请求拦截器中将token添加到请求头，在响应拦截器中判断状态码决定是否跳转到登录页

- 菜单权限设置
  
  不同级别的用户看到不同菜单
  
  - 一般是后端根据token或者某个值返回该级别用户的菜单，渲染到页面就行

- 按钮权限设置
  
  根据不同的用户，显示或隐藏按钮
  
  - 在路由配置meta属性，新建自定义指令，判断该用户能看到该页面的哪些按钮
    
    ```js
    {
        path: 'home',
        meta: { // 定义home页面具有的btn
            btnPermission: ['admin']
        }
    }
    ```
    
    app.directive('has', {
    
        mounted(el) {
            const permissions = ....meta.btnPermissions
            // 获取当前用户的按钮权限
            const btnPermission = localStorage.getItem(role)
            if(!permission.includes(btnPermission)) {
                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            }
        }
    
    })
    
    <button type="button" v-has>管理员按钮</button>
    
    ```
    
    ```

        

# 生命周期

## 1. 说一下 vue 的生命周期

vue 实例创建时会经过一系列初始化过程

到达某一阶段都会触发对应的生命周期函数，是为了完成一些操作
生命周期主要分为 8 个阶段：创建前后、挂载前后、更新前后、销毁前后
以及一些特殊场景的生命周期

创建阶段：（vue3 中没有这两个，只能放在 setup()里）

- beforeCreate：vue 实例创建初(已创建)，data 和 methods 等options还没初始化
- created：vue 实例创建完，data 和 methods 等options已经初始化

挂载阶段：

- beforeMount：模板已经编译完，还未挂载到页面上
- mounted：模板已经挂载到页面上【用编译好的内容替换el属性指向的DOM对象】，此时可以操作 DOM

更新阶段：

- beforeUpdate：响应式数据发生变化，模板还未更新
- updated：模板更新后

销毁阶段：

- beforeDestroy：vue 实例销毁前
- destroyed：vue 实例销毁后

特殊的：

- activated：keep-alive 缓存的组件被激活时
- deactivated：keep-alive 缓存的组件被停用时

## 2. vue 子组件和父组件执行顺序

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

## 3. 数据请求created 和 mounted 的区别

created()在组件实例创建完成时立刻调用

mounted()在页面节点渲染完后立刻调用

放在mounted中的请求有可能导致页面闪动，因为此时页面dom结构已经生成

（如果网络请求很耗时，而请求的数据又用于页面的渲染，那么页面可能会在数据到达之前先渲染出来，然后再进行更新，导致页面闪动。）

# 组件通信

## 1. 组件通信的方式

父子：

- props 和 emit
  父组件通过 props 向子组件传递数据，子组件通过emit触发事件并传递参数

- ref
  
  通过ref属性给子组件设置一个名字，在父组件中可以通过这个名字访问到子组件实例

- \$parant 和 \$children
  
  $parent访问上一级父组件实例，\$children访问子组件实例的数组（无序）

- provide 和 inject
  父组件中通过 provide 提供变量，子组件通过 inject 注入变量

- attr透传

   父组件传递给子组件的非props属性自动透传给子组件，子组件可以通过attr拿到

- 作用域插槽
  
  子组件通过<slot>给父组件传递数据    

兄弟：

- eventBus 事件总线
  创建一个 vue 实例作为通信的对象，bus = new Vue()
  组件利用`bus.$emit()`、`bus.$on()`发送和接收事件

任意：

- eventBus 事件总线

- vuex / pinia

# 路由

## 1. vue-router的懒加载如何实现

1. 箭头函数+import
   
   const List = () => import('@/components/list.vue')

2. 箭头函数+require

   components: resolve => require(['@/components/list', resolve])

3. 使用webpack的require.ensure
   
   最后一个参数是chunkName，如果多个路由指定相同的chunkName，会合并打包成一个模块
   
   ```js
   const List = resolve => require.ensure([], () => resolve(require('@/components/list')), 'list');
   ```

## 2. 路由的hash和history模式的区别 ⭕️

hash模式：

- url中会带着一个#符，#后面的值就是哈希值
- 哈希值不会发送到服务器，所以改变哈希值也不会重新加载页面
- 原理是监听浏览器的hashChange事件
- 支持低版本浏览器，能兼容到ie8

history：

- url中没有#

- 整个url都会发送到服务器，如果服务器没有做对应的路由处理，会返回404错误

- 原理是利用了浏览器的history api【pushState() replaceState()】

- 兼容性不如hash模式，只能兼容到ie10

## 3. 如何获取页面的hash变化

1. watch监听\$route

2. 监听浏览器的hashchange事件

3. 使用window.location.hash属性

## 4. \$route和\$router的区别

$route是路由信息对象，包括path、params、query、fullPath等路由信息参数

$router是全局的路由实例对象，包含路由跳转方法、钩子函数等

## 5. 如何定义动态路由

- param方式

   配置路由：/router/:id

   路由跳转：router.push({ name: xxx, params: { id: 1 } })

   路径：/router/1

   参数获取：route.params.id

- query方式
  
  配置不用变
  
  路由跳转：router.push({ path: xxx, query: { id: 1 } })
  
  路径：/router?id=1
  
  参数获取：route.query.id

## 6. params和query的区别

使用params传参必须用name配置项，不能用path配置项，query都可以

## 7. 导航守卫 ⭕️

导航守卫--路由跳转过程中的钩子函数

1. 全局导航守卫
   
   - router.beforeEach 前置守卫，【判断是否登录，没登录就跳转登录页】
   
   - router.beforeResolve 解析守卫
   
   - router.afterEach 后置守卫
   
   router.beforeEach((to, from, next) => {})
   
   to要进入的路由，from要离开的路由，next是一个函数，调用这个函数让导航继续
   
   router.afterEach没有next参数

2. 路由独享守卫
   
   beforeEnter 定义在routes的路由对象中
   
   进入路由时触发，【不会在params/query/hash改变时触发，从不同路由进入才会】

3. 组件内守卫
   
   - beforeRouteEnter进入组件前触发，不能获取组件实例this
     
     `next(vm => { // 通过vm访问组件实例 })`
   
   - beforeRouteUpdate路由改变但组件复用时触发
   
   - beforeRouteLeave离开组件时触发

## 8. 对前端路由的理解 ⭕️

前端路由是在单页面应用中管理导航和页面切换的，在单页面应用中，页面切换前后的url都是一样的，没有办法判断当前页面到了哪一步，并且前进多步得到的内容刷新一下就会消失，没有办法对内容定位。前端路由可以给SPA每一个视图匹配一个标识，每个视图都会映射到不同的url，url可以定位，这样刷新内容也不会消失

# vuex

## 1. Vuex的原理 ⭕️

vuex是一种状态管理模式

状态管理就是把多个组件共享的变量存储在一个对象中，用来集中管理公共数据

并且vuex的状态存储是响应式的，组件从store中读取数据的时候，如果数据发生了改变，组件也会更新

主要解决的问题：多界面的状态管理【单界面状态管理非常简单，vue已经实现了】

1. 多个界面依赖同一个状态，一个状态改变了多个界面都需要更新

2. 不同界面的行为要改变同一个状态

如何解决问题：vuex使用**单一状态树**来管理所有的状态，每个应用只有一个store实例

单一状态树使我们更轻松管理应用状态，好比一个大仓库，把东西集中管理

Vuex的核心流程：（单向数据流）

组件会触发actions => actions提交mutations => mutations修改state => 组件重新渲染

## 2. Vuex中action和mutation的区别

- mutations中的方法可以直接修改state，actions中的方法是用来提交mutation，而不是直接修改state

- mutations中的方法只能执行同步操作，action可以执行异步操作

## 3. 为什么mutation不能做异步操作

每个mutation都执行完都对应一个状态变化，devtools都可以记录下来，便于我们调试

如果mutation支持异步操作，就不知道状态是什么时候更新的，devtool跟踪不到

## 4. Vuex有哪几种属性？

- state：存储公共管理的数据

- getters：类似于计算属性，对state进行加工

- mutations：修改state的唯一推荐方法，该方法只能进行同步操作

- actions：用来提交mutation，可以进行异步操作

- modules：模块化vuex，每个模块都有自己的state、getters、mutations、actions

## 5. 为什么要用Vuex？⭕️

我们使用vuex可以解决一些问题：

多层嵌套组件之间传参繁琐，有些状态需要多个组件共享

vuex将组件的共享状态提取出来，全局进行管理，无论组件嵌套多深都可以轻松获取状态或触发行为

并且vuex还支持响应式更新，和一些可扩展的插件

vuex能帮助我们更好的组织和管理一些全局的状态，提供了一种规范的方式来处理组件之间的状态传递

## 6. vuex和localStorage的区别

- vuex存储在内存中，localStorage存储在本地，读取内存速度比读取硬盘速度快

- vuex一般用于组件之间传递数据，localStorage用于跨页面传递数据

- vuex可以做到数据响应式，localStorage不能

## 7. 如何在组件中批量使用Vuex的getter和mutation

```js
import { mapGetters, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapGetters([''])
    },
    methods: {
        ...mapMutations([''])
    }
}
```

# vue3.0

## 1. vue3 有什么更新 ⭕️

- 使用 proxy 实现数据监听，可以监听到任何形式的数据改变，没有 Object.defineProperty 的很多限制
- composition 组合式 api
  vue2 中的 options，一个功能被分割到了 data、methods、computed 里，导致耦合度高难维护，vue3 的组合式 api 会把一个功能的代码放一起
- 优化了虚拟 DOM 的 diff 算法，增加了patch flags更新类型标记，通过更新类型标记能够用最小化操作实现更新。还引入了静态树提升，对于不参与更新的元素只会被创建一次，在渲染时直接复用
- 生命周期钩子，去掉了 beforeCreate 和 created，增加了 setup，beforeDestroy 和 destroyed 也改名为 onBeforeUnmount 和 onUnmounted，并且所有的钩子都要放在 setup 里
- 基于 tree-shaking 摇树优化，重构了一些 api，减小了代码量（比如 vue2 中的 Vue. nextTick 没有用到也会打包进来，vue3 就是只有引入进来的会打包）
- 新的组件 Fragment、Teleport、Suspense
  - Fragment，在 vue3 中组件可以没有根标签，内部会将多个标签包在一个 Fragment 中
  - Teleport 可以包裹 html 传送到指定地方
  - Suspense 展示异步组件

## 2. 为什么要有组合式api ⭕️

- 更好的逻辑复用
  
  通过组合式函数(hook)来实现更简洁的逻辑复用，在options api中我们主要的逻辑复用机制是mixins，mixins缺陷：1.不知道数据来自哪个mixin 2.不同的mixin可能使用相同的属性名造成命名冲突 

- 更灵活的代码组织
  
  options api将一个功能被分割到了 data、methods、computed 里，导致耦合度高难维护，大型项目中会分散我们的逻辑关注点，vue3 的组合式 api 会把一个功能的代码放一起

- 更好的类型推导
  
  options api的类型推导不是很理想，组合式api可以享受到完整的类型推导

## 3. 说一说你对hooks的理解 ⭕️

其实就是函数，将一些单独功能的代码抽离出来复用

vue2中options api我们主要的逻辑复用方式是mixins混入，但mixins有缺陷1.不知道数据来自哪个mixin 2.不同的mixin可能使用相同的属性名造成命名冲突

vue3中组合式api能更方便我们去封装hooks来实现逻辑复用

# 虚拟DOM

## 1. 对虚拟 DOM 的理解

- 虚拟 DOM 本身是一个 js 对象，它用属性来描述一个视图
- 虚拟 DOM 设计的最初目的是为了更好的跨平台，它抽象了真实 DOM 的渲染过程，不局限于浏览器
- 使用虚拟 DOM 可以减少直接操作真实 DOM 的次数，利用 diff 算法比较新旧虚拟 DOM，只更新变化的部分，不会引起频繁的重排和重绘
- 缺点是首次渲染 DOM 的时候多了一层虚拟 DOM 的计算，速度比正常稍慢

## 2. 虚拟dom的解析过程

首先对将要插入到文档中的dom树结构进行分析，用js对象将其表示出来，然后保存js对象树，最后将dom树插入到文档中

当需要对页面中的dom结构进行改变的时候，根据变更的状态，重新构建一颗js对象树，再将新的对象树和旧的对象树进行比较，记录两棵树的差异

最后将记录的差异更新到真正的dom树中，视图就更新了

## 3. 为什么要用虚拟dom

1. 保证性能下限
   
   重排重绘的性能消耗：
   
   真实dom：生成html字符串+重建所有的dom元素
   
   虚拟dom：生成虚拟dom+diff+必要dom更新

2. 跨平台
   
   虚拟dom本质是js对象，方便跨平台操作

## 虚拟dom真的快吗？任何时候都快吗？

操作真实dom需要生成html字符串+重建所有的dom，操作虚拟dom：生成虚拟节点+diff算法比较差异+更新必要的dom，在需要操作大量真实dom的时候，虚拟dom的消费对比起来是很便宜的，所以说使用虚拟dom能保证性能下限。在一些简单场景下，操作真实dom可能更加高效。

而且虚拟dom本质上是为了提高我们的开发效率，在更新节点时，会检查哪些节点需要更新，尽量复用节点，这些操作我们也可以手动操作来实现，但是会耗费我们的精力。

## 4. diff 算法的原理 ⭕️

简单来说就是对着虚拟 DOM 树从上到下进行同层对比

<!-- 在对比新旧虚拟 DOM 时，
先对比节点本身，判断是否为相同节点，如果不相同就删除该节点重新创建节点

- 如果是相同节点，就要继续判断双方是否都有子节点，
  - 如果新节点没有子节点，就将旧节点移除
  - 如果新节点有子节点，就给旧节点添加新的子节点
  - 如果都有子节点，就继续判断如何对子节点进行操作，递归比较所有子节点 -->

1. dep.notify()通知订阅者watcher，使用patch(oldvnode,newvnode)接收新旧虚拟节点，先比较是否是同类标签，不是同类标签则直接替换，是则执行patchVnode()

2. patchVnode()比较新旧节点是否相等【比较 tag 和 key】
   
   相等 => 直接return
   
   不相等 => 新旧都有文本节点 => 新文本替换旧文本

         => 旧没有子节点，新有子节点 => 增加新的子节点

         => 旧有子节点，新没有子节点 => 删除旧的子节点

         => 新旧都有子节点，执行updateChildren()

3. updateChildren()对子节点列表进行同级比对
   
   4 个指针指向新旧子节点列表的头和尾，然后两两分别进行比较
   
   【旧头跟新头比较，旧头跟新尾比较，旧尾跟新头比较，旧尾跟新尾比较】
   
   比较成功后，真实dom的渲染结果以新节点为准，比较成功的头指针会向右移动，尾指针向左移动
   
   当头指针移动到尾指针右侧时就终止比较
   
   如果以上四种比较都没有成功，则比较新旧节点的key值，如果key值相同则复用

## 5. vue 中 key 的作用

1. v-if 使用 key，v-if 切换前后会尽可能复用元素，如果是 input，切换前后用户的输入不会被清除
   这时候可以用 key 来唯一地标识一个元素，使用了 key 就不会复用
   
   【key的作用是唯一标识一个元素】

2. v-for 使用 key，v-for 渲染的列表更新的时候是“就地复用”，就是尽可能复用节点，
   这时候给每一项绑定一个 key，能让 vue 更快地判断这一项是否能进行复用，提高效率
   
   【key的作用是高效地更新虚拟dom】

## 6. 为什么不建议 index 作为 key

如果有破坏顺序的操作，每个节点对应的 key 都会变化，导致不能复用

## vue 的兼容性

vue 支持所有兼容 es5 的浏览器，ie8 及以下浏览器均不支持 vue
vue 实例初始化时会遍历 data 中的所有属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter
Object.defineProperty 没办法用低级浏览器中的方法实现，所以 vue 不支持

# 运行时渲染器和编译时渲染器

- 运行时渲染器(runtime-only)
  
  不包含模板编译器
  
  render函数将数据对象渲染成dom
  
  数据格式限制：
  
  ```js
  const obj = {
      tag: 'div',
      children: [
          { tag: 'span', children: 'hello world'}
      ]
  }
  ```

- 编译时渲染器(runtime+compiler)
  
  包含了模板编译器compiler
  
  comiler将template编译成数据对象👆，再交给render函数将数据对象渲染成dom

纯编译时框架svelte 

vue是一个运行时+编译时框架，（运行时编译），既支持运行时(用户直接提供数据对象无需编译)，又支持编译时(用户提供模板)

# vue 渲染管线

```json
         compile           return                mount/patch
template --------> render --------> virtual dom -------------> actual dom
                     ｜
                  👆     👇
   trigger re-render    track dependency
       触发重新渲染           跟踪依赖
                     ｜
            component reactive state
                （组件响应式状态）                     
```

1. 编译 
   
   vue模板编译成render函数，这个步骤可以项目构建时就编译好 / 程序运行再编译(性能开销大)

2. 挂载
   
   运行时渲染器调用render函数，（render函数会返回虚拟dom）遍历虚拟dom树，基于虚拟dom树创建实际的dom节点

3. 更新
   
   当有依赖发生变化时，会创建一个更新后的虚拟dom树，运行时渲染器遍历新树，将它与旧树进行比较，然后将必要的更新应用到真实dom上

# 模板vs渲染函数

render函数更灵活，适合处理高度动态渲染逻辑

vue默认推荐使用模板

1. 使用模板更方便复用html片段
2. vue的模板编译器能应用编译时优化来提升虚拟dom的性能

# 浏览器更新渲染时机

浏览器更新渲染会在事件循环中的宏任务和微任务完成后进行

vue为什么要优先使用微任务实现nextTick？

优先使用微任务实现，本次事件循环就能获得更新的dom

如果使用宏任务，要等到下一次才能获得更新的dom
