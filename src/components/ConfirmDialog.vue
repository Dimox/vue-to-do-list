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
import { PropType } from 'vue'
import Btn from './Btn.vue'
import Icon from './Icon.vue'
import { t } from '@/i18n'

defineEmits(['close', 'confirm'])

const props = defineProps({
  data: {
    type: Object as PropType<{
      title: string
      message: string
      action: string
    }>,
    default: () => ({}),
  },
})

const { title, message, action } = props.data
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
    color: var(--color-gray-800);

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
