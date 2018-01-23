import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/register'
import RegisterTwo from '@/components/registertwo'
import DownloadApp from '@/components/downloadApp'
import SetPassword from '@/components/setPassword'
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
    },
    {
      path:'/downloadApp',
      name:'downloadApp',
      component:DownloadApp
    },
    {
      path:'/setPassword',
      name:'setPassword',
      component:SetPassword
    }
  ]
})
