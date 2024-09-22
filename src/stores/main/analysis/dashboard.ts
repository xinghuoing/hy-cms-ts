import {
  getAddressGoodsSale,
  getAmountListData,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from '@/service/main/analysis/dashboard'
import { defineStore } from 'pinia'

interface IDashboardState {
  amountList: any[]
  goodCategorySale: any[]
  goodCategoryCount: any[]
  goodCategoryFavor: any[]
  goodsAddressSale: any[]
}

const useDashboardStore = defineStore('dashboard', {
  state: (): IDashboardState => ({
    amountList: [],
    goodCategoryCount: [],
    goodCategorySale: [],
    goodCategoryFavor: [],
    goodsAddressSale: []
  }),
  actions: {
    async fetchDashboardDataAction() {
      const amountResult = await getAmountListData()
      this.amountList = amountResult.data

      const goodsCountResult = await getCategoryGoodsCount()
      this.goodCategoryCount = goodsCountResult.data

      const goodsSaleResult = await getCategoryGoodsSale()
      this.goodCategorySale = goodsSaleResult.data

      const goodsFavorResult = await getCategoryGoodsFavor()
      this.goodCategoryFavor = goodsFavorResult.data

      const addressSaleResult = await getAddressGoodsSale()
      this.goodsAddressSale = addressSaleResult.data
    }
  }
})

export default useDashboardStore
