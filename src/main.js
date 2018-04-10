import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'

import App from './App.vue'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(VueResource)

export const EVENT_BUS = new Vue({
  methods: {
    setArticles(articles) {
      this.$emit('articlesSet', articles)
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
