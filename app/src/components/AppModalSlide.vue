<script setup lang="ts">
import { XIcon } from 'heroicons-vue3/outline'
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { useModalStore } from '../stores/modal'
import { computed } from 'vue'
import { useUserStore } from '../stores/user'

const modalStore = useModalStore()
const slideModalToggle = modalStore.slideModalToggle
const slideModalState = computed(() => modalStore.slideModal)

const userStore = useUserStore()
const loggedinUser = computed(() => userStore.username)

const logout = () => {
  if (window.confirm('ログアウトします。よろしいですか？')) {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    slideModalToggle()
    window.location.reload()
  }
}
</script>

<template>
  <TransitionRoot as="template" :show="slideModalState">
    <Dialog
      as="div"
      class="fixed inset-0 overflow-hidden"
      @close="slideModalToggle"
    >
      <div class="absolute inset-0 overflow-hidden">
        <TransitionChild
          as="template"
          enter="ease-in-out duration-500"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in-out duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <div class="relative w-screen max-w-xs">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-500"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-500"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4"
                >
                  <button
                    type="button"
                    class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    @click="slideModalToggle"
                  >
                    <span class="sr-only">Close panel</span>
                    <XIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div
                class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
              >
                <div class="px-4 sm:px-6 -mt-7 py-7 bg-gray-800">
                  <DialogTitle class="text-lg font-bold text-white">
                    {{ loggedinUser }}
                  </DialogTitle>
                </div>
                <div class="mt-6 relative flex-1 px-4 sm:px-6">
                  <!-- Replace with your content -->
                  <div class="absolute inset-0 px-4 sm:px-6">
                    <ul
                      class="grid gap-y-12 text-2xl font-mono border-l border-gray-200"
                    >
                      <li>
                        <router-link
                          :to="{ name: 'user-home' }"
                          class="italic -ml-px border-l hover:border-gray-600 pl-8"
                          @click="slideModalToggle"
                        >
                          ホーム
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          :to="{ name: 'create-article' }"
                          class="italic -ml-px border-l hover:border-gray-600 pl-8"
                          @click="slideModalToggle"
                        >
                          投稿する
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          :to="{ name: 'all-post' }"
                          class="italic -ml-px border-l hover:border-gray-600 pl-8"
                          @click="slideModalToggle"
                        >
                          みんなの投稿
                        </router-link>
                      </li>
                      <li>
                        <button
                          class="italic -ml-px border-l hover:border-gray-600 pl-8"
                          @click="logout()"
                        >
                          ログアウト
                        </button>
                      </li>
                    </ul>
                  </div>
                  <!-- /End replace -->
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
