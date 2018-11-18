import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: () => import(/* webpackChunkName: "about" */ './views/goods')
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: () => import(/* webpackChunkName: "about" */ './views/ratings')
    },
    {
      path: '/seller',
      name: 'seller',
      component: () => import(/* webpackChunkName: "about" */ './views/seller')
    }
  ]
})
