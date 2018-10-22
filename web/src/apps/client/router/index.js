import Vue from 'vue'
import Router from 'vue-router'
const Article = () => import('../components/Article.vue')
const Articles = () => import('../components/Articles.vue')
const ClientNotFount = () => import('../components/ClientNotFount.vue')
Vue.use(Router)

export default new Router({
  base: '/blog/client',
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'notFound',
      component: ClientNotFount,
    },
    {
      path: '/',
      name: 'articles',
      component: Articles,
      alias: '/articles'
    },
    {
      path: '/articles/:id',
      name: 'article',
      component: Article,
      props: true,
    }
  ]
})
