<template>
  <form class="confirm-dialog">
    <header class="confirm-dialog__header">
      <h2 class="confirm-dialog__title">Вы уверены?</h2>
      <button class="confirm-dialog__close" type="button" @click="$emit('close')">
        <Icon name="close" />
      </button>
    </header>
    <div class="confirm-dialog__body">
      <p>Задача будет удалена безвозвратно.</p>
    </div>
    <footer class="confirm-dialog__footer">
      <Btn type="secondary" @click="$emit('close')">Отмена</Btn>
      <Btn type="alert" @click="$emit('confirm')">Удалить</Btn>
    </footer>
  </form>
</template>

<script setup lang="ts">
import Btn from './Btn.vue'
import Icon from './Icon.vue'

defineEmits(['close', 'confirm'])

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<style lang="scss">
.confirm-dialog {
  width: min(37.5rem, 100%);

  &__header {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
  }

  &__title {
    font-size: 1.5rem;
  }

  &__close {
    margin-right: -0.625rem;
    padding: 0.375rem;
    border-radius: 0.375rem;
    transition: 0.25s;
    transition-property: background, box-shadow;

    &:hover {
      background: var(--color-gray-100);
    }

    &:focus-visible {
      background: var(--color-gray-100);
      outline: none;
      box-shadow: 0 0 0 0.125rem var(--color-indigo-500);
    }
  }

  &__body {
    padding: 0 2rem 0.5rem;
  }

  &__footer {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
  }
}
</style>
