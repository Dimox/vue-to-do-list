<template>
  <button class="btn" :class="`btn--${type}`" :type="submit ? 'submit' : 'button'">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { ButtonType } from '@/types'

defineProps({
  type: {
    type: String as PropType<`${ButtonType}`>,
    default: 'primary',
  },
  submit: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss">
.btn {
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: 0.25s;
  transition-property: background, box-shadow, color;

  &--primary {
    color: var(--color-white);
    background: var(--color-indigo-500);

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

  &--secondary {
    --accent-color: var(--color-gray-400);
    box-shadow: 0 0 0 0.125rem var(--accent-color);

    &:hover {
      --accent-color: rgba(var(--color-gray-800-rgb), 0.7);
      color: var(--color-white);
      background: var(--accent-color);
    }

    &:active {
      --accent-color: rgba(var(--color-gray-800-rgb), 0.6);
    }

    &:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 0.125rem var(--accent-color),
        0 0 0 0.375rem var(--color-gray-300);
    }
  }

  &--alert {
    color: var(--color-white);
    background: var(--color-red-500);

    &:hover {
      background: var(--color-red-600);
    }

    &:active {
      background: var(--color-red-500);
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 0.25rem var(--color-red-300);
    }
  }
}
</style>
