<template>
  <form class="add-to-do" @submit.prevent="addToDo" @keydown.prevent.ctrl.b="onPressCtrlB">
    <div class="add-to-do__wrapper">
      <Textarea
        v-model="toDoText"
        class="add-to-do__textarea"
        :placeholder="t('typeNewTask')"
        @input="onInput"
        @keydown.enter.exact.prevent
        @keyup.enter.exact="addToDo"
      />
      <p class="add-to-do__hint">
        <kbd>Enter</kbd> - {{ t('addTask') }}, <kbd>Shift</kbd> + <kbd>Enter</kbd> - {{ t('lineBreak') }}
      </p>
    </div>
    <Btn class="add-to-do__btn" submit>{{ t('add') }}</Btn>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref, useId } from 'vue'
import { t } from '@/i18n'
import Textarea from '@/components/form/Textarea.vue'
import Btn from '@/components/Btn.vue'
import { textareaAutoHeight, sortToDos, makeSelectedTextBold } from '@/utils'
import { useToDoStorage } from '@/composables/storage'

const storage = useToDoStorage()
const textarea = ref<HTMLTextAreaElement>()
const toDoText = ref('')

const onInput = () => {
  if (!textarea.value) return
  textareaAutoHeight(textarea.value)
}

const addToDo = () => {
  if (!textarea.value || !toDoText.value) return
  storage.value.items.push({
    id: useId(),
    createdAt: new Date(),
    text: toDoText.value,
    checked: false,
  })
  storage.value.items = sortToDos(storage.value.items)
  toDoText.value = ''
  textarea.value.style.height = ''
}

const onPressCtrlB = () => (toDoText.value = makeSelectedTextBold(toDoText.value))

onMounted(() => {
  const textareaEl = document.querySelector('.add-to-do textarea')
  if (textareaEl) {
    textarea.value = textareaEl as HTMLTextAreaElement
  }
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

  &__textarea {
    overflow-x: hidden; // fixes extra row bug in Firefox
  }

  &__hint {
    position: absolute;
    top: calc(100% + 0.3125rem);
    left: 0;
    font-size: 0.875rem;
    opacity: 0;
    transition: opacity 0.25s;
  }

  &__textarea:has(:focus:not(:placeholder-shown)) + &__hint {
    opacity: 1;
  }

  &__btn {
    min-width: 6.5rem;
  }
}
</style>
