<template>
  <form class="edit-to-do-dialog" @keydown="handleKeydown">
    <header class="edit-to-do-dialog__header">
      <h2 class="edit-to-do-dialog__title">{{ t('editTask') }}</h2>
      <Btn class="edit-to-do-dialog__close" type="icon" @click="$emit('close')">
        <Icon name="close" />
      </Btn>
    </header>
    <div class="edit-to-do-dialog__body">
      <Textarea v-model="text" rows="1" />
    </div>
    <footer class="edit-to-do-dialog__footer">
      <Btn class="edit-to-do-dialog__save" @click="saveToDo">{{ t('save') }}</Btn>
      <p class="edit-to-do-dialog__hint" v-html="tHtml('pressCtrlEnterToSave')" />
    </footer>
  </form>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import Btn from './Btn.vue'
import Textarea from './form/Textarea.vue'
import Icon from './Icon.vue'
import { useToDo } from '@/composables/useToDo'
import { t, tHtml } from '@/i18n'
import { makeSelectedTextBold } from '@/utils'

const emit = defineEmits(['close'])

const { data } = defineProps<{
  data: {
    id: string
  }
}>()

const { getToDoItem, updateToDoItem } = useToDo()
const id = data.id
const toDoItem = getToDoItem(id)
const text = ref(toDoItem?.text ?? '')

const saveToDo = async () => {
  if (!toDoItem) return
  toDoItem.text = text.value
  updateToDoItem(id, toDoItem)
  await nextTick()
  emit('close')
}

const handleKeydown = async (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'Enter') {
    await saveToDo()
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

  &__save {
    min-width: 6.5rem;
  }

  &__close {
    color: var(--color-text-primary);

    &:hover {
      &::before {
        opacity: 1;
      }
    }
  }

  &__hint {
    font-size: 1rem;
  }
}
</style>
