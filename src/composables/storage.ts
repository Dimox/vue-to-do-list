import { useStorage } from '@vueuse/core'
import { ToDoList, ToDoOptions } from '@/types'

export const defaultOptions: ToDoOptions = {
  lang: 'en',
  appWidth: '640',
}

export const useToDoStorage = (data?: ToDoList) => {
  const key = 'vue-to-do-list'
  const defaultData: ToDoList = {
    items: [],
    options: defaultOptions,
  }
  return data ? useStorage(key, data) : useStorage(key, defaultData)
}
