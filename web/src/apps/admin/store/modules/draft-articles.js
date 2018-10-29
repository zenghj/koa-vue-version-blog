import {Message} from 'element-ui'
import {SET_DRAFTS, UPDATE_DRAFT} from '../mutationTypes'
import {FETCH_DRAFTS, DELETE_DRAFT, PUBLISH_DRAFT_TO_ONLINE} from '../actionTypes'
import {fetchDrafts, deleteArticle, updateArticle} from '../../config/api'
import {ARTICLE_STATUS_MAP} from '../../../../assets/js/constants'

const state = {
  drafts: []
}
const mutations = {
  [SET_DRAFTS]: (state, list) => {
    list && (state.drafts = list)
  },
  [UPDATE_DRAFT]: (state, payload) => {
    const drafts = state.drafts
    const id = payload.id
    // const update = (delete payload.id && payload) || {}
    // let oldItem
    if (id) {
      const idx = drafts.findIndex(item => {
        return item._id === id
      })
      if (idx > -1) {
        // oldItem = drafts[idx]
        // drafts.splice(idx, 1, Object.assign(oldItem, update))
        drafts.splice(idx, 1)
      }
    }
  },
}
const actions = {
  [FETCH_DRAFTS]: async ({commit}) => {
    const {data} = await fetchDrafts()
    if (data.state === 1) {
      commit(SET_DRAFTS, data.result.docs || [])
    } else {
      Message.error(data.msg || '获取列表失败')
    }
  },
  [DELETE_DRAFT]: async ({commit, state}, id) => {
    const {data} = await deleteArticle(id)
    if (data.state === 1) {
      commit(SET_DRAFTS, state.drafts.filter(item => item._id !== id))
      Message.success('删除成功')
    } else {
      Message.error(data.msg || '删除失败')
    }
  },
  [PUBLISH_DRAFT_TO_ONLINE]: async ({commit, state}, id) => {
    const {data} = await updateArticle(id, {
      status: ARTICLE_STATUS_MAP.online,
    })

    if (data.state === 1) {
      commit(UPDATE_DRAFT, {
        id,
        status: ARTICLE_STATUS_MAP.online,
      })
      Message.success('发布成功')
    } else {
      Message.error('发布失败')
    }
  }
}

export const moduleName = 'DRAFT_ARTICLES'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  moduleName: moduleName,
}
