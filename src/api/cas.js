import request from '@/utils/request'
export function getCasList(query) {
  return request({
    url: '/cas/getAll',
    method: 'get',
    params: query
  })
}

export function addCasClient(query) {
  return request({
    url: '/cas/add',
    method: 'post',
    params: query
  })
}

