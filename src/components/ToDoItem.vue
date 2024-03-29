<template>
  <li class="to-do-item" :class="{ 'to-do-item--checked': checked }">
    <Checkbox v-model="checked" class="to-do-item__checkbox" @change="onChange" />
    <div class="to-do-item__text">
      <p class="to-do-item__text-inner">{{ text }}</p>
    </div>
    <DropdownMenu
      ref="dropdownMenu"
      class="to-do-item__dropdown"
      :open="isDropdownMenuOpen"
      :items="dropdownMenuItems"
      @close="isDropdownMenuOpen = false"
    >
      <button class="to-do-item__dropdown-btn" type="button" @click="toggleDropdownMenu">
        <Icon name="dots" />
      </button>
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
import { Component, ref, shallowRef, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import Checkbox from './form/Checkbox.vue'
import Icon from './Icon.vue'
import DropdownMenu from './DropdownMenu.vue'
import Dialog from './Dialog.vue'
import EditToDoDialog from './EditToDoDialog.vue'
import ConfirmDialog from './ConfirmDialog.vue'
import { useToDoStorage } from '@/composables/storage'
import { sortToDos } from '@/utils'
import { DropdownMenuItem } from '@/types'

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: null,
  },
  text: {
    type: String,
    default: null,
  },
  checked: {
    type: Boolean,
    default: false,
  },
})

const storage = useToDoStorage()
const checked = ref(props.checked)
watch(props, () => (checked.value = props.checked))

const dropdownMenu = ref()
const dropdownMenuItems: DropdownMenuItem[] = [
  { icon: 'edit', label: 'Редактировать', handler: () => onClickEdit() },
  { icon: 'delete', label: 'Удалить', handler: () => onClickDelete() },
]

const isDropdownMenuOpen = ref(false)
const toggleDropdownMenu = () => (isDropdownMenuOpen.value = !isDropdownMenuOpen.value)
onClickOutside(dropdownMenu, () => (isDropdownMenuOpen.value = false))

const onChange = () => {
  storage.value.items.map(item => {
    if (item.id === props.id) {
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
  dialogComponent.value = EditToDoDialog
  isDialogOpen.value = true
  dialogData.value = storage.value.items.find(item => item.id === props.id)
}

const onClickDelete = () => {
  dialogComponent.value = ConfirmDialog
  isDialogOpen.value = true
  dialogData.value = {
    title: 'Вы уверены?',
    message: 'Задача будет удалена безвозвратно.',
    action: 'Удалить',
  }
}

const deleteToDo = () => {
  isDialogOpen.value = false
  setTimeout(() => {
    storage.value.items = storage.value.items.filter(item => item.id !== props.id)
  }, 200)
}
</script>

<style lang="scss">
.to-do-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  &__checkbox {
    margin-top: 0.1875rem;
  }

  &__text {
    flex-grow: 1;
    overflow-wrap: anywhere;

    &-inner {
      white-space: pre-line;

      .to-do-item--checked & {
        --color: var(--color-gray-300);
        display: inline;
        color: var(--color);
        background: linear-gradient(var(--color), var(--color)) no-repeat 0 56% / 100% 0.0625rem;
        transition: color 0.25s;

        &:hover {
          color: var(--color-gray-400);
        }
      }
    }
  }

  &__dropdown {
    margin-block: -0.5rem;

    &-btn {
      padding: 0.5rem;
      border-radius: 50%;
      opacity: 0;
      transition: 0.25s;
      transition-property: opacity, background;

      .to-do-item:hover &,
      .to-do-item:has(.dropdown-menu--open) & {
        opacity: 1;
      }

      &:active,
      &:focus-visible {
        background: var(--color-gray-100);
      }

      &:focus-visible {
        outline: none;
        opacity: 1;
      }
    }
  }
}
</style>
