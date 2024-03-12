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
