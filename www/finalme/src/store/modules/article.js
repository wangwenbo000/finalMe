import axios from 'axios'
import api from '../../api'
const state = {

}
const mutations = {

}
const actions = {
  async transRouteName ({commit}, key) {
    const trans = await axios({
      url: api.tranRoute,
      method: 'POST',
      data: {
        key: key
      }
    })
    return trans.data.data
  },
  // async getCateList ({commit}, key) {
  //   const list = await axios({
  //     url: api.getCate,
  //     method: 'POST'
  //   })
  //   return list.data.data
  // },
  async postArticle ({commit}, data) {
    await axios({
      url: api.postArticle,
      method: 'POST',
      data: data
    })
  },
  async editArticle ({commit}, id) {
    const data = await axios({
      url: api.updateArticle,
      method: 'POST',
      data: {
        id: id
      }
    })
    return data.data.data
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
