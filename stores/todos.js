import { defineStore } from 'pinia'

const emptyErrors = () => ({
  todoInput: '',
  message: ''
})

const nextTodoId = (todos) => Math.max(0, ...todos.map((todo) => Number(todo.id) || 0)) + 1

export const useTodoStore = defineStore({
  id: 'todo',
  state: () => ({
    todos: [],
    errors: emptyErrors()
  }),
  getters: {
    getTodos() {
      return this.todos
    },
    getErrors() {
      return this.errors
    }
  },
  actions: {
    loadTodos() {
      const savedTodos = localStorage.getItem('todos')

      if (!savedTodos) return

      try {
        this.todos = JSON.parse(savedTodos)
      } catch {
        this.errors.message = 'Saved todos could not be loaded.'
      }
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    clearErrors() {
      this.errors = emptyErrors()
    },
    addATodo(todoInput) {
      this.clearErrors()
      const title = todoInput.trim()

      if (!title) {
        this.errors.todoInput = 'Please type a todo.'
        return false
      }

      this.todos.push({
        id: nextTodoId(this.todos),
        title,
        completed: false,
        completedAt: null
      })
      this.saveTodos()
      return true
    },
    importTodos(importedTodos) {
      this.clearErrors()

      if (!importedTodos.length) {
        this.errors.message = 'No Markdown checklist items were found in that file.'
        return 0
      }

      let id = nextTodoId(this.todos)
      const todos = importedTodos.map((todo) => ({
        id: id++,
        title: todo.title,
        completed: todo.completed,
        completedAt: null
      }))

      this.todos.push(...todos)
      this.saveTodos()
      return todos.length
    },
    updateTodoStatus(id, completed) {
      const todo = this.todos.find((item) => item.id === id)

      if (!todo) {
        this.errors.message = 'Todo not found.'
        return
      }

      todo.completed = completed
      todo.completedAt = completed ? new Date().toISOString() : null
      this.saveTodos()
    },
    deleteTodo(id) {
      const todo = this.todos.find((item) => item.id === id)

      if (!todo) {
        this.errors.message = 'Todo not found.'
        return
      }

      this.todos = this.todos.filter((item) => item.id !== id)
      this.saveTodos()
    }
  }
})
