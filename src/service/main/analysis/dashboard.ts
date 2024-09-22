import ytyRequest from '../../index'

export function getAmountListData() {
  return ytyRequest.get({
    url: '/goods/amount/list'
  })
}
export function getCategoryGoodsCount() {
  return ytyRequest.get({
    url: '/goods/category/count'
  })
}
export function getCategoryGoodsSale() {
  return ytyRequest.get({
    url: '/goods/category/sale'
  })
}
export function getCategoryGoodsFavor() {
  return ytyRequest.get({
    url: '/goods/category/favor'
  })
}
export function getAddressGoodsSale() {
  return ytyRequest.get({
    url: '/goods/address/sale'
  })
}
