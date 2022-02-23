import Vue from 'vue'
import Router from 'vue-router'
import BGNews from '@/components/BGNews'
import Dashboard from '@/components/Dashboard'
import NewArticle from '@/components/NewArticle'
import EditArticle from '@/components/EditArticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BGNews',
      component: BGNews
    },
    {
      path: '/edit/:article_id',
      name: 'dashboard',
      component: EditArticle
    },
    {
      path: '/new',
      name: 'NewArticle',
      component: NewArticle
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
  ]
})
