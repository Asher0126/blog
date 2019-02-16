import request from '@/utils/request'

export function getTagList (params) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/tag',
    method: 'get',
    params
  })
}

export function getTagDetail (id) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/tag/' + id,
    method: 'get'
  })
}

export function createTag (data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/tag',
    method: 'post',
    data
  })
}

export function updateTag (data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/tag/' + data.id,
    method: 'put',
    data
  })
}

export function activeTag (data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/tag/' + data.id + '/active/' + data.active,
    method: 'patch'
  })
}

