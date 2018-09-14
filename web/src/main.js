// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Cordova from 'vue-cordova'
import axios from 'axios'
import Mint from 'mint-ui'
import vuex from 'vuex'
import App from './App'
import router from './router'
import component from './components/_index'
import api from './api/_api'

import 'mint-ui/lib/style.css'
import './public/css/style.css'

Vue.use(vuex)
Vue.use(Cordova)
Vue.use(Mint)
Vue.use(component)

Vue.prototype.$mint = Mint
Vue.prototype.$http = axios
Vue.prototype.$api = api
Vue.config.productionTip = false

// 初始化
Vue.cordova.on('deviceready', () => {
  // 状态重叠
  // eslint-disable-next-line no-undef
  StatusBar.styleLightContent()
  // eslint-disable-next-line no-undef
  StatusBar.overlaysWebView(true)

  setTimeout(function () {
    navigator.splashscreen.hide()
  }, 1000)
})

var store = new vuex.Store({ // store对象
  state: {
    states: 'turn-on'
  },
  mutations: {
    setTransition (state, states) {
      state.states = states
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
