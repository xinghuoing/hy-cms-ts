import {
  createPageData,
  deletePageById,
  deletePhotoData,
  editPageData,
  postPageListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import useMainStore from '../main'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userTotalCount: 0,
    pageList: [],
    pageTotalCount: 0,
    goodsId: 0
  }),
  actions: {
    async fetchPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      // 1.删除操作
      const deleteResult = await deletePageById(pageName, id)
      // 2.删除后重新获取数据（刷新）
      this.fetchPageListAction(pageName, { size: 10, offset: 0 })
    },
    async createPageDataAction(pageName: string, userInfo: any) {
      // 1.新建操作
      const createResult = await createPageData(pageName, userInfo)
      // 保存一下新建商品的id
      this.goodsId = createResult.data.insertId

      // 2.新建后重新获取数据（刷新）
      this.fetchPageListAction(pageName, { size: 10, offset: 0 })
      // 3.当新建角色或部门，要重新获取完整的角色和部门数据，这个是在user的pagemodel中展示的
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, userInfo: any) {
      // 1.编辑操作
      const editResult = await editPageData(pageName, id, userInfo)
      // 2.编辑后重新获取数据（刷新）
      this.fetchPageListAction(pageName, { size: 10, offset: 0 })
      // 3.当编辑角色或部门，要重新获取完整的角色和部门数据，这个是在user的pagemodel中展示的
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async deletePhotoDataAction(pageName: string, goodsId: number) {
      const deleteResult = await deletePhotoData(pageName, goodsId)
    }
  }
})

export default useSystemStore
