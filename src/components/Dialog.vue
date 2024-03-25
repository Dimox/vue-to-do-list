<template>
  <Teleport to="body">
    <Transition name="dialog" @after-enter="onAfterEnter">
      <div v-if="open" class="dialog" @mousedown.self="$emit('close')">
        <component :is="component" :data="data" class="dialog__component" @close="$emit('close')" />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineEmits(['close'])

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  component: {
    type: Object,
    default: null,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
})

const onAfterEnter = () => {
  const textarea = document.querySelector('.edit-to-do-dialog .textarea__input') as HTMLTextAreaElement
  textarea?.focus()
}
</script>

<style lang="scss">
.dialog {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  background: rgba(var(--color-gray-800-rgb), 0.3);

  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &__component {
    margin: auto;
    background: var(--color-white);
    border-radius: 0.75rem;
    box-shadow:
      rgba(var(--color-black-rgb), 0.1) 0 1.25rem 1.5625rem -0.3125rem,
      rgba(var(--color-black-rgb), 0.1) 0 0.5rem 0.625rem -0.375rem;

    .dialog-enter-active &,
    .dialog-leave-active & {
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .dialog-enter-from &,
    .dialog-leave-to & {
      transform: scale(0.9);
    }
  }
}
</style>
