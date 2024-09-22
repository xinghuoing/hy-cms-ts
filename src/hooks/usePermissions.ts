// 获取是否有增删改查的权限

import useLoginStore from '@/stores/login/login'

function usePermisssions(permission: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore

  return !!permissions.find((item) => item.includes(permission))
}

export default usePermisssions
