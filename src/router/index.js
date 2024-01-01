import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('../views/InfoView.vue') 
    },
    {
      path: '/calculate',
      name: 'calculate',
      component: () => import('../views/calculateView.vue')
    },
    {
      path: '/ItemList',
      name: 'ItemList',
      component: () => import('../views/ItemListView.vue')
    }
  ]  
})

export default router
