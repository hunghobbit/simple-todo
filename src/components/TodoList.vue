<template>
  <div class="todo-list">
    <ul>
      <slot />
    </ul>
  </div>
</template>
<script></script>
<style>
.todo-list {
  margin: 0 auto;
  margin-top: 20px;
  width: 50%;
  height: 55vh;
  overflow-y: auto;
}
.todo-list ul {
  list-style: none;
  padding: 0;
  width: 100%;
}
</style>
