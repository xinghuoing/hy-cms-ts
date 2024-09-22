import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  /*
    1.动态获取所有的路由对象
    路由对象在独立的文件中
    将路由对象读取到数组中
  */
  const localRoutes: RouteRecordRaw[] = []
  // 1.1读取router/main中的所有ts文件(eager是不使用懒加载，直接返回对应数据)
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  // 1.2将加载的对象添加到路由里面(所有路由都在localRoutes里面)
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstMenu: any = null //这是第一个要显示的路由对象
export function mapMenustoRoutes(userMenus: any[]) {
  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()
  // 2根据菜单去匹配路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      // route是为路由对象
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 1.给一级菜单添加重定向功能，当点击面包屑的时候重定向的当前一级菜单的第一个二级菜单
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 2.二级菜单的路由加到routes里面
        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  // 3.返回匹配路由的数组
  return routes
}

export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumbs[] = []

  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

// 根据传入的菜单获取菜单最底层菜单的id
export function mapMenusToIds(menuList: any[]) {
  const ids: any[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      // 遍历过程中，有子菜单将子菜单递归调用
      if (item.children) {
        recurseGetId(item.children)
      } else {
        // 到这就是最底层了，将最底层菜单的id加入到数组中
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}

// 从菜单中映射出对应的按钮权限
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  function recurseGetPermissions(menus: any[]) {
    for (const item of menus) {
      // 到这就是第三级了，将最底层菜单按钮的permission加入到数组中
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        // 遍历过程中，有子菜单将子菜单递归调用
        recurseGetPermissions(item.children ?? [])
      }
    }
  }
  recurseGetPermissions(userMenus)
  return permissions
}
