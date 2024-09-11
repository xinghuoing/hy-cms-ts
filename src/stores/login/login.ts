import { accountLoginRequest } from '@/service/login/login'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: 0,
    token: '',
    name: ''
  }),
  actions: {
    async loginAccountAction(account: any) {
      const loginResult = await accountLoginRequest(account)
      this.id = loginResult.data.id
      this.token = loginResult.data.token
      this.name = loginResult.data.name
    }
  }
})

export default useLoginStore
