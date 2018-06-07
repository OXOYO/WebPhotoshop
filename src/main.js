// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueResource)
/* eslint-disable no-new */

// 定义全局过滤器
// number过滤非数字输入
Vue.filter('number', function (value) {
  return value.replace(/\D/g, '')
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
