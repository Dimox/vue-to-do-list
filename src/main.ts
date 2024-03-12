import { createApp } from 'vue'
import '@/assets/scss/main.scss'
import { useFavicon } from '@/composables/favicon'
import App from './App.vue'

createApp(App).use(useFavicon).mount('#app')
