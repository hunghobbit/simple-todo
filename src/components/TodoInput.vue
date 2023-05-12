<template>
  <form
    @submit.prevent="
      useTodoStore().addATodo(todoInput);
      todoInput = '';
      useTodoStore().saveTodos();
    "
    class="inputs"
    method="post"
  >
    <input
      v-model="todoInput"
      :placeholder="msg"
      type="text"
      name="todo-input"
      id="todo-input"
      accessKey="Enter"
    />
    <button type="submit" accessKey="Enter">Add</button>
  </form>
</template>
<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../../stores/todos'
defineProps({
  msg: String
})
console.log(document.forms)
const todoInput = ref('')
</script>
<style>
.inputs {
  display: flex;
  justify-content: center;
  align-items: center;
}
.inputs input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}
.inputs button {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #ccc;
  cursor: pointer;
}
</style>
