import Vue from 'vue'
import Router from 'vue-router'

import Main from './views/Main.vue'
import Home from './components/Main/_Home.vue'
import Create from './views/Create.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth',
      component: () => import('./views/Authentication.vue')
    },
    {
      path: '/space',
      component: Main,
      children: [
        {
          path: '/space',
          component: Home
        }
      ]
    },
    {
      path: '/stack',
      component: Main,
      children: [
        {
          path: ':id',
          component: () => import('./components/Main/_ViewStackPage.vue')
        }
      ]
    },
    {
      path: '/create',
      redirect: '/create/stack',
      component: Create,
      children: [
        {
          path: 'stack',
          component: () => import('./components/_CreateStackPage.vue')
        },
        {
          path: 'note',
          component: () => import('./components/_CreateNotePage.vue')
        }
      ]
    },
    {
      path: '*',
      redirect: '/space'
    }
  ]
})

export default router
