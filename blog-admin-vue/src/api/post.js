import request from '@/utils/request'

export function getPostList (params) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/post',
    method: 'get',
    params
  })
}

export function getPostDetail (id) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/post/' + id,
    method: 'get'
  })
}

export function createPost (data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/post',
    method: 'post',
    data
  })
}

// 文件上传
export function createUpload (data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

export function updatePost (data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/post/' + data.id,
    method: 'put',
    data
  })
}

export function activePost (data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/post/' + data.id + '/active/' + data.active,
    method: 'patch'
  })
}

