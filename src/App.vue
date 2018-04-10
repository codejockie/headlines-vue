<template>
  <v-app>
    <app-header></app-header>
    <app-news></app-news>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Header from './components/Header'
import News from './components/News'
import Footer from './components/Footer'

export default {
  components: {
    appFooter: Footer,
    appHeader: Header,
    appNews: News,
  }
}
</script>

<style lang="scss">
</style>
