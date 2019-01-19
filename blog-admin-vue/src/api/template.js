import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: process.env.VUE_APP_MOCK_API + '/admin',
    method: 'get',
    params
  })
}

export function getArticleDetail(params) {
  return request({
    url: process.env.VUE_APP_MOCK_API + '/admin',
    method: 'get',
    params
  })
}

export function createArticle(params) {
  return request({
    url: process.env.VUE_APP_MOCK_API + '/admin',
    method: 'get',
    params
  })
}

export function updateArticle(params) {
  return request({
    url: process.env.VUE_APP_MOCK_API + '/admin',
    method: 'get',
    params
  })
}

export function fetchPv(params) {
  return request({
    url: process.env.VUE_APP_MOCK_URL + '/admin',
    method: 'get',
    params
  })
}
