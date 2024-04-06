import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useToDoStorage } from '@/composables/storage'

const messages = {
  settings: {
    en: 'Settings',
    ru: 'Настройки',
  },
  selectUnselectAll: {
    en: 'Select/Unselect all',
    ru: 'Выбрать/снять все',
  },
  deleteCompleted: {
    en: 'Delete completed tasks',
    ru: 'Удалить выполненные задачи',
  },
  areYouSure: {
    en: 'Are you sure?',
    ru: 'Вы уверены?',
  },
  allTasksWillBeMarkedAsCompleted: {
    en: 'All tasks will be marked as completed.',
    ru: 'Все задачи будут отмечены как выполненные.',
  },
  markAsCompleted: {
    en: 'Mark as completed',
    ru: 'Отметить как выполненные',
  },
  allCompletedWillBeDeleted: {
    en: 'All completed tasks will be deleted permanently.',
    ru: 'Все выполненные задачи будут удалены безвозвратно.',
  },
  taskWillBeDeletedPermanently: {
    en: 'The task will be deleted permanently.',
    ru: 'Задача будет удалена безвозвратно.',
  },
  delete: {
    en: 'Delete',
    ru: 'Удалить',
  },
  add: {
    en: 'Add',
    ru: 'Добавить',
  },
  save: {
    en: 'Save',
    ru: 'Сохранить',
  },
  cancel: {
    en: 'Cancel',
    ru: 'Отмена',
  },
  edit: {
    en: 'Edit',
    ru: 'Редактировать',
  },
  typeNewTask: {
    en: 'Type a new task...',
    ru: 'Введите новую задачу...',
  },
  addTask: {
    en: 'add task',
    ru: 'добавить задачу',
  },
  lineBreak: {
    en: 'line break',
    ru: 'перенос строки',
  },
  editTask: {
    en: 'Edit task',
    ru: 'Редактирование задачи',
  },
  pressCtrlEnterToSave: {
    en: 'Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to save',
    ru: 'Нажмите <kbd>Ctrl</kbd> + <kbd>Enter</kbd> для сохранения',
  },
  interfaceLanguage: {
    en: 'Interface language',
    ru: 'Язык интерфейса',
  },
  choosePreferredLanguage: {
    en: 'Choose your preferred language',
    ru: 'Выберите предпочитаемый язык',
  },
  settingsSaved: {
    en: 'Settings saved',
    ru: 'Настройки сохранены',
  },
  applicationWidth: {
    en: 'Application width in pixels',
    ru: 'Ширина приложения в пикселях',
  },
  expandToFullWidth: {
    en: '460 - minimum, 100% - expand to full width',
    ru: '460 - минимум, 100% - растянуть на всю ширину',
  },
}

const storage = useToDoStorage()
export const lang = computed(() => storage?.value?.options?.lang ?? 'en')
export const t = (key: keyof typeof messages) => messages[key][lang.value]
export const tHtml = (key: keyof typeof messages) =>
  DOMPurify.sanitize(marked.parse(messages[key][lang.value]) as string)
