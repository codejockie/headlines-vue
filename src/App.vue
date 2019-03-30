<template>
  <v-app>
    <app-header></app-header>
    <!-- Render child views based on route path -->
    <router-view></router-view>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Header from './components/views/Header'
import Footer from './components/views/Footer'

export default {
  components: {
    appFooter: Footer,
    appHeader: Header
  }
}
</script>

<style lang="scss">
</style>
