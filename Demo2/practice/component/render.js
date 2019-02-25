import Vue from 'vue'

const component = {
  props: ['props1'],
  name: 'comp',
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,

  // render方法等同于 <template>, 创建虚拟 dom 节点
  render (createElement) {
    // 子节点作为数组传递 (标签，属性，内容 / [子节点])
    return createElement('div', {
      style: this.style
      // on: {
      //   click: () => { this.$emit('click') }
      // }
    }, [
      this.$slots.header,
      this.props1
    ])
    // 有名字的solt: this.$slots.header, 没名字的slot: this.$slots.default
  },
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
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },
  mounted () {
    console.log(this.$refs.comp.value, this.$refs.span)
  },
  methods: {
    handleClick () {
      console.log('clicked')
    }
  },
  // template: `
  //   <comp-one ref="comp">
  //     <span ref="span">{{value}}</span>
  //   </comp-one>
  // `,
  render (createElement) {
    return createElement(
      'comp-one', {
        ref: 'comp',
        props: {
          props1: this.value
        },
        // 声明绑定方法，子组件渲染时，需要继续绑定一次
        // on: {
        //   click: this.handleClick
        // },
        // 直接绑定到 comp-one组件上，不用子组件再绑定一次
        nativeOn: {
          click: this.handleClick
        }
      },
      [
        createElement('span', {
          ref: 'span',
          // 声明名为 header 的 slot
          slot: 'header',
          attrs: {
            id: 'test-id'
          }
        }, this.value)
      ]
    )
  }
})
