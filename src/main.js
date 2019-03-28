import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'

// CSS imports
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

// Component import
import App from './App.vue'


const base = axios.create({
  baseURL: 'https://newsapi.org/v2'
})

Vue.prototype.$http = base

Vue.use(Vuetify, {
  iconfont: 'mdi'
})

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
