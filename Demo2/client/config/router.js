import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,
    // mode 去除url中的 "#" http://xxx/#/app
    mode: 'history',
    // 把所有的vue-router定义的路径都添加一个 /base/ 的前缀，http://xxx/base/app
    // base: '/base/',
    // <router-link to="/app/456">app456</router-link> 定义链接时，需要给该链接添加的 class ，方便自己可以定义css
    // linkActiveClass 代表，当前网页路径 和 <router-link to="/app/456"> 中 to 的路径『部分』匹配时，会给该链接 加上 'active-link' 的class
    // linkExactActiveClass 代表，当前网页路径 和 <router-link to="/app/456"> 中 to 的路径『一致』时，会给该链接 加上 'exact-active-link' 的class
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    // 页面跳转后，是否滚动页面（滚动条是否调整）
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        // 如果保存过 滚动位置，就使用这个位置
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
    // fallback: true
    // 自定义：把地址中的query（?xxx=1&yyy=2）转成 json obj
    // parseQuery (query) {

    // },
    // 自定义：把json obj转成 地址中的query（?xxx=1&yyy=2）
    // stringifyQuery (obj) {

    // }
  })
}
