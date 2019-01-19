import request from '@/utils/request'

export function getManagerList (params) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/manager',
    method: 'get',
    params
  })
}

export function getManagerDetail (id) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/manager/' + id,
    method: 'get'
  })
}

export function createManager (data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/manager',
    method: 'post',
    data
  })
}

export function updateManager (data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/manager/' + data.id,
    method: 'put',
    data
  })
}

export function activeManager (data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/manager/' + data.id + '/active/' + data.active,
    method: 'patch'
  })
}

