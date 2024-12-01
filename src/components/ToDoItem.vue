<template>
  <li class="to-do-item" :class="{ 'to-do-item--checked': checked }">
    <div v-if="!checked" class="to-do-item__handle">
      <Icon name="drag" width="20" height="20" />
    </div>
    <Checkbox v-model="checked" class="to-do-item__checkbox" @change="onChange" />
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
import { Component, h, ref, shallowRef, watchEffect } from 'vue'
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
import { useToDoStorage } from '@/composables/useToDoStorage'
import { sortToDos } from '@/utils'
import type { DropdownMenuItem } from '@/types'
import { t } from '@/i18n'

const { id, checked: checkedValue } = defineProps<{
  id: string
  createdAt: Date
  text: string
  checked: boolean
}>()

const storage = useToDoStorage()
const checked = ref(checkedValue)
watchEffect(() => (checked.value = checkedValue))

const sanitizedHtml = (text: string) => DOMPurify.sanitize(marked.parse(text) as string)
DOMPurify.addHook('afterSanitizeAttributes', node => {
  if ('target' in node) {
    node.setAttribute('target', '_blank')
  }
})

const dropdownMenu = ref()
const dropdownMenuItems: DropdownMenuItem[] = [
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
  },
]

const isDropdownMenuOpen = ref(false)
const toggleDropdownMenu = () => (isDropdownMenuOpen.value = !isDropdownMenuOpen.value)
onClickOutside(dropdownMenu, () => (isDropdownMenuOpen.value = false))

const onChange = () => {
  storage.value.items.map(item => {
    if (item.id === id) {
      item.checked = checked.value
    }
    return item
  })
  storage.value.items = sortToDos(storage.value.items)
}

const isDialogOpen = ref(false)
const dialogComponent = shallowRef<Component>()
const dialogData = ref()

const onClickEdit = () => {
  dialogComponent.value = h(EditToDoDialog)
  isDialogOpen.value = true
  dialogData.value = storage.value.items.find(item => item.id === id)
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
    storage.value.items = storage.value.items.filter(item => item.id !== id)
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
