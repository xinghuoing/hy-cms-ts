import { localCache } from '@/utils/cache'
import YTYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import { LOGIN_TOKEN } from '@/global/constants'

const ytyRequest = new YTYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token拦截,在请求头中添加bearer的token认证
      const token = localCache.getCache(LOGIN_TOKEN)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求拦截失败')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('响应拦截成功')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应拦截失败')
      return err
    }
  }
})

export default ytyRequest
