<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import AppModalSignup from '@/components/AppModalSignup.vue'
import AppModalLogin from '@/components/AppModalLogin.vue'
import AppModalSlide from '@/components/AppModalSlide.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<template>
  <TheHeader />

  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <AppModalSignup class="absolute inset-28" />
  <AppModalLogin class="absolute inset-28" />
  <AppModalSlide />

  <TheFooter />
</template>
<style lang="postcss">
.route-enter-from {
  @apply opacity-0 transform translate-y-6;
}
.route-enter-active,
.route-leave-active {
  @apply transition duration-700;
}
.route-leave-to {
  @apply opacity-0  transform -translate-x-6;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;
}
.modal-enter-active,
.modal-leave-active {
  @apply transition duration-500;
}
</style>
