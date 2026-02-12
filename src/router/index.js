import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/home/index.vue'
import Settings from '/src/views/settings/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
  ],
})

export default router
