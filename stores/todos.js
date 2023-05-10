import { defineStore } from "pinia";

export const useTodoStore = defineStore({
    id: "todo",
    state: () => ({
        todos: [],
        todoInput: '',
        errors: {
            todoInput: '',
            message: '',
        },
    }),
    getters: {
        getTodos() {
            return this.todos;
        },
    },
    actions: {
        addATodo() {
            if (this.errors.todoInput !== '') this.errors.todoInput = ''

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
        },
        completedStatusUpdate(data) {
            // find todo with id
            let todo = this.todos.find((todo) => todo.id === data.id)
            if (!todo) {
                this.errors.message = 'Todo not found'
                return
            }
            todo.completed = data.completed
        },
        updateInput(value){
            this.todoInput = value
        }
    },
});



// Path: stores\errors.js

