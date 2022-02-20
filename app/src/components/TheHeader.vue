<script setup lang="ts">
import { MenuIcon, LoginIcon, UserAddIcon } from 'heroicons-vue3/outline'
import { Menu } from '@headlessui/vue'
import { useModalStore } from '../stores/modal'
import { computed, onUpdated } from 'vue'
import { useAuthStore } from '../stores/auth'

const modalStore = useModalStore()
const signupModalToggle = modalStore.signupModalToggle
const loginModalToggle = modalStore.loginModalToggle
const slideModalToggle = modalStore.slideModalToggle

const authStore = useAuthStore()
const login = computed(() => authStore.loggedin)
onUpdated(() => {
  login.value
})
</script>

<template>
  <template v-if="!login">
    <div class="bg-gray-800 p-4 flex items-center justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-5xl font-bold leading-7 text-white">TOP</h2>
      </div>
      <div class="gap-x-5 flex mt-0 ml-4">
        <span>
          <button
            type="button"
            @click="loginModalToggle"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <LoginIcon
              class="-ml-1 mr-2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            ログイン
          </button>
        </span>

        <span>
          <button
            type="button"
            @click="signupModalToggle"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <UserAddIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            新規登録
          </button>
        </span>
      </div>
    </div>
  </template>

  <template v-if="login">
    <div class="bg-gray-800 p-4 flex items-center justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-5xl font-bold leading-7 text-white">TOP</h2>
      </div>
      <div class="flex mt-0 ml-4">
        <Menu as="span" class="ml-3 relative">
          <span class="sm:ml-3">
            <button
              @click="slideModalToggle"
              type="button"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-white hover:bg-white hover:text-gray-700"
            >
              <MenuIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </span>
        </Menu>
      </div>
    </div>
  </template>
</template>
