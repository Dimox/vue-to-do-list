export const uniqueId = (prefix: string = '') =>
  prefix + String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '')

export const textareaAutoHeight = (el: HTMLTextAreaElement) => {
  const style = window.getComputedStyle(el)
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight + parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth)}px`
}
