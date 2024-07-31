import { IconName } from './icons'

export interface ToDoList {
  items: ToDoItem[]
  options?: ToDoOptions
}

export interface ToDoItem {
  id: string
  text: string
  createdAt: Date
  checked: boolean
}

export interface ToDoOptions {
  lang: Language
  colorScheme: ColorScheme
  appWidth: string
  accentColor: string
}

export interface DropdownMenuItem {
  icon?: `${IconName}`
  label: string
  handler: () => void
}

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Alert = 'alert',
  Icon = 'icon',
}

export type Language = 'en' | 'ru'
export type ColorScheme = 'light' | 'dark'
