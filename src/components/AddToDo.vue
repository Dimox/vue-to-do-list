<template>
  <form class="add-to-do" @submit.prevent="addToDo">
    <div class="add-to-do__wrapper">
      <Textarea
        class="add-to-do__textarea"
        placeholder="Введите новую задачу..."
        @input="onInput"
        @keydown.enter.exact.prevent
        @keyup.enter.exact="addToDo"
        v-model="toDo"
      />
      <p class="add-to-do__hint">
        <strong>Enter</strong> - добавить задачу, <strong>Shift + Enter</strong> - перенос строки
      </p>
    </div>
    <Btn class="add-to-do__btn" type="submit">Добавить</Btn>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Textarea from '@/components/form/Textarea.vue'
import Btn from '@/components/Btn.vue'
import { textareaAutoHeight, uniqueId } from '@/utils'
import { useToDoStorage } from '@/composables/storage'

const storage = useToDoStorage()
const textarea = ref<HTMLTextAreaElement>()
const toDo = ref()

const onInput = () => {
  if (!textarea.value) return
  textareaAutoHeight(textarea.value)
}

const addToDo = () => {
  if (!textarea.value) return
  if (toDo.value) {
    storage.value.items.push({
      id: uniqueId(),
      date: new Date(),
      text: toDo.value,
      checked: false,
    })
    toDo.value = ''
    textarea.value.style.height = ''
  }
}

onMounted(() => {
  textarea.value = document.querySelector('.add-to-do textarea') as HTMLTextAreaElement
})
</script>

<style lang="scss">
.add-to-do {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: start;

  &__wrapper {
    position: relative;
  }

  &__hint {
    position: absolute;
    top: calc(100% + 0.0625rem);
    width: 100%;
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
    background: var(--color-gray-100);
    border-radius: 0.25rem;
    opacity: 0;
    transition: opacity 0.25s;
  }

  &__textarea:has(:focus) + &__hint {
    opacity: 1;
  }
}
</style>
