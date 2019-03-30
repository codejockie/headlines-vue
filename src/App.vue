<template>
  <v-app>
    <app-header></app-header>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>John Kennedy</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- Render child views based on route path -->
    <router-view></router-view>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Header from './components/views/Header'
import Footer from './components/views/Footer'
import { EVENT_BUS } from './main'

export default {
  components: {
    appFooter: Footer,
    appHeader: Header
  },
  created() {
    EVENT_BUS.$on("drawer", () => {
      this.drawer = !this.drawer
    })
  },
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
