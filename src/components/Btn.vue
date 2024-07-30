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
    color: var(--color-text-senary);
    background: var(--color-accent-500);

    &:hover {
      background: var(--color-accent-600);
    }

    &:active {
      background: var(--color-accent-500);
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 0.25rem var(--color-accent-300);
    }
  }

  &--secondary {
    --accent-color: var(--color-border-tertiary);
    box-shadow: inset 0 0 0 0.125rem var(--accent-color);

    &:hover {
      --accent-color: var(--color-border-primary);
      color: var(--color-text-senary);
      background: var(--accent-color);
    }

    &:active {
      --accent-color: var(--color-border-secondary);
    }

    &:focus-visible {
      outline: none;
      box-shadow:
        inset 0 0 0 0.125rem var(--accent-color),
        0 0 0 0.25rem var(--color-border-tertiary);
    }
  }

  &--alert {
    color: var(--color-text-senary);
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
    color: var(--color-text-quaternary);
    transition-property: color;

    &::before {
      position: absolute;
      inset: -0.5rem;
      z-index: -1;
      content: '';
      background: var(--color-bg-tertiary);
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.25s;
    }

    &:hover {
      color: var(--color-text-primary);
    }

    &:active,
    &:focus-visible {
      color: var(--color-text-primary);
      outline: none;

      &::before {
        opacity: 1;
      }
    }
  }
}
</style>
