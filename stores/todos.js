import { defineStore } from "pinia";

export const useTodoStore = defineStore({
    id: "todo",
    state: () => ({
        todos: [],
        errors: {
            todoInput: '',
            message: '',
        },
    }),
    getters: {
        getTodos() {
            return this.todos;
        },
        getErrors() {
            return this.errors
        }
    },
    actions: {
        loadTodos() {
            let todos = localStorage.getItem('todos');
            if (todos) {
                this.todos = JSON.parse(todos);
            }
        },
        saveTodos() {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        addATodo(todoInput) {
            // clear errors
            if(this.errors === {} | null | undefined) this.errors = {todoInput: '', message: ''}
            if(this.errors.message !== '') this.errors.message = '' 
            if(this.errors.todoInput !== '') this.errors.todoInput = ''

            if (todoInput === '') {
                this.errors.todoInput = 'Please type a todo'
                return
            }
            let todo = {
                id: this.todos.length + 1,
                title: todoInput,
                completed: false,
                completedAt: null,
            }
            this.todos.push(todo)
            
            return ""
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
            this.todos = this.todos.filter((todo) => todo.id !== id)
        },
        
    },
});



// Path: stores\errors.js

