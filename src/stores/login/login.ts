import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenusToPermissions, mapMenustoRoutes } from '@/utils/map-menus'
import { defineStore } from 'pinia'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.登录获取token
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token

      // 2.进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3.获取登录用户的详细信息（尤其是里面的role信息）
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data //不想保存Proxy数据在本地
      this.userInfo = userInfo
      // 4.根据角色请求权限信息
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 5.将用户数据和菜单数据本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 请求role和departmen数据（先准备好）
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 重要：获取用户拥有按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      // 重要 6.动态的添加路由(所有路由都在localRoutes里面)
      // 将匹配好的路由addRoute加入到main的children路由中
      const routes = mapMenustoRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 7.跳转到首页
      router.push('/main')
    },
    async loadLocalCacheAction() {
      // 1.当用户刷新是自动加载默认数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 刷新在请求一下role和departmen数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
        //获取按钮的权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions
        // 2.动态加载路由
        const routes = mapMenustoRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
