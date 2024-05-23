<template>
  <div class="app" :class="{ 'app--full-width': width === '100%' }">
    <header class="app__header">
      <h1 class="app__title">To-Do List</h1>
      <Tooltip :text="t('settings')">
        <Btn class="app__settings" type="icon" @click="isSettingsOpen = true">
          <Icon name="settings" width="28" height="28" />
        </Btn>
      </Tooltip>
    </header>
    <main class="app__body">
      <Actions class="app__actions" />
      <TransitionGroup
        v-if="storage.items.length > 0"
        ref="itemsEl"
        class="app__items"
        tag="ul"
        :name="isDragging ? '' : 'app__item'"
      >
        <ToDoItem
          v-for="item in storage.items"
          :id="item.id"
          :key="item.id"
          class="app__item"
          :created-at="new Date(item.createdAt)"
          :text="item.text"
          :checked="item.checked"
        />
      </TransitionGroup>
      <AddToDo class="app__add" />
    </main>
    <Dialog :open="isSettingsOpen" :component="Settings" type="flyout" @close="isSettingsOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, watch } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import { useToDoStorage } from './composables/storage'
import { t } from './i18n'
import Btn from './components/Btn.vue'
import Icon from './components/Icon.vue'
import Actions from './components/Actions.vue'
import ToDoItem from './components/ToDoItem.vue'
import AddToDo from './components/AddToDo.vue'
import Dialog from './components/Dialog.vue'
import Settings from './components/Settings.vue'
import Tooltip from './components/Tooltip.vue'

const storage = useToDoStorage()
const itemsEl = ref()
const isDragging = ref(false)
const isSettingsOpen = ref(false)

const appWidth = computed(() => storage.value.options?.appWidth)
const width = computed(() => (appWidth.value === '100%' ? appWidth.value : appWidth.value + 'px'))
const accentColor = computed(() => storage.value.options?.accentColor)

const setHtmlVars = () => {
  const styles = {
    '--app-width': width.value ?? '',
    '--accent-color': accentColor.value ?? '',
  }
  Object.entries(styles).forEach($ => document.documentElement.style.setProperty($[0], $[1]))
}

setHtmlVars()
watch(
  () => storage.value.options,
  () => setHtmlVars()
)

useSortable(itemsEl, storage.value.items, {
  animation: 200,
  handle: '.to-do-item__handle',
  draggable: '.to-do-item:not(.to-do-item--checked)',
  ghostClass: 'app__item--ghost',
  onStart: () => (isDragging.value = true),
  onUpdate: (e: { oldIndex: number; newIndex: number }) => {
    // https://github.com/vueuse/vueuse/issues/2924
    const item = storage.value.items.splice(e.oldIndex, 1)[0]
    nextTick(async () => {
      await Promise.all(storage.value.items.splice(e.newIndex, 0, item))
      isDragging.value = false
    })
  },
})
</script>

<style lang="scss">
.app {
  --spread-shadow: 5%;
  width: min(var(--app-width, 40rem), 100%);
  margin: 2rem 1rem;
  margin-inline: auto;
  background: var(--color-white);
  border-radius: 0.75rem;
  box-shadow:
    rgba(var(--color-gray-800-rgb), 10%) 0 0 0 0.0625rem,
    rgba(var(--color-black-rgb), var(--spread-shadow)) 0 1.25rem 1.5625rem -0.3125rem,
    rgba(var(--color-black-rgb), var(--spread-shadow)) 0 0.5rem 0.625rem -0.375rem;
  transition: box-shadow 0.25s ease-in-out;

  @media (max-width: 40rem) {
    margin: 0;
    border-radius: 0;
  }

  &--full-width {
    margin: 0;
    border-radius: 0;
  }

  &:has(.add-to-do__textarea :focus) {
    --spread-shadow: 15%;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding: 1rem 2rem 0;
  }

  &__title {
    font-size: 1.625rem;
    font-weight: bold;
  }

  &__settings {
    margin-right: -0.125rem;
  }

  &__body {
    display: flex;
    flex-direction: column;

    &::after {
      position: sticky;
      bottom: 5.125rem;
      z-index: 1;
      height: 2rem;
      margin-bottom: -2rem;
      content: '';
      background: var(--color-white);
    }
  }

  &__actions {
    min-height: 3.125rem;
    padding: 0 2rem;
    border-block: 0.0625rem solid var(--color-gray-300);
  }

  &__items {
    margin-left: -2rem;
    padding: 1rem 2rem;

    &:has(.sortable-chosen) {
      .dropdown-menu {
        opacity: 0;
      }

      .to-do-item__handle {
        display: none;
      }
    }
  }

  &__item {
    padding-block: 1rem 1.0625rem;

    &:not(:first-child):not(.sortable-drag) {
      background: linear-gradient(
          90deg,
          #0000,
          #0000 4.75rem,
          rgba(var(--color-gray-800-rgb), 0.12) 4.75rem,
          rgba(var(--color-gray-800-rgb), 0.12)
        )
        no-repeat 0 0 / 100% 0.0625rem;
    }

    &--ghost {
      position: relative;

      &::after {
        position: absolute;
        inset: 0 -1rem -0.0625rem 1rem;
        pointer-events: none;
        content: '';
        border: 0.125rem dashed var(--color-gray-400);
        border-radius: 0.75rem;
      }
    }

    &-move,
    &-enter-active,
    &-leave-active {
      transition: 0.35s;
      transition-property: opacity, transform;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: translateX(6rem);
    }

    &-leave-active {
      position: absolute;
      z-index: 1;
    }
  }

  &__add {
    position: sticky;
    bottom: 0;
    z-index: 2;
    order: 1;
    padding: 0 2rem 2rem;
    background: var(--color-white);
    border-radius: 0 0 1.5rem 1.5rem;
  }
}
</style>
