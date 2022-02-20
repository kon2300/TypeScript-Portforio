<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCreateProfileMutation } from '../generated/graphql'
import { useAuthStore } from '../stores/auth'

const userId = computed(() => localStorage.getItem('id'))
const name = ref('')
const age = ref('')
const selfIntroduction = ref('')

const {
  mutate: createProfile,
  error: createProfileError,
  onDone,
  onError,
} = useCreateProfileMutation(() => ({
  variables: {
    createProfileInput: {
      userId: userId.value ? userId.value : '',
      name: name.value,
      age: age.value,
      selfIntroduction: selfIntroduction.value,
    },
  },
}))

const router = useRouter()
const authStore = useAuthStore()
onDone(() => {
  authStore.checkProfile(true)
  router.push({ name: 'user-home' })
})

onError(() => {
  console.log(createProfileError.value?.graphQLErrors)
})
</script>
<template>
  <div class="p-5">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            プロフィールの編集
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            プロフィールを編集してください
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="grid grid-cols-7 gap-6">
              <div class="col-span-7 sm:col-start-1 sm:col-end-3">
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                  >名前</label
                >
                <input
                  type="text"
                  name="name"
                  id="name"
                  v-model="name"
                  class="mt-1 p-1 pl-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
              </div>

              <div class="col-span-7 sm:col-start-1 sm:col-end-1">
                <label for="age" class="block text-sm font-medium text-gray-700"
                  >年代</label
                >
                <select
                  name="age"
                  id="age"
                  v-model="age"
                  class="mt-1 block w-full p-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="ten">10代</option>
                  <option value="twenty">20代</option>
                  <option value="thirty">30代</option>
                  <option value="fourty">40代</option>
                </select>
              </div>

              <div class="col-span-7 sm:col-start-1">
                <label
                  for="self-introduction"
                  class="block text-sm font-medium text-gray-700"
                  >自己紹介</label
                >
                <textarea
                  type="textarea"
                  rows="12"
                  name="self-introduction"
                  id="self-introduction"
                  v-model="selfIntroduction"
                  class="mt-1 p-1 pl-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              @click.prevent="createProfile()"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
