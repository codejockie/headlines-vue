<template>
  <v-toolbar color="pink" dark fixed>
    <v-toolbar-side-icon @click="toggle()"></v-toolbar-side-icon>
    <v-toolbar-title v-if="!isMobileDevice()">Top Headlines</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-layout row wrap>
      <v-flex xs7>
        <v-select
          @change="setNewsSource"
          :items="newsSources"
          :append-icon="icon('fa-newspaper')"
          auto-complete
          item-text="name"
          item-value="id"
          label="Select news source"
          single-line
          search-input.sync
          v-model="newsSource"
        ></v-select>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs4>
        <v-select
          @change="setLanguage"
          :items="languages"
          :append-icon="icon('fa-language')"
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
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!isMobileDevice()">
      <v-icon class="profile" large>mdi-account-circle</v-icon>
    </v-toolbar-items>
    <v-snackbar :timeout="timeout" bottom="bottom" v-model="snackbar">
      {{ text }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-toolbar>
</template>

<script>
import { getLanguages } from "../../helpers/languages"
import { EVENT_BUS } from "../../main"

export default {
  created() {
    EVENT_BUS.$on("errorFetchingSources", () => {
      this.text = "Error occurred while fetching news sources"
      this.error = error
    });
  },
  data() {
    return {
      error: null,
      language: "en",
      languages: getLanguages(),
      newsSources: [],
      newsSource: "",
      snackbar: false,
      text: "",
      timeout: 6000
    }
  },
  methods: {
    fetchNewsSources() {
      this.$http
        .get(`sources?language=${this.language}`)
        .then(({ data }) => {
            const { sources } = data
            this.newsSources = sources

            if (!this.newsSource) {
              // Set a random news source for initial page load
              const randomNewsSource = this.newsSources[
                Math.floor(Math.random() * this.newsSources.length)
              ]
              this.setNewsSource(randomNewsSource.id)
            }
          },
          error => EVENT_BUS.setSourcesFetchError(error)
        )
    },
    fetchTopHeadlines() {
      this.$http
        .get(`top-headlines?sources=${this.newsSource}&pageSize=16`)
        .then(({ data }) => {
            const { articles } = data;
            EVENT_BUS.setArticles(articles)
          },
          error => EVENT_BUS.setHeadlinesFetchError(error)
        )
    },
    icon(iconName) {
      return this.isMobileDevice() ? '' : iconName
    },
    setLanguage(language) {
      this.language = language
      this.fetchNewsSources()
    },
    setNewsSource(newsSource) {
      this.newsSource = newsSource
      this.fetchTopHeadlines()
    },
    toggle() {
      EVENT_BUS.toggleDrawer()
    }
  },
  mounted() {
    this.fetchNewsSources()
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 400px) {
  .grow, .spacer {
    flex-grow: 0.9 !important;
  }
}
.profile {
  cursor: pointer;
}
</style>
