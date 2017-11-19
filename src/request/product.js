import http from './http'

const get = function (token, params) {
  return http.get('api/products', {
    params: params,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

export { get }
