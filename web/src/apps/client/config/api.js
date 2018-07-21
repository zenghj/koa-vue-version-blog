import axios from 'axios'
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
