<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCreateArticleMutation } from '../generated/graphql'
import { useAuthStore } from '../stores/auth'

const userId = computed(() => localStorage.getItem('id'))
const comment = ref('')

const {
  mutate: createArticle,
  error: createArticleError,
  onDone,
  onError,
} = useCreateArticleMutation(() => ({
  variables: {
    createArticleInput: {
      userId: userId.value ? userId.value : '',
      comment: comment.value,
    },
  },
}))

const authStore = useAuthStore()
onMounted(() => {
  if (!authStore.doneProfile) router.push({ name: 'create-profile' })
})

const router = useRouter()
onDone(() => {
  router.push({ name: 'top' })
})

onError(() => {
  console.log(createArticleError.value?.graphQLErrors)
})
</script>
<template>
  <div class="p-5">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            投稿内容の編集
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form method="POST">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div>
                <label
                  for="comment"
                  class="block text-sm font-medium text-gray-700"
                >
                  コメント
                </label>
                <div class="mt-1">
                  <textarea
                    id="comment"
                    name="comment"
                    v-model="comment"
                    rows="3"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-1"
                  />
                </div>
                <p class="mt-2 text-sm text-gray-500">Post nice content.</p>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                @click.prevent="createArticle()"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
