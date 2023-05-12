<template>
  <li>
    <label :class="{ completed: props.todo.completed }" :for="'is-completed-' + props.todo.id">{{
      props.todo.title
    }}</label>
    <div class="hidden" aria-hidden="true">
      <span v-if="props.todo.completed">
        {{ dayjs(props.todo.completedAt, 'DD/MM/YYYY HH:mm:ss').fromNow() }}
      </span>
      <button
        class="button-danger"
        @click="
          useTodoStore().deleteTodo(props.todo.id);
          useTodoStore().saveTodos();
        "
        v-show="props.todo.completed"
        type="button"
      >
        Deleted
      </button>
      <input
        @change="completedStatusUpdate({ id: props.todo.id, completed: $event.target.checked })"
        type="checkbox"
        :name="'is-completed-' + props.todo.id"
        :id="'is-completed-' + props.todo.id"
        :checked="props.todo.completed"
      />
    </div>
  </li>
</template>
<script setup>
import { useTodoStore } from '../../stores/todos'
import dayjs from 'dayjs'
import  relativeTime  from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)

const props = defineProps({
  todo: Object
})

const completedStatusUpdate = (data) => {
  // find todo with id
  let todo = useTodoStore().todos.find((todo) => todo.id === data.id)
  if (!todo) {
    useTodoStore().errors.message = 'Todo not found'
    return
  }
  todo.completed = data.completed
  if (!todo.completed) {
    todo.completedAt = null
    useTodoStore().todos = [...useTodoStore().todos.filter((todo) => todo.id !== data.id), todo]
    useTodoStore().saveTodos()
    return
  }
  todo.completedAt = dayjs(new Date()).format('DD/MM/YYYY HH:mm:ss')
  //   replace the new todo
  useTodoStore().todos = [...useTodoStore().todos.filter((todo) => todo.id !== data.id), todo]
  useTodoStore().saveTodos()
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
.todo-list ul li .hidden {
  visibility: hidden;
}
.todo-list ul li:hover {
  cursor: pointer;
  background-color: #e8d3f0;
}
.todo-list ul li:hover .hidden {
  visibility: visible;
}
.todo-list ul li:hover .hidden span {
  margin: 0 10px 0 0;
  font-size: smaller;
  font-style: italic;
  opacity: 0.5;
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
