const token = 'test'
// const devUrl = 'https://www.easy-mock.com/mock/5cf4dd646c6d3b350414652c'
const devUrl = 'http://cas.client1.com:9100/'
const localhost = 'cas.client1.com'
const port = 9528
const webSwitch = false // 开启前后端分离
export function defaultToken() {
  return token
}
export function getDevUrl() {
  return devUrl
}

export function getlocalHost() {
  return localhost
}

export function getlocalPort() {
  return port
}
export function getWebSwitch() {
  return webSwitch
}
