<script setup>
import TodoInput from './components/TodoInput.vue'
import Errors from './components/Errors.vue'
import TodoList from './components/TodoList.vue'
import TodoItem from './components/TodoItem.vue'
import { useTodoStore } from '../stores/todos.js'
import { computed, ref } from 'vue'

const msg = ref('What do you want to do?')
// stores
const todoStore = useTodoStore()
todoStore.loadTodos()

const todos = computed(() => todoStore.todos)
const errors = computed(() => todoStore.errors)
console.log(todoStore)
console.log(todos)
console.log(errors)
</script>
<template>
  <div id="app">
    <h2>Todo List App Simple</h2>

    <TodoInput :msg="msg" />

    <Errors v-if="errors.message || errors.todoInput" />
    <TodoList>
      <TodoItem v-for="todo in useTodoStore().todos" :key="todo.id" :todo="todo" />
    </TodoList>
    <footer id="footer">
      <h5>About</h5>
      <div>@Author: Le Quoc Hung</div>
      <div>#Description: This is a simple todo list app for deployment to Netlify as a demo.</div>
    </footer>
  </div>
</template>
<style>
h2 {
  text-align: center;
}
.button-danger {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: red;
  cursor: pointer;
  color: white;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  position: relative;
  height: calc(100vh - 75px);
}
/* absolute footer */
footer#footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
}
</style>
