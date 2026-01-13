import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import BoardsListView from '@/views/BoardsListView.vue'
import BoardEditorView from '@/views/BoardEditorView.vue'

const routes = [
  { path: '/login', component: LoginView },
  { path: '/', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/boards', component: BoardsListView },
  { path: '/board/:hash', component: BoardEditorView, props: true }
]

export default createRouter({
  history: createWebHistory(),
  routes
})