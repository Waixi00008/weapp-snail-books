<template>
    <div>
      <Title :title="title" :subtitle="subtitle"/>
      <div>
        <input @keyup.enter="handleClick" type="text" v-model="inputText"/>
        <button @click="handleClick">提交</button>
        <button @click="handleClean">清空已完成的</button>
      </div>
      <ul>
        <li :key="index" @click="handleToggle(index)" :class="todo.done ? 'done':''" :style="todo.done ? 'color:red':''" v-for="(todo,index) in todos">{{todo.text}}</li>
        <!-- <li :key="index" @click="handleToggle(index)" :class="{'done':todo.done}" :style="todo.done ? 'color:red':''" v-for="(todo,index) in todos">{{todo.text}}</li> -->
      </ul>
      <p>还剩{{remain}}本书/总共有{{this.todos.length}}本书</p>
    </div>
</template>

<script>
import Title from './Title'
export default {
  data () {
    return {
      title: 'vue',
      subtitle: '前端框架',
      inputText: '',
      todos: [
        {
          text: '吃饭',
          done: false
        },
        {
          text: '睡觉',
          done: false
        },
        {
          text: '玩游戏',
          done: false
        },
        {
          text: '写代码',
          done: false
        }
      ]
    }
  },
  components: {
    Title
  },
  computed: {
    remain () {
      return this.todos.filter(v => !v.done).length
    }
  },
  methods: {
    handleClick () {
      this.todos.push({
        text: this.inputText,
        done: false
      })
      this.inputText = ''
    },
    handleToggle (index) {
      this.todos[index].done = !this.todos[index].done
    },
    handleClean () {
      this.todos = this.todos.filter(v => !v.done)
    }
  }
}
</script>

<style scoped lang="css">
  li.done {
    text-decoration: line-through
  }
</style>
