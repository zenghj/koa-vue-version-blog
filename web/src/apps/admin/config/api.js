import axios from 'axios'

export function saveAsDraft (payload) {
  return axios.post('/article', payload)
}

export function publishArticle (payload) {
  return axios.post('/article', payload)
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
