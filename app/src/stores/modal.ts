import { defineStore } from 'pinia'

interface modalState {
  signupModal: boolean
  loginModal: boolean
  slideModal: boolean
}

export const useModalStore = defineStore('modal', {
  state: (): modalState => ({
    signupModal: false,
    loginModal: false,
    slideModal: false,
  }),
  actions: {
    signupModalToggle() {
      this.signupModal = !this.signupModal
    },
    loginModalToggle() {
      this.loginModal = !this.loginModal
    },
    slideModalToggle() {
      this.slideModal = !this.slideModal
    },
  },
})
