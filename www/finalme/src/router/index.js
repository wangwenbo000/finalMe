import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Admin/Index'
import DashBoard from '@/components/Admin/DashBoard'
import Article from '@/components/Admin/Article'
import NotFound from '@/components/Admin/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/admin',
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
