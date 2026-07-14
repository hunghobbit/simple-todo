<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../../stores/todos'

const todoStore = useTodoStore()
const fileInput = ref(null)
const importMessage = ref('')

const cleanTaskTitle = (title) =>
  title
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~`]/g, '')
    .trim()

const parseMarkdownTodos = (markdown) => {
  const taskPattern = /^\s*(?:[-*+]|\d+[.)])\s+\[([ xX])\]\s+(.+?)\s*$/

  return markdown.split(/\r?\n/).flatMap((line) => {
    const match = line.match(taskPattern)
    if (!match) return []

    const title = cleanTaskTitle(match[2])
    return title ? [{ title, completed: match[1].toLowerCase() === 'x' }] : []
  })
}

const openFilePicker = () => {
  importMessage.value = ''
  fileInput.value?.click()
}

const importFile = async (event) => {
  const [file] = event.target.files
  event.target.value = ''
  if (!file) return

  try {
    const todos = parseMarkdownTodos(await file.text())
    const importedCount = todoStore.importTodos(todos)
    importMessage.value = importedCount
      ? `Added ${importedCount} ${importedCount === 1 ? 'task' : 'tasks'} from ${file.name}.`
      : ''
  } catch {
    todoStore.errors.message = 'That Markdown file could not be read.'
  }
}
</script>

<template>
  <div class="importer">
    <input
      ref="fileInput"
      class="visually-hidden"
      type="file"
      accept=".md,text/markdown,text/plain"
      @change="importFile"
    />
    <button class="secondary-button" type="button" @click="openFilePicker">
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14" />
      </svg>
      Import TODO.md
    </button>
    <p v-if="importMessage" class="import-message" role="status">{{ importMessage }}</p>
  </div>
</template>
