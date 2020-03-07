import Vue from 'vue'
import Router from 'vue-router'
import DomoTerminal from '@/views/DomoTerminal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'domo-home',
      component: DomoTerminal
    },
    {
      path: '/new-terminal',
      name: 'new-terminal',
      component: () => import('@/views/NewTerminal')
    },
    {
      path: '/password',
      name: 'general-password',
      component: () => import('@/views/GeneralPassword')
    }
  ]
})
