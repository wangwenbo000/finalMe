// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/'
import router from './router'
import zPageNav from './assets/js/vue-pagenav'
import VueCodeMirror from 'vue-codemirror'
import axios from 'axios'
import { sync } from 'vuex-router-sync'
import moment from 'moment'

sync(store, router)
Vue.http = Vue.prototype.$http = axios
Vue.moment = Vue.prototype.$moment = moment
Vue.use(zPageNav)
Vue.use(VueCodeMirror)
Vue.config.productionTip = false
// 全局拖拽
Vue.directive('drag', {
  update (el, binding, vnode, oldVnode) {
    // 一些逻辑……
    const dragEl = el.querySelector(binding.value)
    dragEl.onmousedown = e => {
      var oEvent = e || event
      var disX = oEvent.clientX - el.offsetLeft
      var disY = oEvent.clientY - el.offsetTop
      document.onmousemove = function (ev) {
        var oEvent = ev || event
        el.style.left = oEvent.clientX - disX + 'px'
        el.style.top = oEvent.clientY - disY + 'px'
        // 检测碰撞
      }
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
        el.releaseCapture && el.releaseCapture()
      }
      el.setCapture && el.setCapture()
      return false
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
