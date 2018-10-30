import Vue from 'vue'
import Vuex from 'vuex'
// import onlineArticles from './modules/online-articles'
// import drafts from './modules/draft-articles'
// import edit from './modules/edit-article'
// import categories from './modules/categories-manage'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      name: 'julian'
    }
  },
  modules: {
  }
})

export default store

// if (module.hot) {
//   module.hot.accept(['./modules/online-articles.js'], () => {
//     const onlineArticlesMod = require('./modules/online-articles.js').default
//     store.hotUpdate({})
//   })
// }
