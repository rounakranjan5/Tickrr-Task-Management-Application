import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '@/views/LandingPage.vue'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import ContactPage from '@/views/ContactPage.vue'
import PageNotFound from '@/views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage
  },

  {
    path: '/taskzone',
    name: 'taskzone',
    component: HomePage
  },

  {
    path:'/about',
    name:'about',
    component:AboutPage
  },

  {
    path:'/contact',
    name:'contact',
    component:ContactPage
  },

  {
    path:'/:pathMatch(.*)*',
    name:'notfound',
    component:PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
