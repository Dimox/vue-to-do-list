import { ToDoItem } from '@/types'

export const uniqueId = (prefix: string = '') =>
  prefix + String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '')

export const textareaAutoHeight = (el: HTMLTextAreaElement) => {
  const style = window.getComputedStyle(el)
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight + parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth)}px`
}

export const sortToDos = (items: ToDoItem[]) => {
  return items.sort((a, b) => {
    if (a.checked === b.checked) return 0
    if (a.checked) return 1
    return -1
  })
}

export const makeSelectedTextBold = (text: string) => {
  const selectedText = window.getSelection()?.toString()
  if (!selectedText) return text
  return text.replace(selectedText, `**${selectedText}**`)
}
