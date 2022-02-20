<script setup lang="ts">
import { LockClosedIcon, UserCircleIcon } from 'heroicons-vue3/outline'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginAuthMutation } from '../generated/graphql'
import { useModalStore } from '../stores/modal'
import { useAuthStore } from '../stores/auth'
const email = ref('')
const password = ref('')

const {
  mutate: loginAuth,
  error: loginAuthError,
  onDone,
  onError,
} = useLoginAuthMutation(() => ({
  variables: {
    loginAuthInput: {
      email: email.value,
      password: password.value,
    },
  },
  update: (_, { data: loginAuth }) => {
    if (loginAuth) {
      const userId = loginAuth.loginAuth.id
      localStorage.setItem('id', userId)
      const accessToken = loginAuth?.loginAuth.accessToken
      localStorage.setItem('token', accessToken)
    }
  },
}))

const modalStore = useModalStore()
const loginModalToggle = modalStore.loginModalToggle
const loginState = computed(() => modalStore.loginModal)

const router = useRouter()
onDone(() => {
  const authStore = useAuthStore()
  authStore.checkLogin(true)
  loginModalToggle()
  router.push({ name: 'user-home' })
})

onError(() => {
  console.log(loginAuthError.value)
})
</script>
<template>
  <Transition name="modal">
    <div v-if="loginState">
      <div
        class="fixed inset-0 bg-black bg-opacity-75 overflow-y-auto h-full w-full z-40"
        @click.self="loginModalToggle"
      ></div>

      <div class="flex justify-center">
        <div class="fixed z-50 bg-white p-6 rounded-md shadow-2xl w-96">
          <div class="max-w-md w-full space-y-8 boder border-b-2 pb-5">
            <div>
              <UserCircleIcon class="mx-auto h-12 w-auto" alt="Workflow" />
              <h2
                class="mt-6 text-center text-3xl font-extrabold text-gray-900"
              >
                ログイン
              </h2>
            </div>
            <div
              v-if="loginAuthError"
              class="flex justify-center bg-red-600 rounded-lg text-white font-bold p-1"
            >
              {{ loginAuthError }}
            </div>
            <form class="mt-8 space-y-6" method="POST">
              <input type="hidden" name="remember" value="true" />
              <div class="rounded-md shadow-sm -space-y-px">
                <div>
                  <label for="email-address" class="sr-only"
                    >Email address</label
                  >
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    v-model="email"
                    autocomplete="email"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label for="password" class="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    v-model="password"
                    autocomplete="current-password"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  @click.prevent="loginAuth()"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span
                    class="absolute left-0 inset-y-0 flex items-center pl-3"
                  >
                    <LockClosedIcon
                      class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  ログイン
                </button>
              </div>
            </form>
          </div>

          <div class="text-sm text-gray-400 relative">
            <span class="bg-white px-3 absolute left-28 -top-3"
              >その他の方法</span
            >
          </div>

          <div class="flex gap-3 mt-5">
            <button
              class="basis-1/3 inline-flex items-center px-10 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <path
                  d="M28,6.937c-0.957,0.425-1.985,0.711-3.064,0.84c1.102-0.66,1.947-1.705,2.345-2.951c-1.03,0.611-2.172,1.055-3.388,1.295 c-0.973-1.037-2.359-1.685-3.893-1.685c-2.946,0-5.334,2.389-5.334,5.334c0,0.418,0.048,0.826,0.138,1.215 c-4.433-0.222-8.363-2.346-10.995-5.574C3.351,6.199,3.088,7.115,3.088,8.094c0,1.85,0.941,3.483,2.372,4.439 c-0.874-0.028-1.697-0.268-2.416-0.667c0,0.023,0,0.044,0,0.067c0,2.585,1.838,4.741,4.279,5.23 c-0.447,0.122-0.919,0.187-1.406,0.187c-0.343,0-0.678-0.034-1.003-0.095c0.679,2.119,2.649,3.662,4.983,3.705 c-1.825,1.431-4.125,2.284-6.625,2.284c-0.43,0-0.855-0.025-1.273-0.075c2.361,1.513,5.164,2.396,8.177,2.396 c9.812,0,15.176-8.128,15.176-15.177c0-0.231-0.005-0.461-0.015-0.69C26.38,8.945,27.285,8.006,28,6.937z"
                ></path>
              </svg>
            </button>

            <button
              class="basis-1/3 inline-flex items-center px-10 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M21.915,10.752L21.697,9h-4.393l2.974-2.974l-1.548-1.411C16.88,2.929,14.49,2,12,2C6.486,2,2,6.486,2,12s4.486,10,10,10 s10-4.486,10-10C22,11.61,21.973,11.214,21.915,10.752z M12,20c-4.418,0-8-3.582-8-8s3.582-8,8-8c2.076,0,3.96,0.797,5.382,2.093 l-2.134,2.134C14.372,7.473,13.247,7,12,7c-2.761,0-5,2.239-5,5s2.239,5,5,5c2.049,0,3.806-1.236,4.578-3H13v-3h6.931 C19.972,11.328,20,11.661,20,12C20,16.418,16.418,20,12,20z M11,9.171V11v3v0.829C9.836,14.416,9,13.304,9,12S9.836,9.584,11,9.171 z"
                ></path>
              </svg>
            </button>

            <button
              class="basis-1/3 inline-flex items-center px-10 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
