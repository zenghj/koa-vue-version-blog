import Vue from 'vue'
import Router from 'vue-router'
const Articles = () => import('../components/Articles.vue')
const EditArticle = () => import('../components/EditArticle.vue')
const DraftArticles = () => import('../components/DraftArticles.vue')

Vue.use(Router)

export default new Router({
  base: '/admin',
  routes: [
    {
      path: '/',
      name: 'articles',
      component: Articles,
      alias: '/articles'
    },
    {
      path: '/editArticle',
      name: 'editArticle',
      component: EditArticle
    },
    {
      path: '/draftArticles',
      name: 'draftArticles',
      component: DraftArticles
    }
  ]
})
