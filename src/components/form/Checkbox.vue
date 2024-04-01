<template>
  <label class="checkbox">
    <input v-model="model" class="checkbox__input visually-hidden" type="checkbox" v-bind="$attrs" />
    <svg
      class="checkbox__svg"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        class="checkbox__path"
        d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"
      />
      <polyline class="checkbox__polyline" points="1 9 7 14 15 4" />
    </svg>
  </label>
</template>

<script setup lang="ts">
const model = defineModel<boolean>()
</script>

<style lang="scss">
.checkbox {
  position: relative;
  display: block;
  width: fit-content;
  cursor: pointer;

  &::before {
    position: absolute;
    inset: -0.625rem;
    content: '';
    background: var(--color-gray-100);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &:active,
  &:has(:focus-visible) {
    &::before {
      opacity: 1;
    }
  }

  &__input {
    &:checked {
      & + .checkbox__svg {
        stroke: var(--color-indigo-500);
      }

      & + .checkbox__svg .checkbox__path {
        stroke-dashoffset: 60;
        transition-delay: 0s;
      }

      & + .checkbox__svg .checkbox__polyline {
        stroke-dashoffset: 42;
        transition-delay: 0.15s;
      }
    }

    &:focus {
      & + .checkbox__svg {
        stroke: var(--color-indigo-500);
      }
    }
  }

  &__svg {
    position: relative;
    z-index: 1;
    fill: none;
    stroke: var(--color-gray-300);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.5;
    transition: all 0.2s ease;

    .checkbox:hover & {
      stroke: var(--color-indigo-500);
    }
  }

  &__path {
    stroke-dasharray: 60;
    stroke-dashoffset: 0;
    transition: 0.25s;
  }

  &__polyline {
    stroke-dasharray: 22;
    stroke-dashoffset: 66;
    transition: 0.2s;
  }
}
</style>
