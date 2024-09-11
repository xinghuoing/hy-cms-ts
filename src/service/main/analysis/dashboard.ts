import ytyRequest from '../../index'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}
export function getCategoryGoodsCount() {
  return ytyRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}
export function getCategoryGoodsSale() {
  return ytyRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}
export function getCategoryGoodsFavor() {
  return ytyRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function getAddressGoodsSale() {
  return ytyRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
