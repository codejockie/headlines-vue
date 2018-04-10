<template>
  <v-toolbar>
    <v-toolbar-title>Top Headlines</v-toolbar-title>
    <v-container>
      <v-layout row wrap>
        <v-flex xs6>
          <v-select
            @change="setNewsSource"
            :items="newsSources"
            append-icon="fa-newspaper"
            auto-complete
            item-text="name"
            item-value="id"
            label="Select news source"
            single-line
            search-input.sync
            v-model="selectedNewsSource"
          ></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs4>
          <v-select
            @change="setLanguage"
            :items="languages"
            append-icon="fa-language"
            auto-complete
            item-text="name"
            item-value="id"
            label="Select language"
            single-line
            search-input.sync
            v-model="language"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Profile</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import getAvailableLanguages from '../helpers/languages'
import { EVENT_BUS } from '../main'

const NEWS_API_KEY = process.env.NEWS_API_KEY

export default {
  data() {
    return {
      language: 'en',
      languages: getAvailableLanguages(),
      newsSources: [],
      selectedNewsSource: '',
    };
  },
  methods: {
    fetchNewsSources() {
      this.$http.get(`https://newsapi.org/v2/sources?language=${this.language}&apiKey=${NEWS_API_KEY}`)
      .then((response) => {
        const { body: { sources } } = response
        this.newsSources = sources

        if (!this.selectedNewsSource) {
          // Set a random news source for initial page load
          const randomNewsSource = this.newsSources[
            Math.floor(Math.random() * this.newsSources.length)
          ]
          this.setNewsSource(randomNewsSource.id)
        }
      })
    },
    fetchTopHeadlines() {
      this.$http.get(`https://newsapi.org/v2/top-headlines?sources=${this.selectedNewsSource}&pageSize=12&apiKey=${NEWS_API_KEY}`)
      .then((response) => {
        const { body: { articles } } = response
        EVENT_BUS.setArticles(articles)
      })
    },
    setLanguage(language) {
      this.language = language
      this.fetchNewsSources()
    },
    setNewsSource(newsSource) {
      this.selectedNewsSource = newsSource
      this.fetchTopHeadlines()
    }
  },
  mounted() {
    this.fetchNewsSources()
  }
};
</script>

<style lang="scss" scoped>

</style>
