// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

new Vue({
  el: '#app',
  data: {
    title: 'vue',
    subtitle: '前端框架',
    inputText: '',
    todos: [{
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
      },
    ],
  },
  computed:{
    remain() {
      return this.todos.filter(v => !v.done).length
    }
  },
  methods: {
    handleClick() {
      this.todos.push({
        text: this.inputText,
        done: false
      })
      this.inputText = ''
    },
    handleToggle(index) {
      this.todos[index].done= !this.todos[index].done
    },
    handleClean() {
      this.todos = this.todos.filter(v=>!v.done)
    }
  }
})
