import axios from 'axios'
import api from '../../api'
const state = {

}
const mutations = {

}
const actions = {
  async login (state, userInfo, rootState) {
    const loginAction = await axios({
      url: api.login,
      method: 'POST',
      data: userInfo
    })
    return loginAction
  }
}
const getters = {
}
export default {
  state,
  mutations,
  actions,
  getters
}
