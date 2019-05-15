import request from '@/utils/request'

export function getUserList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function getRoleList(query) {
  return request({
    url: '/role/list',
    method: 'get',
    params: query
  })
}

export function getPermissionList(query) {
  return request({
    url: '/permission/list',
    method: 'get',
    params: query
  })
}