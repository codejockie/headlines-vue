<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 class="loading" v-if="isLoading">
        <v-progress-circular indeterminate :size="70" color="info"></v-progress-circular>
      </v-flex>
      <v-flex :xs3="!isMobile()" v-else v-for="(article, index) in articles" :key="index">
        <v-hover>
          <app-news-card :article="article"></app-news-card>
        </v-hover>
      </v-flex>
    </v-layout>
    <v-snackbar
      :timeout="timeout"
      bottom="bottom"
      v-model="snackbar"
    >
      {{ text }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { EVENT_BUS } from '../main'
import NewsCard from './NewsCard'

export default {
  components: {
    appNewsCard: NewsCard
  },
  created() {
    EVENT_BUS.$on('articlesSet', (articles) => {
      this.articles = articles
      this.isLoading = false
    })
    EVENT_BUS.$on('errorFetchingHeadlines', () => {
      this.text = 'Error occurred while fetching headlines'
      this.error = error
    })
  },
  data() {
    return {
      articles: [],
      error: null,
      isLoading: true,
      snackbar: false,
      text: '',
      timeout: 6000,
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading {
    position: fixed;
    height: 2em;
    width: 2em;
    overflow: show;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  div.container.grid-list-md {
    margin-top: 70px;
    margin-bottom: 50px;
  }
</style>
