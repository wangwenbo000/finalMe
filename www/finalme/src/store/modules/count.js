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
    now: {
      cloud: '0',
      cond_code: '101',
      cond_txt: '实况天气状况描述',
      fl: '??',
      hum: '??',
      pcpn: '0.0',
      pres: '1013',
      tmp: '??',
      vis: '??',
      wind_deg: '355',
      wind_dir: '北风',
      wind_sc: '3',
      wind_spd: '17'
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
      commit('sWeather', weather.data.data.HeWeather6[0])
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
