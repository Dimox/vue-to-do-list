<template>
  <button class="btn" :type="type">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  type: {
    type: String as PropType<'button' | 'submit'>,
    default: 'button',
  },
})
</script>

<style lang="scss">
.btn {
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  color: var(--color-white);
  background: var(--color-indigo-500);
  border-radius: 0.375rem;
  transition: 0.25s;
  transition-property: background, box-shadow;

  &:hover {
    background: var(--color-indigo-600);
  }

  &:active {
    background: var(--color-indigo-500);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 0.25rem var(--color-indigo-300);
  }
}
</style>