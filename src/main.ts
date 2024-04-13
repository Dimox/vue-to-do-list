import { createApp } from 'vue'
import App from './App.vue'
import { useFavicon } from '@/composables/favicon'
import { setHtmlLang } from '@/i18n'
import '@/assets/scss/main.scss'

createApp(App).use(setHtmlLang).use(useFavicon).mount('#app')
