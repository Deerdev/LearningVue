// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // 加参数id
    // path: '/app/:id', // /app/xxx
    path: '/app',
    // true: 路径中的参数id 会作为 props 参数传递给 ToDo 组件
    props: true,
    // 也可以声明成方法
    // props: (route) => ({ id: route.query.b }),

    component: () =>
      import(/* webpackChunkName: "todo-view" */ '../views/todo/todo.vue'),
    // component: Todo,

    // 通过 name 可以直接做路由的跳转 :to={name: 'app'}
    name: 'app',
    // 源信息，比如搜索引擎的description
    meta: {
      title: 'this is app',
      description: 'asdasd'
    },
    beforeEnter (to, from, next) {
      console.log('app route before enter')
      next()
    }
    // 子路由 /app/test；应该在 ToDo 组件中添加 <router-view></router-view>，来显示子组件
    // 因为ToDo是当前组件，子路由 只能显示在当前组件 内部
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login-view" */ '../views/login/login.vue')
    // component: Login
  }
]

/// 页面跳转 过渡动画
// 在<router-view />外层套一个<transition>
// <transition name="fade"> <router-view /> </transition>

// css样式中 定义 fade 动画（global）
// .fade-enter-active, .fade-leave-active
//   transition: opacity .5s
// .fade-enter, .fade-leave-to
//   opacity: 0
