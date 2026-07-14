<template>
  <li :class="{ 'is-complete': props.todo.completed }">
    <label class="todo-check" :for="'is-completed-' + props.todo.id">
      <input
        type="checkbox"
        :name="'is-completed-' + props.todo.id"
        :id="'is-completed-' + props.todo.id"
        :checked="props.todo.completed"
        @change="todoStore.updateTodoStatus(props.todo.id, $event.target.checked)"
      />
      <span class="checkmark" aria-hidden="true">
        <svg viewBox="0 0 16 16"><path d="m3 8 3 3 7-7" /></svg>
      </span>
      <span class="todo-title">{{ props.todo.title }}</span>
    </label>
    <div class="todo-actions">
      <span v-if="props.todo.completedAt" class="completed-time">
        {{ dayjs(props.todo.completedAt).fromNow() }}
      </span>
      <button
        class="icon-button"
        type="button"
        :aria-label="`Delete ${props.todo.title}`"
        @click="todoStore.deleteTodo(props.todo.id)"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5m4-5v5" />
        </svg>
      </button>
    </div>
  </li>
</template>
<script setup>
import { useTodoStore } from '../../stores/todos'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const props = defineProps({
  todo: Object
})
const todoStore = useTodoStore()
</script>
<style scoped>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 0.95rem;
  border: 1px solid var(--line);
  border-radius: 0.9rem;
  background: var(--paper);
  box-shadow: 0 1px 0 rgba(48, 40, 32, 0.04);
  transition: transform 160ms ease, border-color 160ms ease, opacity 160ms ease;
}

li:hover {
  transform: translateY(-1px);
  border-color: var(--line-strong);
}

li.is-complete {
  opacity: 0.65;
}

.todo-check {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.todo-check input {
  position: absolute;
  opacity: 0;
}

.checkmark {
  width: 1.15rem;
  height: 1.15rem;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border: 1.5px solid var(--line-strong);
  border-radius: 0.35rem;
  color: white;
  transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
}

.checkmark svg {
  width: 0.8rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
  opacity: 0;
}

.todo-check input:checked + .checkmark {
  background: var(--accent);
  border-color: var(--accent);
  transform: rotate(-3deg);
}

.todo-check input:checked + .checkmark svg {
  opacity: 1;
}

.todo-check input:focus-visible + .checkmark {
  outline: 3px solid var(--accent-soft);
  outline-offset: 2px;
}

.todo-title {
  overflow-wrap: anywhere;
}

.is-complete .todo-title {
  text-decoration: line-through;
  text-decoration-thickness: 1px;
}

.todo-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.completed-time {
  color: var(--muted);
  font-size: 0.75rem;
  white-space: nowrap;
}

.icon-button {
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 0.55rem;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}

.icon-button:hover,
.icon-button:focus-visible {
  background: var(--danger-soft);
  color: var(--danger);
}

.icon-button svg {
  width: 1.1rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.7;
}

@media (max-width: 520px) {
  .completed-time {
    display: none;
  }
}
</style>
