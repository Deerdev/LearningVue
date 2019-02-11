import Vue from 'vue'
import App from './app.vue'

// css和图片会被webpack打包
import './assets/styles/test.css'
import './assets/styles/test-stylus.styl'
import './assets/images/test.png'


const root = document.createElement('div')
document.body.appendChild(root)

// 将App渲染 并挂载到 root 节点上
new Vue({
    // h参数：即createApp
    render: (h) => h(App)
}).$mount(root)