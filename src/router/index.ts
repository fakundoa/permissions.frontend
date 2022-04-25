import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import List from '../views/permissions/List.vue'
import Form from '../views/permissions/Form.vue'

const routes: Array<RouteRecordRaw> = [

  {
    path: '/List',
    name: 'List',
    component: List
  },
  {
    path: '/Form',
    name: 'Form',
    component: Form
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
