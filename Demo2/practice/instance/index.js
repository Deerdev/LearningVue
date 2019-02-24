import Vue from 'vue'

// app vue实例对象
const app = new Vue({
  // el: '#root',
  template: '<div ref="div">{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
  // watch: {
  //   text (newText, oldText) {
  //     console.log(`${newText} : ${oldText}`)
  //   }
  // }
})
// 挂载到html
app.$mount('#root')

let i = 0
setInterval(() => {
  i++
  // app.text += 1
  // app.text += 1
  // app.text += 1
  // app.text += 1
  // app.text += 1

  // 给obj添加 'a' 属性，但是这种情况下，vue组件不会刷新（）
  // app.obj.a = i
  // 强制app组件刷新
  // app.$forceUpdate()

  // $set 设置 可以刷新，通过 app.$delete 删除
  app.$set(app.obj, 'a', i)

  // 无法直接修改data(说明$options并不是直接引用 传进去data)
  // app.$options.data.text += 1
  // 可以修改
  // app.$data.text += 1

  app.$nextTick({
    // Dom刷新完成后调用
  })
}, 1000)

// 打印app组件中定义的属性，对应data字段 后同
// console.log(app.$data)
// console.log(app.$props)

// 对应app挂载到的html节点
// console.log(app.$el)
// 传进Vue，创建Vue实例对象的参数（包含 data template components。。。）
// console.log(app.$options)

// render 方法可以替换成功，不会渲染app，而是下面的div
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }

// $root 组件的根节点（挂载到html中的根节点/第一个组件，Vue是树状渲染的）
// console.log(app.$root === app)
// 子组件
// console.log(app.$children)
// 插槽
// console.log(app.$slots)
// console.log(app.$scopedSlots)

// 组件的引用：ref="div", 打印：div
// console.log(app.$refs)
// 组件实例 是否是服务端渲染
// console.log(app.$isServer)

// 添加watch方法，返回注销方法
// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// })

// 调用后，即可注销该watch方法
// setTimeout(() => {
//   unWatch()
// }, 2000)

// 监听方法
// app.$on('test', (a,b) => {
//   console.log('test')
// })
// 触发时间，可以传递参数
// app.$emit('test', 1, 2)

// 只监听一次
// app.$once('test', (a, b) => {
//   console.log(`test emited ${1} ${b}`)
// })

// setInterval(() => {
//   app.$emit('test', 1, 2)
// }, 1000)

// app.$forceUpdate()
