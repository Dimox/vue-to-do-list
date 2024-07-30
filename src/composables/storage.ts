import { useStorage } from '@vueuse/core'
import { ToDoList, ToDoOptions } from '@/types'

export const defaultOptions: ToDoOptions = {
  lang: 'en',
  colorScheme: 'light',
  appWidth: '640',
  accentColor: '#4f46e5',
}

export const useToDoStorage = (data?: ToDoList) => {
  const key = 'vue-to-do-list'
  const defaultData: ToDoList = {
    items: [],
    options: defaultOptions,
  }
  return data ? useStorage(key, data) : useStorage(key, defaultData)
}
