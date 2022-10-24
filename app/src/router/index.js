import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'User',
    component: () => import("@/layouts/UserLayout.vue"),
    children: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/AboutView.vue')
      },
      {
        path: '/qr',
        name: 'QrView',
        component:() => import('@/views/QrView.vue')
      }
    ]
  },
  {
    path: '*',
    name: "Error404",
    component: () => import('@/views/Error/404View.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
