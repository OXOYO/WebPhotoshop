import Vue from 'vue'
import Router from 'vue-router'
import About from '@//components/help/about'
import Help from '@//components/help/help'
import Home from '@/components/wrapper'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    }
  ]
})
