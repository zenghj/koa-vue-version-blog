import Vue from 'vue'
import Router from 'vue-router'
const Article = () => import('../components/Article.vue')
const Articles = () => import('../components/Articles.vue')

Vue.use(Router)

export default new Router({
  base: '/client',
  routes: [
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
