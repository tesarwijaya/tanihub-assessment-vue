import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Dashboard from '@/components/Dashboard'
import { getOauthInfo } from '../localStorage'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {requireAuth: true}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const oauthInfo = getOauthInfo()
    if (oauthInfo) {
      next()
    } else {
      next({ name: 'Hello' })
    }
  } else {
    next()
  }
})

export default router
