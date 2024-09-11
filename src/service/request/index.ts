import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
// import { ElLoading } from 'element-plus'
// import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

interface YTYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

interface YTYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YTYRequestInterceptors<T>
}

class YTYRequest {
  // 这样就可以创建多个请求
  instance: AxiosInstance
  interceptors?: YTYRequestInterceptors

  constructor(config: YTYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 从config中取出的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例的拦截成功')
        // const loadingInstance = ElLoading.service({
        //   lock: true,
        //   text: '正在加载',
        //   background: 'rgba(0, 0, 0, 0.5)'
        // })
        // loadingInstance.close()
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log(res)
        const data = res.data
        return data
      },
      (err) => {
        return err
      }
    )
  }
  // 将请求函数返回值设置为promise函数，调用就可以直接then获取数据
  request<T = any>(config: YTYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: YTYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: YTYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: YTYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: YTYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default YTYRequest
