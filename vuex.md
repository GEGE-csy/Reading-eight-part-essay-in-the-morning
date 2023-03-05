# Vuex

Vuex 是一种状态管理模式，状态管理就是把多个组件共享的变量全部存储在一个对象里
用来集中管理公共数据
并且 vuex 的状态是响应式的，组件从 store 读取状态时，若状态发生改变，该组件也会更新
比如用户的登录状态、用户名称之类的

Vuex 有几大属性：

- state：存储公共管理的数据
- getters：类似于计算属性，可以对 state 进行加工
- mutations：用来修改 state，只能进行同步操作，要执行 mutation 中的方法时要 使用 commit 触发
- actions：用来提交 mutation，可以进行异步操作，执行 actions 中的方法要 dispatch
- modules：模块化 vuex，每个模块都有自己的 state、getters、mutations、actions

# vuex 中 mutation 和 action 的区别

- mutations 中的方法可以直接修改 state，actions 中的方法是用来提交 mutation，而不是直接改变 state
- mutation 必须是同步方法，action 可以是异步方法

# 为什么 mutation 不能做异步操作？

每个 mutation 执行完都对应一个状态变化，devtools 就可以记录下来，便于我们调试
如果 mutation 支持异步操作，就不知道状态是什么时候更新的，devtools 跟踪不到

# 如何批量使用 vuex 的 getter 和 mutation

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

# vuex 和 localStorage 的区别

- vuex 存储在内存中，localStorage 存储在本地，读取内存速度比读取硬盘快
- vuex 集中管理组件的状态，一般用于组件之间传递数据，localStorage 将数据存储到浏览器，一般用于跨页面传递数据
- 刷新页面时 vuex 存储的值会丢失，localStorage 不会
- vuex 可以实现数据响应式，localStorage 做不到
