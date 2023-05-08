<template>
  <div id="app">
    <h2>Todo List App Simple</h2>

    <TodoInput  @add-a-todo="addATodo" @what-is-key="whatIsKey" @todo-input="updateInput" :todoInput="todoInput" :msg="msg" />
    
    <Errors :errors="errors" />


    <TodoList>
        <TodoItem @isCompleted="completedStatusUpdate" @delete-todo="deleteTodo" v-for="todo in todos" :key="todo.id" :todo="todo"/>
    </TodoList>



    <footer id="footer">
      <h5>About</h5>
      <div>@Author: Le Quoc Hung</div>
      <div>#Description: This is a simple todo list app for deployment to Netlify as a demo.</div>
    </footer>
  </div>
</template>
<script>
import TodoInput from './components/TodoInput.vue'
import Errors from './components/Errors.vue'
import TodoList from './components/TodoList.vue'
import TodoItem from './components/TodoItem.vue'
export default {
  components: {
    TodoInput,
    Errors,
    TodoList,
    TodoItem
  },
  data() {
    return {
      msg: 'Type a todo',
      todoInput: '',
      todos: [],
      errors: {
        todoInput: '',
        message: ''
      }
    }
  },
  methods: {
    completedStatusUpdate(data){
      // update status
      console.log('event completedStatusUpdate');
      console.log(data);
      this.todos.map((todo) => {
        if(todo.id === data.id){
          todo.completed = data.completed
          console.log(this.todos);
        }
      })
    },
    addATodo() {
      if(this.errors.todoInput !== '') this.errors.todoInput = '' 

      if (this.todoInput === '') {
        this.errors.todoInput = 'Please type a todo'
        return
      }
      let todo = {
        id: this.todos.length + 1,
        title: this.todoInput,
        completed: false
      }
      this.todos.push(todo)
      this.todoInput = ''
    },
    deleteTodo(id) {
      // find todo with id
      let todo = this.todos.find((todo) => todo.id === id)
      if (!todo) {
        this.errors.message = 'Todo not found'
        return
      }
      todo.completed = false
      todo = null
      // remove todo with id
      this.todos.forEach((todo, index) => {
        if (todo.id === id) {
          this.todos.splice(index, 1)
        }
      })
      console.log(this.todos);
    },
    updateInput(value) {
      this.todoInput = value
    },
    whatIsKey(key) {
      if (key === 'Enter') {
        this.addATodo()
      }
    }
  }
}
</script>
<style>
h2{
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
footer#footer{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
}
</style>
