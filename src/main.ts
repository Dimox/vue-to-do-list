import { createApp } from 'vue'
import App from './App.vue'
import { useFavicon } from '@/composables/favicon'
import '@/assets/scss/main.scss'

createApp(App).use(useFavicon).mount('#app')
