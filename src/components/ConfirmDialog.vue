<template>
  <form class="confirm-dialog">
    <header class="confirm-dialog__header">
      <h2 class="confirm-dialog__title">{{ title }}</h2>
      <Btn class="confirm-dialog__close" type="icon" @click="$emit('close')">
        <Icon name="close" />
      </Btn>
    </header>
    <div class="confirm-dialog__body">
      <p>{{ message }}</p>
    </div>
    <footer class="confirm-dialog__footer">
      <Btn type="secondary" @click="$emit('close')">{{ t('cancel') }}</Btn>
      <Btn type="alert" @click="$emit('confirm')">{{ action }}</Btn>
    </footer>
  </form>
</template>

<script setup lang="ts">
import Btn from './Btn.vue'
import Icon from './Icon.vue'
import { t } from '@/i18n'

defineEmits(['close', 'confirm'])

const { data } = defineProps<{
  data: {
    title: string
    message: string
    action: string
  }
}>()

const { title, message, action } = data
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
    color: var(--color-text-primary);

    &:hover {
      &::before {
        opacity: 1;
      }
    }
  }

  &__body {
    padding: 0 2rem 0.5rem;
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 1.5rem;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
  }
}
</style>
