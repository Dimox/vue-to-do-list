<template>
  <form class="add-to-do" @submit.prevent="addToDo" @keydown.prevent.ctrl.b="onPressCtrlB">
    <div class="add-to-do__wrapper">
      <Textarea
        ref="textarea"
        v-model="toDoText"
        class="add-to-do__textarea"
        :placeholder="t('typeNewTask')"
        auto-height
        @keydown.enter.exact.prevent
        @keyup.enter.exact="addToDo"
      />
      <p class="add-to-do__hint">
        <kbd>Enter</kbd> - {{ t('addTask') }}, <kbd>Shift</kbd> + <kbd>Enter</kbd> -
        {{ t('lineBreak') }}
      </p>
    </div>
    <Btn class="add-to-do__btn" submit>{{ t('add') }}</Btn>
  </form>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import Btn from '@/components/Btn.vue'
import Textarea from '@/components/form/Textarea.vue'
import { useToDo } from '@/composables/useToDo'
import { t } from '@/i18n'
import { makeSelectedTextBold } from '@/utils'

const { addToDoItem } = useToDo()
const textarea = useTemplateRef('textarea')
const toDoText = ref('')

const addToDo = () => {
  if (!toDoText.value) return
  addToDoItem({
    id: Date.now().toString(),
    createdAt: new Date(),
    text: toDoText.value,
    checked: false,
    pinned: false,
  })
  toDoText.value = ''
  // eslint-disable-next-line
  textarea.value?.resetHeight()
}

const onPressCtrlB = () => (toDoText.value = makeSelectedTextBold(toDoText.value))
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
