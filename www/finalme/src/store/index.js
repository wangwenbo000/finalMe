import Vue from 'vue'
import Vuex from 'vuex'

import Toggle from './modules/toggle'
import Login from './modules/login'
import List from './modules/list'
import Count from './modules/Count'
import Article from './modules/article'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Toggle,
    Login,
    List,
    Count,
    Article
  },
  strict: debug
})
