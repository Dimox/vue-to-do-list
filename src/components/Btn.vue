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
  icon: {
    type: String,
    default: null,
  },
})
</script>

<style lang="scss">
.btn {
  display: block;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  text-align: center;
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
    box-shadow: inset 0 0 0 0.125rem var(--accent-color);

    &:hover {
      --accent-color: var(--color-gray-500);
      color: var(--color-white);
      background: var(--accent-color);
    }

    &:active {
      --accent-color: var(--color-gray-400);
    }

    &:focus-visible {
      outline: none;
      box-shadow:
        inset 0 0 0 0.125rem var(--accent-color),
        0 0 0 0.25rem var(--color-gray-300);
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

  &--icon {
    position: relative;
    z-index: 0;
    padding: 0;
    color: var(--color-gray-400);
    transition-property: color;

    &::before {
      position: absolute;
      inset: -0.5rem;
      z-index: -1;
      content: '';
      background: var(--color-gray-100);
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.25s;
    }

    &:hover {
      color: var(--color-gray-800);
    }

    &:active,
    &:focus-visible {
      color: var(--color-gray-800);
      outline: none;

      &::before {
        opacity: 1;
      }
    }
  }
}
</style>
