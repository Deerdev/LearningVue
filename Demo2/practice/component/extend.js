import Vue from 'vue'

const compoent = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  mounted () {
    console.log('comp mounted')
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

const parent = new Vue({
  name: 'parent'
})

// 这种声明方式，parent会在vue渲染时挂载
// 扩展原有组件，覆盖属性
const componet2 = {
  extends: compoent, // 类似于继承
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    // 挂载到的 父组件 名称（此处是Vue实例）
    console.log(this.$parent.$options.name)
    // 可以通过 $parent 修改父组件属性
    this.$parent.text = 5566
  }
}

// CompVue 是 Vue 的子类，但是包含了compoent组件的所有属性 data method ...
// const CompVue = Vue.extend(compoent)

// 像vue一样使用CompVue，不需要指定template，component组件中已经定义
// new CompVue({
//   el: '#root',
//   propsData: {
//     // 传递props中 propOne 的值
//     propOne: 'xxx'
//   },
//   data: {
//     // 合并 / 覆盖component中的定义
//     text: '123'
//   },
//   mounted () {
//     // 两个mounted中的方法都会调用
//     console.log('instance mounted')
//   }
// })

new Vue({
  // new 一个 Vue 的时候可以指定他的 parent
  parent: parent,
  name: 'Root',
  el: '#root',
  mounted () {
    console.log(this.$parent.$options.name)
  },
  components: {
    Comp: componet2
  },
  data: {
    text: 23333
  },
  template: `
    <div>
      <span>{{text}}</span>
      <comp></comp>
    </div>
  `
})
