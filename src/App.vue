<template>
  <v-app>
    <app-header></app-header>
    <app-news-source></app-news-source>
  </v-app>
</template>

<script>
import Header from './components/Header'
import NewsSource from './components/NewsSource'

export default {
  components: {
    appHeader: Header,
    appNewsSource: NewsSource
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
</style>
