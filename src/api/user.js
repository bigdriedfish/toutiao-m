import request from '@/utils/request'
/*
* 用户登录api
*/
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: ' /v1_0/sms/codes/:mobile'
  })
}
