import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

// Component import
import App from './App.vue'

// Other imports
import { routes } from './routes'

// CSS imports
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'


const { NEWS_API_KEY } = process.env;
// Set $http to axios instance
Vue.prototype.$http = axios.create({
  baseURL: 'https://newsapi.org/v2',
  params: {
    apiKey: NEWS_API_KEY
  }
})

// Register vue-router
Vue.use(VueRouter)
// Register vuetify
Vue.use(Vuetify, {
  iconfont: 'mdi'
})

// Vue Mixins
Vue.mixin({
  methods: {
    isMobileDevice() {
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
    },
    toggleDrawer() {
      this.$emit('drawer')
    }
  }
})

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  data() {
    return {
      windowHeight: 0,
      windowWidth: 0
    }
  },
  methods: {
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth
    },
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.getWindowHeight)
      window.addEventListener('resize', this.getWindowWidth)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowHeight)
    window.removeEventListener('resize', this.getWindowWidth)
  }
})
