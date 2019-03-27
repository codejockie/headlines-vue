import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'

import App from './App.vue'

import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(Vuetify, {
  iconfont: 'mdi'
})
Vue.use(VueResource)

Vue.mixin({
  methods: {
    isMobile() {
      const regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i
      return regex.test(navigator.userAgent || navigator.vendor || window.opera)
    },
    isTouchscreen() {
      return 'ontouchstart' in document.documentElement
    }
  }
})

export const EVENT_BUS = new Vue({
  methods: {
    setArticles(articles) {
      this.$emit('articlesSet', articles)
    },
    setHeadlinesFetchError(error) {
      this.$emit('errorFetchingHeadlines', error)
    },
    setSourcesFetchError(error) {
      this.$emit('errorFetchingSources', error)
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
