import { useStorage } from '@vueuse/core'
import type { ToDoList, ToDoOptions } from '@/types'

export const defaultOptions: ToDoOptions = {
  lang: 'en',
  colorScheme: 'auto',
  appWidth: '640',
  accentColor: '#4f46e5',
}

export const useToDoStorage = () => {
  const key = 'vue-to-do-list'
  const defaultData: ToDoList = {
    items: [],
    options: defaultOptions,
  }
  return useStorage(key, defaultData)
}
