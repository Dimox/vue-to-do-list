<template>
  <div class="dropdown-menu" :class="{ 'dropdown-menu--open': open }">
    <slot>
      <Btn>...</Btn>
    </slot>
    <ul class="dropdown-menu__items">
      <template v-for="item in items" :key="item.label">
        <li
          v-if="!item.hidden"
          class="dropdown-menu__item"
          :class="{ 'dropdown-menu__item--delete': item.delete }"
          @click="onItemClick(item)"
        >
          <Icon class="dropdown-menu__icon" :name="item.icon" />
          {{ item.label }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Btn from './Btn.vue'
import Icon from './Icon.vue'
import type { DropdownMenuItem } from '@/types'

const emit = defineEmits(['close'])

defineProps<{
  open: boolean
  items: DropdownMenuItem[]
}>()

const onItemClick = (item: DropdownMenuItem) => {
  item.handler()
  emit('close')
}
</script>

<style lang="scss">
.dropdown-menu {
  position: relative;

  &__items {
    position: absolute;
    top: calc(100% + 0.25rem);
    right: 0;
    z-index: 10;
    width: 14rem;
    padding-block: 0.375rem;
    visibility: hidden;
    background: var(--color-bg-primary);
    border-radius: 0.375rem;
    box-shadow:
      0 0 0 0.0625rem rgb(0 0 0 / 0.08),
      0 0.625rem 0.9375rem -0.1875rem rgb(0 0 0 / 0.1),
      0 0.25rem 0.375rem -0.25rem rgb(0 0 0 / 0.15);
    opacity: 0;
    transition: 0.25s;
    transform: scale(0.7);
    transform-origin: top right;

    .dropdown-menu--open & {
      visibility: visible;
      opacity: 1;
      transform: scale(1);
    }
  }

  &__item {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 550;
    cursor: pointer;

    &:hover {
      background: var(--color-bg-tertiary);

      .dropdown-menu__icon {
        color: inherit;
      }
    }

    &--delete {
      color: var(--color-red-500);

      .dropdown-menu__icon {
        color: var(--color-red-400);
      }
    }
  }

  &__icon {
    color: var(--color-text-quaternary);
  }
}
</style>
