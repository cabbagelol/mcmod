import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
import classdiscuss from '@/page/classdiscuss'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/class',
      name: 'class',
      component: classdiscuss
    }
  ]
})
