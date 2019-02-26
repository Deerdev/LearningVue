<template>
  <div id="app">
    <div id="cover" />
    <Header />
    <!-- <Todo /> -->
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.vue'
// import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    Footer
    // Todo
  }
}
</script>

<style lang="less" scoped>
// 指定使用的是less

#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
// 模糊效果
#cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;
  opacity: 0.6;
  z-index: -1;
}
</style>
