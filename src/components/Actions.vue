<template>
  <div v-if="storage.items.length > 0" class="actions">
    <Tooltip class="actions__toggle-all" :text="t('selectUnselectAll')">
      <Checkbox v-model="isAllToDosChecked" @click.prevent="onClickToggleAll" />
    </Tooltip>
    <Tooltip v-if="hasChecked()" :text="t('deleteCompleted')">
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
import { ref, watch, shallowRef, Component } from 'vue'
import Tooltip from './Tooltip.vue'
import Checkbox from './form/Checkbox.vue'
import Btn from './Btn.vue'
import Icon from './Icon.vue'
import Dialog from './Dialog.vue'
import ConfirmDialog from './ConfirmDialog.vue'
import { useToDoStorage } from '@/composables/storage'
import { t } from '@/i18n'

const storage = useToDoStorage()
const hasChecked = () => storage.value.items.some(item => item.checked)
const hasUnchecked = () => storage.value.items.some(item => !item.checked)
const isAllToDosChecked = ref(!hasUnchecked())
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
    dialogComponent.value = ConfirmDialog
    dialogData.value = {
      title: t('areYouSure'),
      message: t('allTasksWillBeMarkedAsCompleted'),
      action: t('markAsCompleted'),
    }
  }
}

const onClickDeleteDone = () => {
  confirmType.value = 'delete'
  dialogComponent.value = ConfirmDialog
  isDialogOpen.value = true
  dialogData.value = {
    title: t('areYouSure'),
    message: t('allCompletedWillBeDeleted'),
    action: t('delete'),
  }
}

const toggleAllToDos = () => {
  isAllToDosChecked.value = !isAllToDosChecked.value
  storage.value.items.forEach(item => (item.checked = isAllToDosChecked.value))
}

const onConfirm = () => {
  if (confirmType.value === 'toggle') {
    toggleAllToDos()
  } else if (confirmType.value === 'delete') {
    storage.value.items = storage.value.items.filter(item => !item.checked)
  }
  isDialogOpen.value = false
}

watch(storage, () => {
  isAllToDosChecked.value = !hasUnchecked()
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
