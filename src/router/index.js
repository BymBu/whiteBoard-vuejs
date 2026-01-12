import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/login', component: () => import('@/views/LoginView.vue') },
  { path: '/register', component: () => import('@/views/RegisterView.vue') },
  { 
    path: '/boards', 
    component: () => import('@/views/BoardsListView.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/board/:hash', 
    component: () => import('@/views/BoardEditorView.vue'),
    props: true
  },
  { path: '/', redirect: '/boards' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.token) {
    return '/login'
  }
})

export default router