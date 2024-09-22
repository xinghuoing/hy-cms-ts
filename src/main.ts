import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/index.less'
import App from './App.vue'
import router from './router'
import registerIcons from './global/register-icons'
import registerStore from './stores'

const app = createApp(App)

app.use(registerIcons)
app.use(registerStore)
app.use(router)
app.mount('#app')
