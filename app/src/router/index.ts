import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useModalStore } from '../stores/modal'

const routes = [
  {
    path: '/',
    name: 'top',
    redirect: { name: 'all-post' },
  },
  {
    path: '/all-post',
    name: 'all-post',
    component: () => import('@/views/AllPost.vue'),
  },
  {
    path: '/user-home',
    name: 'user-home',
    meta: { requiersAuth: true },
    component: () => import('@/views/UserHome.vue'),
  },
  {
    path: '/create-profile',
    name: 'create-profile',
    meta: { requiersAuth: true },
    component: () => import('@/views/CreateProfile.vue'),
  },
  {
    path: '/create-article',
    name: 'create-article',
    meta: { requiersAuth: true },
    component: () => import('@/views/CreateArticle.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'top' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active-link',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            left: savedPosition.left,
            top: savedPosition.top,
            behavior: 'smooth',
          })
        }, 700)
      })
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            top: 0,
            behavior: 'smooth',
          })
        }, 500)
      })
    }
  },
})

router.beforeEach((to) => {
  const modalStore = useModalStore()
  const authStore = useAuthStore()
  if (to.meta.requiersAuth) {
    if (!localStorage.getItem('token')) {
      modalStore.loginModalToggle()
      authStore.checkLogin(false)
      return { name: 'top' }
    } else {
      authStore.checkLogin(true)
    }
  }
})

export default router
