<template>
  <Teleport to="body">
    <Transition name="dialog" @after-enter="onAfterEnter">
      <div
        v-if="open"
        ref="dialog"
        class="dialog"
        tabindex="0"
        @mousedown.self="$emit('close')"
        @keydown.esc="$emit('close')"
      >
        <component
          :is="component"
          :data="data"
          class="dialog__component"
          @close="$emit('close')"
          @confirm="$emit('confirm')"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineEmits(['close', 'confirm'])

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

const dialog = ref<HTMLDivElement | null>(null)

const onAfterEnter = () => {
  const textarea = document.querySelector('.edit-to-do-dialog .textarea__input') as HTMLTextAreaElement
  if (textarea) {
    textarea.focus()
  } else {
    dialog.value?.focus()
  }
}
</script>

<style lang="scss">
.dialog {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  background: rgba(var(--color-gray-800-rgb), 0.3);
  outline: none;

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
