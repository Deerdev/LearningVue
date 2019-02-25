import Vue from 'vue'

const ChildComponent = {
  template: '<div>child component: {{data.value}}</div>',
  // 捕获爷爷组件的属性，同时data.value和爷爷组件的value值绑定
  inject: ['yeye', 'data'],
  mounted () {
    // console.log(this.yeye, this.value)
  }
}

const component = {
  name: 'comp',
  components: {
    ChildComponent
  },
  // template: `
  //   <div :style="style">
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="body">
  //       <slot name="body"></slot>
  //     </div>
  //   </div>
  // `,

  // 父组件 通过 slot 的 slot-scop="props", 通过 props 拿出 value 和 aaa 的值
  template: `
    <div :style="style">
      <slot :value="value" aaa="111"></slot>
      <child-component />
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'component value'
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  // provide 提供的变量 会被 子组件、孙组件... inject
  provide () {
    const data = {}
    // 给data增加value属性，同时增加get方法，这个在子组件中，就可以用 data.value 绑定 父组件中value值得变化
    // hack 方法，不建议使用
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })

    return {
      // 直接传yeye, 子组件只能使用这个变量一次，而不会获取到之后的值改变
      yeye: this,
      data
    }
  },
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },
  mounted () {
    // ref用在组件上，就是一个组件实例； ref用在html原生标签上 就是原生标签这个节点 "<span>xxxxx</span>"
    console.log(this.$refs.comp.value, this.$refs.span)
  },
  // 作用域插槽 拿出 props.value 和 props.aaa 组件内部 定义的变量
  template: `
    <div>
      <comp-one ref="comp">
        <span slot-scope="props" ref="span">{{props.value}} {{props.aaa}} {{value}}</span>
      </comp-one>
      <input type="text" v-model="value" />
    </div>
  `
})
