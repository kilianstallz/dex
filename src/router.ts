import Vue from 'vue'
import Router from 'vue-router'

import Main from './layouts/MainLayout.vue'
import ListsPage from './views/ListsPage.vue'
import Create from './layouts/Create.vue'

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
          component: () => import('./views/SpacePage.vue')
        },
        {
          path: '/lists',
          component: ListsPage
        },
        {
          path: '/list/:id',
          component: () => import('./views/ListViewPage.vue')
        },
        {
          path: '/notes',
          component: () => import('./components/Main/Notes.vue')
        },
        {
          path: '/note/:noteId',
          component: () => import('./components/Main/NoteView.vue')
        },
        {
          path: '/stacks',
          component: () => import('./views/StacksPage.vue')
        },
        {
          path: '/stack/:id',
          component: () => import('./components/Main/StackView.vue')
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
          component: () => import('./views/CreateStackPage.vue')
        },
        {
          path: 'note',
          component: () => import('./views/CreateNotePage.vue')
        },
        {
          path: 'list',
          component: () => import('./views/CreateListPage.vue')
        },
        {
          path: '/list/:id/add',
          component: () => import('./views/ListEntryForm.vue')
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
