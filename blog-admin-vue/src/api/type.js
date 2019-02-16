import request from '@/utils/request'

export function getTypeList (params) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/type',
    method: 'get',
    params
  })
}

export function getTypeDetail (id) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/type/' + id,
    method: 'get'
  })
}

export function createType (data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/type',
    method: 'post',
    data
  })
}

export function updateType (data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/type/' + data.id,
    method: 'put',
    data
  })
}

export function activeType (data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/type/' + data.id + '/active/' + data.active,
    method: 'patch'
  })
}

