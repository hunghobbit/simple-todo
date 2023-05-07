<template lang="">
  <div class="errors">
    <p v-if="errors.todoInput" style="color: red">{{ errors.todoInput }}</p>
    <p v-if="errors.message" style="color: red">{{ errors.message }}</p>
  </div>
</template>
<script>
export default {
  props: {
    errors: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
.errors {
  margin: 0 auto;
  margin-top: 20px;
  width: 50%;
}
</style>
