import { IconName } from './icons'

export type ToDoList = {
  items: ToDoItem[]
  options?: ToDoOptions
}

export type ToDoItem = {
  id: string
  text: string
  date: Date
  checked: boolean
}

export type ToDoOptions = {
  lang: 'en' | 'ru'
}

export type DropdownMenuItem = {
  icon?: IconName
  label: string
  handler: () => void
}
