<template>
  <form class="inputs" @submit.prevent="addTodo">
    <label class="visually-hidden" for="todo-input">New todo</label>
    <input
      v-model="todoInput"
      :placeholder="msg"
      type="text"
      name="todo-input"
      id="todo-input"
      autocomplete="off"
    />
    <button class="primary-button" type="submit">Add task</button>
  </form>
</template>
<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../../stores/todos'
defineProps({
  msg: String
})

const todoStore = useTodoStore()
const todoInput = ref('')

const addTodo = () => {
  if (todoStore.addATodo(todoInput.value)) todoInput.value = ''
}
</script>
<style scoped>
.inputs {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.65rem;
}
.inputs input {
  min-width: 0;
  padding: 0.9rem 1rem;
  border: 1px solid var(--line);
  border-radius: 0.85rem;
  background: var(--paper);
  color: var(--ink);
  font: inherit;
  outline: none;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.inputs input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

@media (max-width: 520px) {
  .inputs {
    grid-template-columns: 1fr;
  }
}
</style>
