import { defineStore } from 'pinia'

interface authState {
  login: boolean
  profile: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): authState => ({
    login: false,
    profile: false,
  }),
  getters: {
    loggedin: (state) => state.login,
    doneProfile: (state) => state.profile,
  },
  actions: {
    checkLogin(payload: boolean) {
      this.login = payload
    },
    checkProfile(payload: boolean) {
      this.profile = payload
    },
  },
})
