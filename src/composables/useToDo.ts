import { computed } from 'vue'
import { useToDoStorage } from './useToDoStorage'
import { sortToDos } from '@/utils'
import type { ToDoItem, ToDoOptions } from '@/types'

export const useToDo = () => {
  const storage = useToDoStorage()
  const toDoItems = computed(() => sortToDos(storage.value.items))
  const toDoOptions = computed(() => storage.value.options)

  const addToDoItem = (item: ToDoItem) => {
    storage.value.items.push(item)
  }

  const getToDoItem = (id: string) => {
    return storage.value.items.find(item => item.id === id)
  }

  const updateToDoItem = (id: string, toDoItem: ToDoItem) => {
    storage.value.items = storage.value.items.map(item => {
      if (item.id === id) item = toDoItem
      return item
    })
  }

  const deleteToDoItem = (id: string) => {
    storage.value.items = storage.value.items.filter(item => item.id !== id)
  }

  const updateToDoItems = (items: ToDoItem[]) => {
    storage.value.items = items
  }

  const updateToDoOptions = (options: ToDoOptions) => {
    storage.value.options = options
  }

  return {
    toDoItems,
    toDoOptions,
    addToDoItem,
    getToDoItem,
    updateToDoItem,
    deleteToDoItem,
    updateToDoItems,
    updateToDoOptions,
  }
}
