<template>
  <div class="helper">
    <span class="left">
      {{ unFinishedTodoLength }} items left
    </span>
    <span class="tabs">
      <span
        v-for="state in states"
        :key="state"
        :class="[state, filter === state ? 'actived' : '']"
        @click="toggleFilter(state)"
      >
        {{ state }}
      </span>
    </span>
    <span
      class="clear"
      @click="clearAllCompleted"
    >
      Clear Completed
    </span>
  </div>
</template>
<script>
export default {
  // 限制传入参数类型
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      states: ['all', 'active', 'completed']
    }
  },
  computed: {
    unFinishedTodoLength () {
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  methods: {
    clearAllCompleted () {
      this.$emit('clearAllcompleted')
    },
    toggleFilter (state) {
      this.$emit('toggle', state)
    }
  }
}
</script>

<style lang="less" scoped>
.helper {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-weight: 100;
  font-size: 14px;
  line-height: 30px;
  background-color: #ffffff;
}
.left,
.clear,
.tabs {
  padding: 0 10px;
}
.left .clear {
  width: 150px;
}
.left {
  text-align: center;
}
.clear {
  text-align: right;
  cursor: pointer;
}
.tabs {
  display: flex;
  width: 200px;
  justify-content: space-between;
  span {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    border: 1px solid rgba(175, 47, 47, 0);
    &.actived {
      border-color: rgba(175, 47, 47, 0.4);
      border-radius: 5px;
    }
  }
}
</style>
