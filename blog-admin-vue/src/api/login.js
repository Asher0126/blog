import request from '@/utils/request'

export function login (username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      name: username,
      password
    }
  })
}

export function getInfo () {
  return request({
    url: '/info',
    method: 'get'
  })
}

export function logout () {
  return request({
    url: '/logout',
    method: 'post'
  })
}
