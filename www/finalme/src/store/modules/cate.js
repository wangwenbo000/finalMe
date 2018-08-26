import axios from 'axios'
import api from '../../api'
const state = {
  list: []
}
const mutations = {
  setCateList (state, data) {
    state.list = data
  },
  pushCateList (state, data) {
    state.list.unshift(data)
  },
  updateCateList (state, data) {
    const index = state.list.findIndex(item => {
      return item.id === data.id
    })
    state.list[index].name = data.name
    state.list[index].describe = data.describe
  },
  delCateItem (state, data) {
    state.list = state.list.filter(item => {
      return item.id !== data
    })
  }
}
const actions = {
  async addCate ({commit}, key) {
    const update = await axios({
      url: api.addCate,
      method: 'POST',
      data: {
        name: key.name,
        describe: key.describe
      }
    })
    key.id = update.data.data
    commit('pushCateList', key)
  },
  async getCateList ({commit}, key) {
    const list = await axios({
      url: api.getCate,
      method: 'POST'
    })
    commit('setCateList', list.data.data)
  },
  async updateCate ({commit}, key) {
    await axios({
      url: api.updateCate,
      method: 'POST',
      data: {
        id: key.id,
        name: key.name,
        describe: key.describe
      }
    })
    commit('updateCateList', key)
  },
  async delCate ({commit}, key) {
    await axios({
      url: api.delCate,
      method: 'POST',
      data: {
        id: key
      }
    })
    commit('delCateItem', key)
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
