import Vue from 'vue'
import VueLocalStorage from 'vue-ls'

const options = {
  namespace: 'tanihubAssesmentApps__'
}

Vue.use(VueLocalStorage, options)

const setOauthInfo = function (data) {
  Vue.ls.set('oauth', data)
}

const getOauthInfo = function () {
  return Vue.ls.get('oauth', false)
}

const removeOauthInfo = function (data) {
  Vue.ls.remove('oauth')
}

export { setOauthInfo, getOauthInfo, removeOauthInfo }
