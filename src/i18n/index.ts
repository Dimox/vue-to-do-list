import { computed, watch } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { messages } from './messages'
import { useToDoStorage } from '@/composables/storage'

const storage = useToDoStorage()
const lang = computed(() => storage.value.options.lang)
export const t = (key: keyof typeof messages) => messages[key][lang.value]
export const tHtml = (key: keyof typeof messages) =>
  DOMPurify.sanitize(marked.parse(messages[key][lang.value]) as string)

export const setHtmlLang = () => {
  document.documentElement.setAttribute('lang', lang.value)
}
watch(lang, () => {
  setHtmlLang()
})
