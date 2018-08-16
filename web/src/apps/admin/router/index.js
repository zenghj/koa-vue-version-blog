import Vue from 'vue'
import Router from 'vue-router'
const Articles = () => import('../components/Articles.vue')
const EditArticle = () => import('../components/EditArticle.vue')
const DraftArticles = () => import('../components/DraftArticles.vue')
const CategoryManage = () => import('../components/CategoryManage.vue')
const Analysis = () => import('../components/Analysis.vue')

// import Articles from '../components/Articles.vue'
// import EditArticle from '../components/EditArticle.vue'
// import DraftArticles from '../components/DraftArticles.vue'
// import CategoryManage from '../components/CategoryManage.vue'

Vue.use(Router)

export default new Router({
  base: '/blog/admin',
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
      component: EditArticle,
      props: (route) => ({
        query: route.query
      })
    },
    {
      path: '/draftArticles',
      name: 'draftArticles',
      component: DraftArticles
    }, {
      path: '/CategoryManage',
      name: 'CategoryManage',
      component: CategoryManage,
    }, {
      path: '/Analysis',
      name: 'Analysis',
      component: Analysis,
    }
  ]
})
