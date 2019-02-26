import Router from 'vue-router';

import routes from './routes';

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
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
    // fallback: true
    // parseQuery (query) {

    // },
    // stringifyQuery (obj) {

    // }
  })
};
