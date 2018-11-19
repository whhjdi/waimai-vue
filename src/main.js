import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import 'normalize.css'
import './assets/css/reset.css'
import './assets/css/border-1px.css'
Vue.config.productionTip = false
FastClick.attach(document.body)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')