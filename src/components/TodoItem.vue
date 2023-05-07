<template>
  <li>
    <label :class="{ completed: todo.completed }" for="">{{ todo.title }}</label>
    <div>
      <button
        class="button-danger"
        @click="$emit('deleteTodo', todo.id)"
        v-show="todo.completed"
        type="button"
      >
        Deleted
      </button>
      <input @click="todo.completed = !todo.completed" type="checkbox" name="isCompleted" />
    </div>
  </li>
</template>
<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
.todo-list ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.todo-list ul li label {
  cursor: pointer;
}
.todo-list ul li label.completed {
  text-decoration: line-through;
  font-style: italic;
  opacity: 0.5;
}
.todo-list ul li input {
  cursor: pointer;
}
</style>
