import { Component, createApp } from 'vue'
import App from './App.vue'
import { useFavicon } from '@/composables/useFavicon'
import { setHtmlLang } from '@/i18n'
import '@/assets/scss/main.scss'

createApp(App as Component)
  .use(setHtmlLang)
  .use(useFavicon)
  .mount('#app')
