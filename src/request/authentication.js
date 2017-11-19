import http from './http'

const login = function (email, password) {
  return http.post('oauth/token', {
    username: email,
    password: password,
    grant_type: 'password',
    scope: '*',
    client_id: '999',
    client_secret: 'tL9Ul2APRTXKd5G3dLyvZO0W61PKGHRC5eygJqQx'
  })
}

export { login }
