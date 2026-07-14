<script setup>
import { computed } from 'vue'
import { useTodoStore } from '../../stores/todos'

const todoStore = useTodoStore()
const message = computed(() => todoStore.errors.todoInput || todoStore.errors.message)
</script>

<template>
  <div class="errors" role="alert">
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M12 8v5m0 3.5v.5M10.3 4.7 3.4 17a2 2 0 0 0 1.8 3h13.6a2 2 0 0 0 1.8-3L13.7 4.7a2 2 0 0 0-3.4 0Z"
      />
    </svg>
    <p>{{ message }}</p>
    <button type="button" aria-label="Dismiss error" @click="todoStore.clearErrors">×</button>
  </div>
</template>

<style scoped>
.errors {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.65rem;
  margin-top: 0.85rem;
  padding: 0.75rem 0.85rem;
  border: 1px solid color-mix(in srgb, var(--danger) 30%, transparent);
  border-radius: 0.75rem;
  background: var(--danger-soft);
  color: var(--danger);
}

.errors svg {
  width: 1.1rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.7;
}

.errors p {
  margin: 0;
  font-size: 0.9rem;
}

.errors button {
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 1.25rem;
  cursor: pointer;
}
</style>
