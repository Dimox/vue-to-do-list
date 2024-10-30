<template>
  <div class="textarea">
    <label class="textarea__label" :class="{ 'visually-hidden': !hasLabel }" :for="id">{{ label }}</label>
    <textarea
      :id="id"
      ref="textarea"
      v-model="model"
      class="textarea__input"
      :rows="rows"
      :placeholder="placeholder"
      v-bind="{ ...$attrs, class: undefined }"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, useId, useTemplateRef } from 'vue'

const {
  label: labelValue,
  placeholder,
  rows = 1,
  autoHeight,
} = defineProps<{
  label?: string
  placeholder?: string
  rows?: number | string
  autoHeight?: boolean
}>()

const model = defineModel<string>()
const id = useId()
const textarea = useTemplateRef<HTMLTextAreaElement>('textarea')
const hasLabel = computed(() => !!labelValue)
const label = computed(() => (labelValue ? labelValue : placeholder))

const onInput = () => {
  if (!textarea.value || !autoHeight) return
  const el = textarea.value
  const style = window.getComputedStyle(el)
  el.style.height = 'auto'
  el.style.height = String(el.scrollHeight + parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth)) + 'px'
}

const resetHeight = () => textarea.value && (textarea.value.style.height = '')

defineExpose({ resetHeight })
</script>

<style lang="scss">
.textarea {
  &__label {
    display: block;
    width: fit-content;
    margin-bottom: 0.25rem;
    font-weight: 500;
    cursor: pointer;
  }

  &__input {
    --scrollbar-thumb-color: var(--color-accent-400);
    display: block;
    width: 100%;
    padding: 0.6875rem 1.25rem;
    overscroll-behavior: contain;
    font: inherit;
    color: inherit;
    resize: none;
    background: none;
    border: 0.0625rem solid var(--color-border-tertiary);
    border-radius: 0.375rem;
    transition: 0.25s;
    transition-property: border-color, box-shadow, border-radius, scrollbar-color;
    scrollbar-color: var(--scrollbar-thumb-color) transparent;

    &::placeholder {
      color: var(--color-text-tertiary);
      opacity: 1;
    }

    &:hover {
      border-color: var(--color-border-secondary);
    }

    &:focus {
      --scrollbar-thumb-color: var(--color-accent-500);
      border-color: var(--color-accent-500);
      outline: none;
      box-shadow: inset 0 0 0 0.0625rem var(--color-accent-500);
    }
  }
}
</style>
