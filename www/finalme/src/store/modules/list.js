import axios from 'axios'
import api from '../../api'
const state = {
  list: [],
  search: []
}
const mutations = {
  sList (state, data) {
    state.list = data
  },
  sSearch (state, data) {
    state.search = data
  },
  delItem (state, id) {
    const list = state.list.data.filter(item => {
      console.log(item)
      return item.id !== id
    })
    state.list.data = list
  },
  changePushState (state, index) {
    state.list.data[index].sync = 1
  }
}
const actions = {
  async getList ({commit, rootState}) {
    let filter = ''
    switch (rootState.route.query.filter) {
      case 'list':
        filter = [0, 1, 2, 3]
        break
      case 'article':
        filter = 3
        break
      case 'drafs':
        filter = 2
        break
      case 'page':
        filter = 1
        break
      default:
        filter = [0, 1, 2, 3]
    }
    const list = await axios({
      url: api.get,
      method: 'POST',
      data: {
        page: rootState.route.query.page || 1,
        filter: filter
      }
    })
    commit('sList', list.data.data)
  },
  async search ({commit}, keyWords) {
    const search = await axios({
      url: api.search,
      method: 'POST',
      data: {
        key: keyWords
      }
    })
    commit('sSearch', search.data.data)
  },
  async delitem ({commit}, id) {
    await axios({
      url: api.del,
      method: 'POST',
      data: {
        id: id
      }
    })
    commit('delItem', id)
  },
  async pushBd ({commit}, o) {
    const res = await axios({
      url: api.pushUrlForBd,
      method: 'POST',
      data: o
    }).catch(res => {
      console.log(res)
    })
    return res
  },
  async delBdLink ({commit}, o) {

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
