import type { ToDoItem } from '@/types'

export const textareaAutoHeight = (el: HTMLTextAreaElement) => {
  const style = window.getComputedStyle(el)
  el.style.height = 'auto'
  el.style.height = String(el.scrollHeight + parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth)) + 'px'
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
