<template>
  <v-toolbar color="pink" dark fixed>
    <v-toolbar-side-icon v-if="isMobile()"></v-toolbar-side-icon>
    <v-toolbar-title v-if="!isMobile()">Top Headlines</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-layout row wrap>
      <v-flex xs6>
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
          v-model="selectedNewsSource"
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
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Profile</v-btn>
    </v-toolbar-items>
    <v-snackbar :timeout="timeout" bottom="bottom" v-model="snackbar">
      {{ text }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-toolbar>
</template>

<script>
import getAvailableLanguages from "../helpers/languages";
import { EVENT_BUS } from "../main";

const NEWS_API_KEY = process.env.NEWS_API_KEY;

export default {
  created() {
    EVENT_BUS.$on("errorFetchingSources", () => {
      this.text = "Error occurred while fetching news sources";
      this.error = error;
    });
  },
  data() {
    return {
      error: null,
      language: "en",
      languages: getAvailableLanguages(),
      newsSources: [],
      selectedNewsSource: "",
      snackbar: false,
      text: "",
      timeout: 6000
    };
  },
  methods: {
    fetchNewsSources() {
      this.$http
        .get(
          `https://newsapi.org/v2/sources?language=${
            this.language
          }&apiKey=${NEWS_API_KEY}`
        )
        .then(
          response => {
            const {
              body: { sources }
            } = response;
            this.newsSources = sources;

            if (!this.selectedNewsSource) {
              // Set a random news source for initial page load
              const randomNewsSource = this.newsSources[
                Math.floor(Math.random() * this.newsSources.length)
              ];
              this.setNewsSource(randomNewsSource.id);
            }
          },
          error => EVENT_BUS.setSourcesFetchError(error)
        );
    },
    fetchTopHeadlines() {
      this.$http
        .get(
          `https://newsapi.org/v2/top-headlines?sources=${
            this.selectedNewsSource
          }&pageSize=12&apiKey=${NEWS_API_KEY}`
        )
        .then(
          response => {
            const {
              body: { articles }
            } = response;
            EVENT_BUS.setArticles(articles);
          },
          error => EVENT_BUS.setHeadlinesFetchError(error)
        );
    },
    setLanguage(language) {
      this.language = language;
      this.fetchNewsSources();
    },
    setNewsSource(newsSource) {
      this.selectedNewsSource = newsSource;
      this.fetchTopHeadlines();
    },
    icon(iconName) {
      if (!this.isMobile()) return iconName
      return ''
    }
  },
  mounted() {
    this.fetchNewsSources();
  }
};
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 400px) {
  .grow, .spacer {
    flex-grow: 0.9 !important;
  }
}
</style>
