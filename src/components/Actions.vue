<template>
  <div v-if="toDoItems.length > 0" class="actions">
    <Tooltip class="actions__toggle-all" :text="t('selectUnselectAll')">
      <Checkbox v-model="isAllToDosChecked" @click.prevent="onClickToggleAll" />
    </Tooltip>
    <Tooltip v-if="hasChecked" :text="t('deleteCompleted')">
      <Btn class="actions__delete-done" type="icon" @click="onClickDeleteDone">
        <Icon name="delete-done" />
      </Btn>
    </Tooltip>
    <Dialog
      :open="isDialogOpen"
      :component="dialogComponent"
      :data="dialogData"
      @close="isDialogOpen = false"
      @confirm="onConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, Component, h, computed, watchEffect } from 'vue'
import Btn from './Btn.vue'
import ConfirmDialog from './ConfirmDialog.vue'
import Dialog from './Dialog.vue'
import Checkbox from './form/Checkbox.vue'
import Icon from './Icon.vue'
import Tooltip from './Tooltip.vue'
import { useToDo } from '@/composables/useToDo'
import { t } from '@/i18n'

const { toDoItems, updateToDoItems } = useToDo()
const hasChecked = computed(() => toDoItems.value.some(item => item.checked))
const hasUnchecked = computed(() => toDoItems.value.some(item => !item.checked))
const isAllToDosChecked = ref(!hasUnchecked.value)
const isDialogOpen = ref(false)
const dialogComponent = shallowRef<Component>()
const dialogData = ref()
const confirmType = ref('')

const onClickToggleAll = () => {
  if (isAllToDosChecked.value) {
    toggleAllToDos()
  } else {
    confirmType.value = 'toggle'
    isDialogOpen.value = true
    dialogComponent.value = h(ConfirmDialog)
    dialogData.value = {
      title: t('areYouSure'),
      message: t('allTasksWillBeMarkedAsCompleted'),
      action: t('markAsCompleted'),
    }
  }
}

const onClickDeleteDone = () => {
  confirmType.value = 'delete'
  dialogComponent.value = h(ConfirmDialog)
  isDialogOpen.value = true
  dialogData.value = {
    title: t('areYouSure'),
    message: t('allCompletedWillBeDeleted'),
    action: t('delete'),
  }
}

const toggleAllToDos = () => {
  isAllToDosChecked.value = !isAllToDosChecked.value

  const items = toDoItems.value.map(item => {
    item.checked = isAllToDosChecked.value
    return item
  })
  updateToDoItems(items)
}

const onConfirm = () => {
  if (confirmType.value === 'toggle') {
    toggleAllToDos()
  } else if (confirmType.value === 'delete') {
    const items = toDoItems.value.filter(item => !item.checked)
    updateToDoItems(items)
  }
  isDialogOpen.value = false
}

watchEffect(() => {
  isAllToDosChecked.value = !hasUnchecked.value
})
</script>

<style lang="scss">
.actions {
  display: flex;
  align-items: center;

  &__toggle-all {
    margin-right: auto;
  }

  &__delete-done {
    color: var(--color-text-quaternary);
  }
}
</style>
