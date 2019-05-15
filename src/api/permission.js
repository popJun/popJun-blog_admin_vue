import request from '@/utils/request'
//获取用户列表
export function getUserList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}
//获取角色列表
export function getRoleList(query) {
  return request({
    url: '/role/list',
    method: 'get',
    params: query
  })
}
//获取权限列表
export function getPermissionList(query) {
  return request({
    url: '/permission/list',
    method: 'get',
    params: query
  })
}