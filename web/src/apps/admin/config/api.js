import axios from 'axios'

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
