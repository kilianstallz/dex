import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/auth',
      component: () => import('./views/Authentication.vue')
    },
    {
      path: '/',
      component: () => import('./views/Main.vue'),
      redirect: '/space',
      children: [
        {
          path: '/space',
          component: () => import('./components/_Home.vue')
        }
      ]
    },
    {
      path: '/create',
      component: () => import('./views/Create.vue'),
      children: [
        {
          path: '/create/stack',
          component: () => import('./components/CreateStackPage.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {

// })

export default router
