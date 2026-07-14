<template>
  <div class="todo-list">
    <ul v-if="$slots.default">
      <slot />
    </ul>
  </div>
</template>
<script></script>
<style scoped>
.todo-list {
  min-height: 10rem;
}
.todo-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: grid;
  gap: 0.55rem;
}
</style>
