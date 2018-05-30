import Vue from 'vue'
import Router from 'vue-router'
import Help from '@//components/help/help'
import Home from '@/components/wrapper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    }
  ]
})
