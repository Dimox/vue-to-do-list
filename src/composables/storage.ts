import { useStorage } from '@vueuse/core'
import { ToDoList } from '@/types'

export const useToDoStorage = (data?: ToDoList) => {
  const key = 'vue-to-do-list'
  const defaultData: ToDoList = { items: [] }
  return data ? useStorage(key, data) : useStorage(key, defaultData)
}
