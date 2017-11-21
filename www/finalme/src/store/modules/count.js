import axios from 'axios'
import api from '../../api'
const state = {
  count: {
    OSi: {
      arch: '??',
      cpus: [],
      freemem: 0,
      release: '0.0.0',
      totalmem: 0,
      type: 'FinalMe'
    },
    uptime: 0,
    aricleTotal: '??',
    cateTotal: '??',
    draftsTotal: 0,
    nodeV: 'v0.0.0',
    thinkV: '0.0.0'
  },
  weather: {
    city: '??',
    data: {
      ganmao: '??',
      pm10: 0,
      pm25: 0,
      quality: '??',
      shidu: '??',
      wendu: '??'
    }
  }
}
const mutations = {
  sCount (state, data) {
    state.count = data
  },
  sWeather (state, data) {
    state.weather = data
  }
}
const actions = {
  async getCount ({commit}) {
    const count = await axios({
      url: api.getCount,
      method: 'post'
    })
    setTimeout(() => {
      commit('sCount', count.data.data)
    }, 300)
  },
  async getWeather ({commit}) {
    const weather = await axios({
      url: api.getWeather,
      method: 'post'
    })
    setTimeout(() => {
      commit('sWeather', weather.data.data)
    }, 300)
  },
  async delCache () {
    await axios({
      url: api.delCache,
      method: 'POST'
    })
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
