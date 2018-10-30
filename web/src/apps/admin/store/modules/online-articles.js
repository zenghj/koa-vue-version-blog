import {SET_ARTICLES} from '../mutationTypes'
import {FETCH_ONLINE_ARTICLES, DELETE_ONLINE_ARTICLE} from '../actionTypes'
import {Message} from 'element-ui'
import {fetchArticles, deleteArticle} from '../../config/api'

const state = {
  articles: []
}

const mutations = {
  [SET_ARTICLES]: (state, payload) => {
    payload && (state.articles = payload)
  },
}

const actions = {
  [FETCH_ONLINE_ARTICLES]: async ({commit}) => {
    let {data} = await fetchArticles()
    if (data.state === 1) {
      commit(SET_ARTICLES, data.result.docs)
    } else {
      Message.error(data.msg || '获取列表失败')
    }
  },
  [DELETE_ONLINE_ARTICLE]: async ({commit, state}, id) => {
    let {data} = await deleteArticle(id)
    if (data.state === 1) {
      commit(SET_ARTICLES, state.articles.filter(item => item._id !== id))
      Message.success('删除成功')
    } else {
      Message.error(data.msg || '删除失败')
    }
  }
}
export const moduleName = 'ONLINE_ARTICLES'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  moduleName,
}
