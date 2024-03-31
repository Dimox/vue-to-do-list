<template>
  <form class="edit-to-do-dialog" @keydown="handleKeydown">
    <header class="edit-to-do-dialog__header">
      <h2 class="edit-to-do-dialog__title">Редактирование задачи</h2>
      <button class="edit-to-do-dialog__close" type="button" @click="$emit('close')">
        <Icon name="close" />
      </button>
    </header>
    <div class="edit-to-do-dialog__body">
      <Textarea v-model="text" rows="1" />
    </div>
    <footer class="edit-to-do-dialog__footer">
      <Btn @click="saveToDo">Сохранить</Btn>
      <p class="edit-to-do-dialog__hint">Нажмите <kbd>Ctrl</kbd> + <kbd>Enter</kbd> для сохранения</p>
    </footer>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Textarea from './form/Textarea.vue'
import Btn from './Btn.vue'
import Icon from './Icon.vue'
import { useToDoStorage } from '@/composables/storage'
import { makeSelectedTextBold } from '@/utils'

const emit = defineEmits(['close'])

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const storage = useToDoStorage()
const id = props.data.id
const toDoItem = storage.value.items.find(item => item.id === id)
const text = ref(toDoItem?.text ?? '')

const saveToDo = async () => {
  await Promise.all(
    storage.value.items.map(item => {
      if (item.id === id) {
        item.text = text.value
      }
      return item
    })
  )
  emit('close')
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.code === 'Enter') {
    saveToDo()
  }
  if (event.ctrlKey && event.code === 'KeyB') {
    event.preventDefault()
    text.value = makeSelectedTextBold(text.value)
  }
}
</script>

<style lang="scss">
.edit-to-do-dialog {
  display: flex;
  flex-direction: column;
  width: min(37.5rem, 100%);
  height: min(26.0625rem, 100%);

  &__header {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
  }

  &__title {
    font-size: 1.5rem;
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 0 2rem;

    .textarea {
      display: flex;
      flex: 1;
      flex-direction: column;

      &__input {
        flex: 1;
      }
    }
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem 2rem;
  }

  &__close {
    margin-right: -0.625rem;
    padding: 0.375rem;
    border-radius: 0.375rem;
    transition: 0.25s;
    transition-property: background, box-shadow;

    &:hover {
      background: var(--color-gray-100);
    }

    &:focus-visible {
      background: var(--color-gray-100);
      outline: none;
      box-shadow: 0 0 0 0.25rem var(--color-gray-300);
    }
  }

  &__hint {
    font-size: 1rem;
  }
}
</style>
