import ytyRequest from '../../index'
import type { IDataType } from '@/service/types'

// 针对页面的增删改查
// 不规范的接口可以在这定义一个函数进行转化
export function postPageListData(pageName: string, queryInfo: any) {
  return ytyRequest.post<IDataType>({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}
export function deletePageById(pageName: string, id: number) {
  return ytyRequest.delete<IDataType>({
    url: `${pageName}/${id}`
  })
}
export function createPageData(pageName: string, userInfo: any) {
  return ytyRequest.post<IDataType>({
    url: `/${pageName}/`,
    data: userInfo
  })
}
export function editPageData(pageName: string, id: number, userInfo: any) {
  return ytyRequest.patch<IDataType>({
    url: `/${pageName}/${id}`,
    data: userInfo
  })
}

// 删除数据库图片的接口
export function deletePhotoData(pageName: string, goodsId: number) {
  return ytyRequest.delete<IDataType>({
    url: `/${pageName}/${goodsId}/photo`
  })
}
