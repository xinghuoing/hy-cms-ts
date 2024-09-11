import ytyRequest from '../index'
import type { IAccount, ILoginResult } from './type'
import type { IDataType } from '../types'

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

export function requestUserInfoById(id: number) {
  return ytyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}

export function requestUserMenusByRoleId(id: number) {
  return ytyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
