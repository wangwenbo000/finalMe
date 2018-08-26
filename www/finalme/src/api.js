import { apiBaseUrl } from './config'
import axios from 'axios'
import router from './router/index'
// axios配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// axios request拦截器
axios.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})
// axios response拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        router.replace({
          name: 'Login',
          query: {
            redirect: router.currentRoute.fullPath,
            err: error.response.statusText
          }
        })
        localStorage.auth = false
        localStorage.login = null
    }
  }
  return Promise.reject(error.response.data)
})
const api = {
  login: `${apiBaseUrl}login/login`,
  get: `${apiBaseUrl}list/get`,
  getCount: `${apiBaseUrl}list/getCount`,
  getWeather: `${apiBaseUrl}list/getWeather`,
  search: `${apiBaseUrl}list/search`,
  delCache: `${apiBaseUrl}list/delCache`,
  del: `${apiBaseUrl}list/del`,
  tranRoute: `${apiBaseUrl}article/tranRoute`,
  getCate: `${apiBaseUrl}category/getCate`,
  addCate: `${apiBaseUrl}category/addCate`,
  updateCate: `${apiBaseUrl}category/updateCate`,
  delCate: `${apiBaseUrl}category/delCate`,
  postArticle: `${apiBaseUrl}article/postArticle`,
  updateArticle: `${apiBaseUrl}article/updateArticle`
}
export default api
