import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'normalize.css'
import '@/assets/css/index.less'
import App from './App.vue'
import router from './router'
import registerIcons from './global/register-icons'

const app = createApp(App)
app.use(registerIcons)
app.use(createPinia())
app.use(router)
app.mount('#app')
