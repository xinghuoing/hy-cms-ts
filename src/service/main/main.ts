import ytyRequest from '../index'
import type { IDataType } from '@/service/types'

// 请求所有的角色和部门数据
export function getEntireRoles() {
  return ytyRequest.post<IDataType>({
    url: 'role/list'
  })
}

export function getEntireDepartments() {
  return ytyRequest.post<IDataType>({
    url: 'department/list'
  })
}

export function getEntireMenus() {
  return ytyRequest.post<IDataType>({
    url: 'menu/list'
  })
}
export function getEntireCategory() {
  return ytyRequest.post<IDataType>({
    url: 'category/list'
  })
}
