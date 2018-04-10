<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 class="loading" v-if="isLoading">
        <v-progress-circular indeterminate :size="70" color="info"></v-progress-circular>
      </v-flex>
      <v-flex xs3 v-else v-for="(article, index) in articles" :key="index">
        <app-news-card :article="article"></app-news-card>
      </v-flex>
    </v-layout>
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
  },
  data() {
    return {
      articles: [],
      isLoading: true,
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
