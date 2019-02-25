import Vue from 'vue'

// vue 原生的指令 v-?
new Vue({
  el: '#root',
  template: `
    <div>
      <div>Text: {{text}}</div>
      <div v-if="text === 0">Else Text: {{text}}</div>
      <div v-else>else content</div>
      <div v-html="html"></div>
      <input text="text" v-model="text">
      <input type="checkbox" v-model="active">
      <div>
        <input type="checkbox" :value="1" v-model="arr">
        <input type="checkbox" :value="2" v-model="arr">
        <input type="checkbox" :value="3" v-model="arr">
      </div>
      <div>
        <input type="radio" value="one" v-model="picked">
        <input type="radio" value="two" v-model="picked">
      </div>
      <ul>
        <li v-for="(item, index) in arr" :key="item">{{item}}:{{index}}</li>
      </ul>
      <ul>
        <li v-for="(val, key, index) in obj">{{val}}:{{key}}:{{index}}</li>
      </ul>
    </div>
  `,
  // v-model.number="xxx", 希望输入得内容是 数字， 而不是字符串
  // v-model.trim="xxx" 去除首尾空格
  // v-model.lazy="xxx" 输入框 失焦后 才会同步数据
  // <div v-pre>Text: {{text}}</div>: v-pre 不会解析标签内的表达式，而是直接渲染成字符串: "Text: {{text}}"
  // <div v-once>Text: {{text}}</div>: v-once 只渲染一次 数据绑定的内容只执行一次，text继续修改  不会同步
  data: {
    arr: [2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: '',
    text: 0,
    active: false,
    html: '<span>this is html</span>'
  }
})
