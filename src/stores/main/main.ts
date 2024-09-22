import {
  getEntireDepartments,
  getEntireRoles,
  getEntireMenus,
  getEntireCategory
} from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
  entireCategories: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: [],
    entireCategories: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const departmentsResult = await getEntireDepartments()
      const menusResult = await getEntireMenus()
      const categoriesResult = await getEntireCategory()

      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentsResult.data.list
      this.entireMenus = menusResult.data.list
      this.entireCategories = categoriesResult.data.list
    }
  }
})

export default useMainStore
