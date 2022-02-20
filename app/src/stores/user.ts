import { defineStore } from 'pinia'

interface userState {
  username: string
}

export const useUserStore = defineStore('user', {
  state: (): userState => ({
    username: '',
  }),
  actions: {
    setUsername(payload: string) {
      this.username = payload
    },
  },
})
