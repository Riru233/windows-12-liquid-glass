import { createRouter, createWebHistory } from 'vue-router'

// 1. 获取 views 下所有的 .vue 文件
const modules = import.meta.glob('/src/views/**/*.vue')

const routes = Object.keys(modules).map((filePath) => {
  // 移除前缀和后缀，例如: /src/views/pageexample/sub1.vue -> pageexample/sub1
  let path = filePath
    .replace('/src/views/', '')
    .replace('.vue', '')
    .replace('/index', ''); // 如果是 index.vue，则路径到文件夹名为止

  // 确保根路径正确 (例如 home 变 /home，如果是 index 变 /)
  const routePath = path === 'home' ? '/' : `/${path}`;

  return {
    path: routePath,
    // 将路径中的 / 替换为 - 作为 name (例如 pageexample-sub1)
    name: path.replace(/\//g, '-') || 'index',
    component: modules[filePath]
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router