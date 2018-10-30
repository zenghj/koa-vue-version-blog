import {Message} from 'element-ui'
import {getCategoryories, delCategoryory, createCategory} from '../../config/api.js'
import {SET_CATEGORYLIST, ADD_CATEGORY, DELETE_CATEGORY} from '../mutationTypes'
import {FETCH_CATEGORY_LIST, ACT_DELETE_CATEGORY, ACT_CREATE_CATEGORY} from '../actionTypes'
const state = {
  categoryList: [],
}
const mutations = {
  [SET_CATEGORYLIST]: (state, list) => {
    list && (state.categoryList = list)
  },
  [ADD_CATEGORY]: (state, newItem) => {
    state.categoryList.push(newItem)
  },
  [DELETE_CATEGORY]: (state, id) => {
    const categoryList = state.categoryList
    const idx = categoryList.findIndex(item => item._id === id)
    if (idx > -1) {
      categoryList.splice(idx, 1)
    }
  }
}
const actions = {
  [FETCH_CATEGORY_LIST]: async ({commit}) => {
    const {data} = await getCategoryories()
    if (data.state === 1) {
      commit(SET_CATEGORYLIST, data.result.list)
    } else {
      Message.error(data.msg || '获取Categoryories失败')
    }
  },
  [ACT_CREATE_CATEGORY]: async ({commit}, payload) => {
    const {data} = await createCategory(payload)
    if (data.state === 1) {
      Message.success('创建成功')
      commit(ADD_CATEGORY, data.result.doc)
    } else {
      Message.error('创建失败')
    }
  },
  [ACT_DELETE_CATEGORY]: async ({commit}, item) => {
    const {data} = await delCategoryory(item)
    if (data.state === 1) {
      commit(DELETE_CATEGORY, item._id)
    } else {
      Message.error(data.msg || '删除失败')
    }
  }
}

export const MODULE_NAME = 'CATEGORY_MANAGE'
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
