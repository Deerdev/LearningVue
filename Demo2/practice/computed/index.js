import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{name}}</p>
      <p>Name: {{getName()}}</p>
      <p>Number: {{number}}</p>
      <p>FullName: {{fullName}}</p>
      <p><input type="text" v-model="number"></p>
      <p>FirstName: <input type="text" v-model="firstName"></p>
      <p>LastName: <input type="text" v-model="lastName"></p>
      <p>Name: <input type="text" v-model="name"></p>
      <p>Obj.a: <input type="text" v-model="obj.a"></p>
    </div>
  `,
  data: {
    firstName: 'Jokcy',
    lastName: 'Lou',
    number: 0,
    fullName: '',
    obj: {
      a: 0
    }
  },
  computed: {
    name: {
      get () {
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      },
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  watch: {
    // 监听到变化  执行操作
    obj: {
      handler () {
        console.log('obj.a changed')
        this.obj.a += 1
      },
      // 声明之后，就立即执行一次handler，不用等到监听到变化才执行
      // immediate: true
      // 如果监听 obj可以让 obj.a 的变化也可以触发handler方法（原本只是监听obj，而不是它内部的成员）【性能消耗大】
      deep: true
    },
    // 监听字符串 即可监听obj.a的变化，而不用使用deep
    'obj.a': {
      handler () {
        console.log('obj.a changed')
        this.obj.a += 1
      },
      // 声明之后，就立即执行一次handler，不用等到监听到变化才执行
      immediate: true
      // 如果监听 obj可以让 obj.a 的变化也可以触发handler方法（原本只是监听obj，而不是它内部的成员）
      // deep: true
    }
  },
  methods: {
    // 每次组件刷新都会调用，会被刷新；不像computed属性 会缓存计算结果，如果依赖的this.的成员变量不改变就不会调用computed方法
    getName () {
      console.log('getName invoked')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
