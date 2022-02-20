<script setup lang="ts">
import { useResult } from '@vue/apollo-composable'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFindOneUserQuery } from '../generated/graphql'
import { useAuthStore } from '../stores/auth'
import { useUserStore } from '../stores/user'

const userId = computed(() => localStorage.getItem('id'))
const { result, loading, onResult, refetch } = useFindOneUserQuery({
  findOneUserId: userId.value,
})

const user = useResult(result, null, (data) => data.findOneUser)

const router = useRouter()
const authStore = useAuthStore()
onResult(() => {
  if (user.value?.profile === null) {
    authStore.checkProfile(false)
    router.push({ name: 'create-profile' })
  } else {
    authStore.checkProfile(true)
  }
})

const userStore = useUserStore()
onMounted(async () => {
  await refetch()
  if (user.value?.profile === null) {
    router.push({ name: 'create-profile' })
  } else {
    authStore.checkProfile(true)
    userStore.setUsername(
      user.value?.profile.name ? user.value.profile.name : ''
    )
  }
})
</script>

<template>
  <div class="flex flex-col">
    <div v-if="loading">Loading...</div>
    <div>
      <p class="font-black">
        投稿件数は <span>{{ user?.articles.length }} </span>件です
      </p>
    </div>
  </div>
</template>
