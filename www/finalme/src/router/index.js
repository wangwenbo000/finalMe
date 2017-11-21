import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Admin/Index'
import DashBoard from '@/components/Admin/DashBoard'
import Article from '@/components/Admin/Article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/Article',
          name: 'Article',
          component: Article
        },
        {
          path: '/DashBoard',
          name: 'DashBoard',
          component: DashBoard
        }
      ]
    }
  ]
})
