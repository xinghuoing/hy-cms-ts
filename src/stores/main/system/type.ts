interface IUser {
  name: string
  password: string
  cellphone: string
  departmentId: number
  enable: number
  roleId: number
  createAt: string
  updateAt: string
  realname: string
  id: number
}

interface IPage {
  id: number
  name: string
  leader: null
  parentId: null
  createAt: string
  updateAt: string
}

export interface ISystemState {
  userList: IUser[]
  userTotalCount: number
  pageList: IPage[]
  pageTotalCount: number
  goodsId: number
}
