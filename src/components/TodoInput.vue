<template lang="">
  <div class="inputs">
    <input
      v-bind:value="todoInput"
      v-on:input="$emit('todoInput', $event.target.value)"
      :placeholder="msg"
      type="text"
      name=""
      id=""
      @keypress="$emit('whatIsKey', $event.key)"
    />
    <button type="button" @click="$emit('addATodo')">Add</button>
  </div>
</template>
<script>
export default {
  props: {
    todoInput: {
      type: String,
      required: true
    },
    msg: {
      type: String,
      required: true
    }
  },
}
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
