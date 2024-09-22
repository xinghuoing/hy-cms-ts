import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from '@/stores/login/login'

function registerStore(app: App) {
  // 刷新重新加载pinia
  app.use(createPinia())
  // 执行重新加载本地缓存操作
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
