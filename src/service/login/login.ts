import ytyRequest from '../index'
import type { ILoginResult } from './type'
import type { IDataType } from '../types'
import type { IAccount } from '@/types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/' // role/id/menu
}

export function accountLoginRequest(account: IAccount) {
  return ytyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function getUserInfoById(id: number) {
  return ytyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}

export function getUserMenusByRoleId(id: number) {
  return ytyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
