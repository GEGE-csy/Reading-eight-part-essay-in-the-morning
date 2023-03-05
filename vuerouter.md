# 怎么定义 vue-router 的动态路由

在配 path 属性中使用路径参数，以冒号开头

```js
{
	path: "/details/:id";
}
```

访问/details/a、/details/b 这样的路径都会映射到 details 组件上
匹配到/details 下的路由时，参数值会被设置到`this.$route.params`下

# 导航守卫

导航守卫就是路由跳转过程中的一些钩子函数

- 全局前置守卫
  router.beforeEach((to, from) => {})
  每个守卫方法接收三个参数：to、from、next
  to: 即将要进入的路由
  from: 当前要离开的路由
  next：一个函数，要调用这个函数进入下一个守卫
  一般用来登录验证
- 全局后置钩子
  router.afterEach((to, from) => {})
  没有 next 参数
  一般用来改变页面标题
- 路由独享守卫
  写在 routes 数组的路由配置中
  进入不同的路由时会触发
  ```js
  {
    path: '/users',
    beforeEnter: (to, from) => {}
  }
  ```
- 组件内守卫
  - beforeRouteEnter，不能获取组件实例 this，守卫执行时组件实例还没创建
  ```js
  beforeRouteEnter(to, from, next) {
    // 通过给next传一个回调来访问组件实例，导航被确认时执行回调
    next(vm => {})
  }
  ```
  - beforeRouteUpdate，路由改变但组件复用时调用
  - beforeRouteLeave，离开该组件对应的路由时调用

# $route和$router 的区别

`$router` 是 vue-router 的实例，一个全局路由对象，包含路由跳转的方法
`$route` 是路由信息对象，每个路由都会有一个`$route`对象，是一个局部的对象，包含 path、params、query 这些路由信息参数

# vue-router 传参

- params
  配置路由的时候就要在 path 上设置路径参数
  传递的时候路由必须用 name，不能用 path
  参数不会显示在路径上
- query
  无需多余配置
  参数会显示在路径上

# hash 模式和 history 模式的区别

- hash 在地址栏有#号
- hash 支持低版本浏览器，能兼容到 ie8，history 只能兼容到 ie10
- hash 值变化不会导致浏览器向服务器发出请求，history 需要后端做特殊配置，解决刷新页面返回 404，因为 history 改变 url 会向服务器发请求，如果服务器没有对应的资源就会 404，所以服务端要做特殊处理，如果匹配不到资源就还是返回原来的页面
- hash 模式是监听 onhashchange 事件，查找对应的路由应用。history 利用了 history 接口中的 pushState()和 replaceState()

# vue-router 实现路由懒加载

路由懒加载：把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应的组件

```js
{
	components: () => import("");
}
```
