<template>
  <li class="to-do-item" :class="{ 'to-do-item--checked': isChecked }">
    <div v-if="!isChecked && !isPinned" class="to-do-item__handle">
      <Icon name="drag" width="20" height="20" />
    </div>
    <Icon v-if="isPinned && !isChecked" class="to-do-item__pinned" name="pin" />
    <Checkbox v-model="isChecked" class="to-do-item__checkbox" @change="toggleChecked" />
    <div class="to-do-item__text" v-html="sanitizedHtml(text)" />
    <DropdownMenu
      ref="dropdownMenu"
      class="to-do-item__dropdown"
      :open="isDropdownMenuOpen"
      :items="dropdownMenuItems"
      @close="isDropdownMenuOpen = false"
    >
      <Btn class="to-do-item__dropdown-btn" type="icon" @click="toggleDropdownMenu">
        <Icon name="dots" />
      </Btn>
    </DropdownMenu>
    <Dialog
      :open="isDialogOpen"
      :component="dialogComponent"
      :data="dialogData"
      @close="isDialogOpen = false"
      @confirm="deleteToDo"
    />
  </li>
</template>

<script setup lang="ts">
import { Component, computed, h, ref, shallowRef, watchEffect } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import Checkbox from './form/Checkbox.vue'
import Btn from './Btn.vue'
import Icon from './Icon.vue'
import DropdownMenu from './DropdownMenu.vue'
import Dialog from './Dialog.vue'
import EditToDoDialog from './EditToDoDialog.vue'
import ConfirmDialog from './ConfirmDialog.vue'
import { useToDo } from '@/composables/useToDo'
import type { DropdownMenuItem } from '@/types'
import { t } from '@/i18n'

const { id, checked, pinned } = defineProps<{
  id: string
  createdAt: Date
  text: string
  checked: boolean
  pinned: boolean
}>()

const { toDoItems, getToDoItem, updateToDoItem, deleteToDoItem } = useToDo()
const isChecked = ref(checked)
const isPinned = computed(() => pinned)

const isDialogOpen = ref(false)
const dialogComponent = shallowRef<Component>()
const dialogData = ref()

const dropdownMenu = ref()
const isDropdownMenuOpen = ref(false)
const toggleDropdownMenu = () => (isDropdownMenuOpen.value = !isDropdownMenuOpen.value)

const sanitizedHtml = (text: string) => DOMPurify.sanitize(marked.parse(text) as string)

watchEffect(() => (isChecked.value = checked))

DOMPurify.addHook('afterSanitizeAttributes', node => {
  if ('target' in node) {
    node.setAttribute('target', '_blank')
  }
})

const dropdownMenuItems = computed<DropdownMenuItem[]>(() => [
  {
    icon: isPinned.value ? 'unpin' : 'pin',
    label: isPinned.value ? t('unpin') : t('pin'),
    handler: () => {
      togglePinned()
    },
    hidden: isChecked.value,
  },
  {
    icon: 'edit',
    label: t('edit'),
    handler: () => {
      onClickEdit()
    },
  },
  {
    icon: 'delete',
    label: t('delete'),
    handler: () => {
      onClickDelete()
    },
    delete: true,
  },
])

onClickOutside(dropdownMenu, () => (isDropdownMenuOpen.value = false))

const toggleChecked = () => {
  const toDoItem = getToDoItem(id)
  if (!toDoItem) return
  toDoItem.checked = isChecked.value
  updateToDoItem(id, toDoItem)
}

const togglePinned = () => {
  const toDoItem = getToDoItem(id)
  if (!toDoItem) return
  toDoItem.pinned = !toDoItem.pinned
  updateToDoItem(id, toDoItem)
}

const onClickEdit = () => {
  dialogComponent.value = h(EditToDoDialog)
  isDialogOpen.value = true
  dialogData.value = toDoItems.value.find(item => item.id === id)
}

const onClickDelete = () => {
  dialogComponent.value = h(ConfirmDialog)
  isDialogOpen.value = true
  dialogData.value = {
    title: t('areYouSure'),
    message: t('taskWillBeDeletedPermanently'),
    action: t('delete'),
  }
}

const deleteToDo = () => {
  isDialogOpen.value = false
  setTimeout(() => {
    deleteToDoItem(id)
  }, 200)
}
</script>

<style lang="scss">
.to-do-item {
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding-left: 2rem;

  &__handle {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 2.25rem;
    padding: 1.1875rem 0 0 0.375rem;
    color: var(--color-text-tertiary);
    cursor: grab;
    opacity: 0;
    transition: opacity 0.25s;

    .to-do-item:hover & {
      opacity: 1;
    }

    &:active {
      cursor: grabbing;
    }
  }

  &__pinned {
    --icon-bg-color: var(--color-accent-300);
    position: absolute;
    inset: 1rem 0 0 -0.8125rem;
    color: var(--color-accent-500);
    transform: scaleX(-1);

    .dark & {
      --icon-bg-color: var(--color-bg-primary);
    }
  }

  &__checkbox {
    margin-top: 0.1875rem;
  }

  &__text {
    flex-grow: 1;
    overflow-wrap: anywhere;

    .to-do-item--checked & {
      color: var(--color-text-quinary);
      text-decoration: underline;
      text-decoration-thickness: 0.0625rem;
      text-underline-offset: -0.3125rem;
      transition: color 0.25s;
      text-decoration-skip-ink: none;

      a {
        color: var(--color-accent-300);
      }
    }

    .to-do-item--checked:hover & {
      color: var(--color-text-quaternary);

      a {
        color: var(--color-accent-400);
      }
    }

    p {
      white-space: pre-line;
    }

    * + *,
    ul,
    ol {
      margin-top: 0.75rem;
    }

    ul,
    ol {
      padding: revert;
    }

    li {
      list-style: revert;
    }

    a {
      color: var(--color-accent-600);
      text-decoration: underline;
      text-underline-offset: 0.125rem;
      transition: color 0.25s;

      &:hover {
        text-decoration: none;
      }
    }
  }

  &__dropdown {
    margin-top: 0.125rem;

    &-btn {
      opacity: 0;
      transition-property: opacity, color;

      .to-do-item:hover &,
      .to-do-item:has(.dropdown-menu--open) & {
        opacity: 1;
      }

      &:active,
      &:focus-visible {
        background: var(--color-bg-tertiary);
      }

      &:focus-visible {
        outline: none;
        opacity: 1;
      }
    }
  }
}
</style>
