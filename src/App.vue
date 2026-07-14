<script setup>
import { computed, ref } from 'vue'
import TodoInput from './components/TodoInput.vue'
import TodoImporter from './components/TodoImporter.vue'
import ErrorNotice from './components/ErrorNotice.vue'
import TodoList from './components/TodoList.vue'
import TodoItem from './components/TodoItem.vue'
import { useTodoStore } from '../stores/todos.js'

const todoStore = useTodoStore()
todoStore.loadTodos()

const isPopupMode = new URLSearchParams(window.location.search).get('display') === 'popup'
const popupMessage = ref('')
const todos = computed(() => todoStore.todos)
const errors = computed(() => todoStore.errors)
const openCount = computed(() => todos.value.filter((todo) => !todo.completed).length)
const completedCount = computed(() => todos.value.length - openCount.value)

const openPopup = () => {
  const popupUrl = new URL(window.location.href)
  popupUrl.searchParams.set('display', 'popup')

  const width = Math.min(760, window.screen.availWidth)
  const height = Math.min(900, window.screen.availHeight)
  const left = Math.max(0, Math.round((window.screen.availWidth - width) / 2))
  const top = Math.max(0, Math.round((window.screen.availHeight - height) / 2))
  const popup = window.open(
    popupUrl,
    'simple-todo-popup',
    `popup=yes,width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  )

  if (popup) {
    popup.focus()
    popupMessage.value = ''
  } else {
    popupMessage.value = 'Allow popups for this site to use window mode.'
  }
}

const closePopup = () => window.close()
</script>

<template>
  <main class="app-shell" :class="{ 'popup-mode': isPopupMode }">
    <section class="workspace" aria-labelledby="page-title">
      <header class="app-header">
        <div>
          <p class="eyebrow">Daily field notes</p>
          <h1 id="page-title">Things to do</h1>
        </div>
        <button v-if="!isPopupMode" class="window-button" type="button" @click="openPopup">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M8 8h11v11H8zM5 15V5h10" />
          </svg>
          Open window
        </button>
        <button v-else class="window-button" type="button" @click="closePopup">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="m7 7 10 10M17 7 7 17" />
          </svg>
          Close window
        </button>
      </header>

      <p v-if="popupMessage" class="popup-message" role="status">{{ popupMessage }}</p>

      <div class="entry-panel">
        <TodoInput msg="Write down the next thing…" />
        <div class="entry-footer">
          <TodoImporter />
          <p>Reads <code>- [ ]</code> and <code>- [x]</code> checklist lines.</p>
        </div>
        <ErrorNotice v-if="errors.message || errors.todoInput" />
      </div>

      <section class="list-section" aria-labelledby="list-title">
        <div class="list-heading">
          <h2 id="list-title">Your list</h2>
          <p>{{ openCount }} open · {{ completedCount }} done</p>
        </div>

        <TodoList v-if="todos.length">
          <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
        </TodoList>

        <div v-else class="empty-state">
          <span class="empty-mark" aria-hidden="true"></span>
          <h3>A clear page.</h3>
          <p>Add one task above or import a Markdown checklist to begin.</p>
        </div>
      </section>
    </section>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Newsreader:opsz,wght@6..72,500;6..72,650&display=swap');

:root {
  color-scheme: light;
  --canvas: #ede9df;
  --paper: #fffdf8;
  --ink: #302820;
  --muted: #7c7164;
  --line: #ded7cb;
  --line-strong: #bcb1a2;
  --accent: #3d6658;
  --accent-dark: #29483e;
  --accent-soft: #dce9e2;
  --danger: #984c43;
  --danger-soft: #f6e5e1;
  font-family: 'DM Mono', monospace;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

html,
body,
#app {
  min-height: 100%;
  margin: 0;
}

body {
  min-width: 320px;
  background: linear-gradient(rgba(61, 102, 88, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(61, 102, 88, 0.035) 1px, transparent 1px), var(--canvas);
  background-size: 24px 24px;
  color: var(--ink);
}

button,
input {
  font: inherit;
}

button:focus-visible {
  outline: 3px solid var(--accent-soft);
  outline-offset: 2px;
}

.app-shell {
  min-height: 100vh;
  padding: clamp(1rem, 4vw, 3.5rem);
  display: grid;
  place-items: start center;
}

.workspace {
  width: min(100%, 760px);
  position: relative;
  padding: clamp(1.25rem, 5vw, 3.5rem);
  border: 1px solid var(--line-strong);
  background: var(--paper);
  box-shadow: 12px 14px 0 rgba(73, 61, 48, 0.1);
}

.workspace::before {
  content: '';
  position: absolute;
  inset: 0.45rem;
  border: 1px solid rgba(188, 177, 162, 0.45);
  pointer-events: none;
}

.app-header,
.entry-panel,
.list-section,
.popup-message {
  position: relative;
  z-index: 1;
}

.app-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--line);
}

.eyebrow {
  margin: 0 0 0.4rem;
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1,
h2,
h3 {
  font-family: 'Newsreader', serif;
}

h1 {
  margin-bottom: 0;
  font-size: clamp(2.8rem, 10vw, 5rem);
  font-weight: 500;
  letter-spacing: -0.055em;
  line-height: 0.87;
}

.window-button,
.secondary-button,
.primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
}

.window-button:hover,
.secondary-button:hover,
.primary-button:hover {
  transform: translateY(-1px);
}

.window-button {
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--ink);
  font-size: 0.72rem;
  white-space: nowrap;
}

.window-button:hover {
  border-color: var(--line-strong);
  background: #f6f1e8;
}

.window-button svg,
.secondary-button svg {
  width: 1rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.7;
}

.entry-panel {
  padding: 1.5rem 0 1.75rem;
  border-bottom: 1px solid var(--line);
}

.primary-button {
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: white;
}

.primary-button:hover {
  background: var(--accent-dark);
  border-color: var(--accent-dark);
}

.entry-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.85rem;
}

.entry-footer > p {
  margin: 0;
  color: var(--muted);
  font-size: 0.67rem;
  text-align: right;
}

.entry-footer code {
  color: var(--accent-dark);
}

.importer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.secondary-button {
  padding: 0.55rem 0.65rem;
  border: 1px dashed var(--line-strong);
  background: transparent;
  color: var(--accent-dark);
  font-size: 0.72rem;
}

.secondary-button:hover {
  border-style: solid;
  background: var(--accent-soft);
}

.import-message,
.popup-message {
  margin: 0;
  color: var(--accent);
  font-size: 0.72rem;
}

.popup-message {
  padding: 0.75rem;
  background: var(--danger-soft);
  color: var(--danger);
}

.list-section {
  padding-top: 1.75rem;
}

.list-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.list-heading h2 {
  margin-bottom: 0;
  font-size: 1.65rem;
  font-weight: 650;
}

.list-heading p {
  margin: 0;
  color: var(--muted);
  font-size: 0.72rem;
}

.empty-state {
  padding: 3.5rem 1rem 2.5rem;
  text-align: center;
}

.empty-mark {
  width: 2.5rem;
  height: 2.5rem;
  display: inline-block;
  margin-bottom: 1rem;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  box-shadow: inset 0 0 0 0.45rem var(--paper), inset 0 0 0 0.55rem var(--line);
}

.empty-state h3 {
  margin-bottom: 0.35rem;
  font-size: 1.5rem;
}

.empty-state p {
  max-width: 25rem;
  margin: 0 auto;
  color: var(--muted);
  font-size: 0.78rem;
  line-height: 1.6;
}

.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

.popup-mode {
  padding: 0;
  place-items: stretch;
}

.popup-mode .workspace {
  width: 100%;
  min-height: 100vh;
  border: 0;
  box-shadow: none;
}

@media (max-width: 620px) {
  .app-shell {
    padding: 0;
  }

  .workspace {
    min-height: 100vh;
    border: 0;
    box-shadow: none;
  }

  .app-header,
  .entry-footer {
    align-items: flex-start;
  }

  .entry-footer {
    flex-direction: column;
  }

  .entry-footer > p {
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
