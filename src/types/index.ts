import { IconName } from './icons'

export interface ToDoList {
  items: ToDoItem[]
  options: ToDoOptions
}

export interface ToDoItem {
  id: string
  text: string
  createdAt: Date
  checked: boolean
  pinned: boolean
}

export interface ToDoOptions {
  lang: LanguageCode
  colorScheme: ColorScheme
  appWidth: string
  accentColor: string
  isFirstLaunch: boolean
}

export interface DropdownMenuItem {
  icon?: `${IconName}`
  label: string
  handler: () => void
  delete?: boolean
  hidden?: boolean
}

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Alert = 'alert',
  Icon = 'icon',
}

export interface Language {
  code: LanguageCode
  name: string
}

export type LanguageCode = 'en' | 'ru'
export type ColorScheme = 'auto' | 'light' | 'dark'
