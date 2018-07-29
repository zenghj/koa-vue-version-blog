import axios from 'axios'
import {Message} from 'element-ui'

export function saveAsDraft (payload) {
  return axios.post('/article', payload)
}

export function publishArticle (id, payload) {
  if (id) {
    return updateArticle(id, payload)
  } else {
    return axios.post('/article', payload)
  }
}
export function fetchDrafts () {
  return axios.get('/articles', {
    params: {
      status: 0,
      page: 1,
      limit: 10000,
    }
  })
}

export function fetchArticles () {
  return axios.get('/articles', {
    params: {
      status: 1,
      page: 1,
      limit: 10000,
    }
  })
}

export function getArticleInfo (id) {
  return axios.get(`/article/${id}`)
}

export function deleteArticle (id) {
  return axios.delete(`/article/${id}`)
}

export function updateArticle (id, payload) {
  return axios.put(`/article/${id}`, {
    ...payload
  })
}

export function getCategoryories () {
  return axios.get('/categories').catch(err => {
    Message.error(err.msg || '获取Categoryories失败')
  })
}

export function delCategoryory (name) {
  return axios.delete('/category', {
    data: {
      name,
    }
  }).catch(err => {
    Message.error(err.msg || '获取Categoryories失败')
  })
}

export function createCategory (payload) {
  return axios.post('/category', payload).catch(err => {
    Message.error(err.msg || '创建失败')
  })
}
