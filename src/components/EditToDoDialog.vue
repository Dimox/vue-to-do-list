<template>
  <form class="edit-to-do-dialog" @keydown.ctrl.enter="saveToDo">
    <header class="edit-to-do-dialog__header">
      <h2 class="edit-to-do-dialog__title">Редактирование задачи</h2>
      <button class="edit-to-do-dialog__close" type="button" @click="$emit('close')">
        <Icon name="close" />
      </button>
    </header>
    <div class="edit-to-do-dialog__body">
      <Textarea v-model="text" rows="5" />
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
</script>

<style lang="scss">
.edit-to-do-dialog {
  width: min(37.5rem, 100%);

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
    padding: 0 2rem;
  }

  &__footer {
    display: flex;
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
      box-shadow: 0 0 0 0.125rem var(--color-indigo-500);
    }
  }

  &__hint {
    font-size: 1rem;
  }
}
</style>
