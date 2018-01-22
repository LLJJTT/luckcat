import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/register'
import RegisterTwo from '@/components/registertwo'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/register'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path:'/registertwo',
      name:'registertwo',
      component:RegisterTwo
    }
  ]
})
