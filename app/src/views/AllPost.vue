<script setup lang="ts">
import { useResult } from '@vue/apollo-composable'
import { onMounted } from 'vue-demi'
import { useFindAllArticleQuery } from '../generated/graphql'

const { result, loading, refetch } = useFindAllArticleQuery()

onMounted(() => {
  refetch()
})

const articles = useResult(result, null, (data) => data.findAllArticle)
</script>
<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <section class="px-4 py-5 sm:px-6">
      <h3
        class="flex justify-center text-lg leading-6 font-medium text-gray-900"
      >
        すべての投稿
      </h3>
      <div v-if="loading">Loading...</div>
      <div v-for="article of articles" :key="article.id">
        <div class="w-2/3 m-auto border border-gray-200 my-4">
          <div class="bg-gray-50 px-4 py-5">
            <div class="text-sm font-medium text-gray-500">
              {{ article.users.profile.name }}
            </div>
            <div class="text-sm font-medium text-gray-500">
              {{ article.users.profile.age }}
            </div>
            <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              投稿日時
            </div>
            <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ article.updatedAt }}
            </div>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <div class="text-sm font-medium text-gray-500">投稿内容</div>
            <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ article.comment }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
