<template>
  <div class="errors">
    <span><h4 style="color: red">ERROR:</h4></span>
    <p v-if="(errors.todoInput !== null) | ''" style="color: red">{{ errors.todoInput }}</p>
    <p v-if="errors.message" style="color: red">{{ errors.message }}</p>
    <div v-if="isAutoHidden" class="progress-bar"></div>
  </div>
</template>
<script setup>
import { onMounted, computed, onUnmounted, onUpdated } from 'vue'
import { useTodoStore } from '../../stores/todos'
const errors = computed(() => useTodoStore().errors)

onMounted(() => {
  setTimeout(() => {
    document.querySelector('.errors').style.display = 'none'
  }, 5000)
  // clear errors
})
onUnmounted(() => {
  console.log('Errors element is unmounted!')
})
onBeforeUpdate(() => {
  console.log('Errors element is about to update!')
}),
  onUpdated(() => {
    console.log('Errors element is updated!')
  }),
  onBeforeUnmount(() => {
    console.log('Errors element is about to be unmounted!')
  })
</script>
<style>
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes borderProgress {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.errors {
  background-color: #f8d7da;
  border-left: 2px solid #f3061d;
  padding: 10px;
  margin: 0 auto;
  margin-top: 20px;
  width: 50%;
  /* multi animation */
  animation: fadeIn 1s ease-in-out forwards;
  position: relative;
  display: flex;
}
.errors p {
  margin: 0;
  padding: 1.25rem 0.5rem;
  margin-left: 10px;
}
.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0px;
  height: 2px;
  background-color: red;
  animation: borderProgress 5s linear;
}

.close-button {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #ccc;
  cursor: pointer;
  margin-left: 10px;
  position: absolute;
  right: 0;
}
</style>
