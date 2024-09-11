import ytyRequest from '../../index'
import type { IDataType } from '@/service/types'

export function getPageListData(url: string, queryInfo: any) {
  return ytyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
// url => user/id
export function deletePageData(url: string) {
  return ytyRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return ytyRequest.post<IDataType>({
    url: url,
    data: newData
  })
}
export function editPageData(url: string, editData: any) {
  return ytyRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
