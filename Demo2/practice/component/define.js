import Vue from 'vue'
// 定义组件
const compoent = {
  // props变量 不能修改
  props: {
    active: {
      // type: Boolean,
      // required: true,
      // 默认值
      // default: true
      // default() { 如果返回对象，使用方法，方式多个实例公用一个 }
      validator(value) {
        return typeof value === 'boolean'
      }
    },
    // 赋值时  推荐使用 prop-one，见下
    propOne: String
    // 声明了chang，可以直接调用
    // change: Function
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  // functon 声明，每个组件实例都返回一个新的data实例，而不是 共享(不然连个compoent组件 会使用同一份变量对象，一处改 处处改)
  data() {
    return {
      text: 0
    }
  },
  methods: {
    handleChange() {
      // props中没有声明，只能通过emit方法 调用change方法
      this.$emit('change')
    }
  }
}

// 全局定义这个组件，所有地方都可以使用
// Vue.component('CompOne', compoent)

new Vue({
  components: {
    // CompOne 驼峰命名组件，在html中会变成<comp-one>
    CompOne: compoent
  },
  data: {
    prop1: 'text1'
  },
  methods: {
    handleChange() {
      this.prop1 += 1
    }
  },
  mounted() {
    // 挂载之后 才能调用$refs
    console.log(this.$refs.comp1)
  },
  el: '#root',
  template: `
    <div>
      <comp-one ref="comp1" :active="true" :prop-one="prop1" @change="handleChange"></comp-one>
      <comp-one :active="true" propOne="text2"></comp-one>
    </div>
  `
})
