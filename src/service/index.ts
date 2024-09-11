import YTYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
// import localCache from '@/utils/cache'

const ytyRequest = new YTYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
  // interceptors: {
  //   requestInterceptor: (config) => {
  //     // 携带token拦截
  //     const token = localCache.getCache('token')
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`
  //     }
  //     return config
  //   },
  //   requestInterceptorCatch: (err) => {
  //     console.log('请求拦截失败')
  //     return err
  //   },
  //   responseInterceptor: (res) => {
  //     // console.log('响应拦截成功')
  //     return res
  //   },
  //   responseInterceptorCatch: (err) => {
  //     console.log('响应拦截失败')
  //     return err
  //   }
  // }
})

export default ytyRequest
