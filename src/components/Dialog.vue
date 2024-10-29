<template>
  <Teleport to="body">
    <Transition :name="type" @after-enter="onAfterEnter">
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
import type { Component } from 'vue'

defineEmits(['close', 'confirm'])

const { type = 'modal' } = defineProps<{
  open: boolean
  component?: Component
  data?: object
  type?: 'modal' | 'flyout'
}>()

const dialog = ref<HTMLDivElement | null>(null)

const onAfterEnter = () => {
  const textarea = document.querySelector('.edit-to-do-dialog .textarea__input')
  if (textarea) {
    ;(textarea as HTMLTextAreaElement).focus()
  } else {
    dialog.value?.focus()
  }
}
</script>

<style lang="scss">
.dialog {
  --bezier: cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  background: rgba(var(--color-gray-800-rgb), 0.3);
  outline: none;

  &__component {
    max-width: calc(100% - 2rem);
    max-height: calc(100% - 2rem);
    margin: auto;
    background: var(--color-bg-primary);
    border-radius: 0.75rem;
    box-shadow:
      rgba(var(--color-black-rgb), 0.1) 0 1.25rem 1.5625rem -0.3125rem,
      rgba(var(--color-black-rgb), 0.1) 0 0.5rem 0.625rem -0.375rem;

    .modal-enter-active &,
    .modal-leave-active & {
      transition: transform 0.2s var(--bezier);
    }

    .modal-enter-from &,
    .modal-leave-to & {
      transform: scale(0.9);
    }

    .flyout-enter-active &,
    .flyout-leave-active & {
      transition: transform 0.4s var(--bezier);
    }

    .flyout-enter-from &,
    .flyout-leave-to & {
      transform: translateX(100%);
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s var(--bezier);
}

.flyout-enter-active,
.flyout-leave-active {
  transition: opacity 0.4s var(--bezier);
}

.modal-enter-from,
.modal-leave-to,
.flyout-enter-from,
.flyout-leave-to {
  opacity: 0;
}
</style>
