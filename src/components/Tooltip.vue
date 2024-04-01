<template>
  <div class="tooltip">
    <slot />
    <p v-if="text" class="tooltip__text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: null,
  },
})
</script>

<style lang="scss">
.tooltip {
  --bg-color: var(--color-gray-600);
  position: relative;

  &__text {
    position: absolute;
    bottom: calc(100% + 0.5rem);
    left: 50%;
    z-index: 10;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    color: var(--color-white);
    white-space: nowrap;
    pointer-events: none;
    visibility: hidden;
    background: var(--bg-color);
    border-radius: 0.375rem;
    opacity: 0;
    transition: 0.15s;
    transition-property: opacity, transform, visibility;
    transform: translate(-50%, 0.5rem) scale(0.7);

    &::after {
      --size: 0.5rem;
      position: absolute;
      top: calc(100% - var(--size) / 2);
      left: calc(50% - var(--size) / 2);
      width: var(--size);
      height: var(--size);
      content: '';
      background: var(--bg-color);
      transform: rotate(45deg);
    }

    .tooltip:hover & {
      visibility: visible;
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
}
</style>
