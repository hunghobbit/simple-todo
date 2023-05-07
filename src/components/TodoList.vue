<template>
  <div class="todo-list">
    <ul>
      <slot />
    </ul>
  </div>
</template>
<script>
export default {}
</script>
<style>
.todo-list {
  margin: 0 auto;
  margin-top: 20px;
  width: 50%;
}
.todo-list ul {
  list-style: none;
  padding: 0;
  width: 100%;
}
</style>
