<template>
  <v-card class="flexcard" height="400px">
    <v-img class="white--text" :src="getImage(article.urlToImage)" height="200px">
      <v-container fill-height fluid>
        <v-layout row wrap>
          <v-flex xs12 align-end flexbox>
            <span class="headline">{{ getTitle(article.title) }}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-title primary-title>
      <div>
        <div id="description">{{ getDescription(article.description) }}</div>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn :href="article.url" rel="noopener noreferrer" target="_blank" color="info" flat>View from source</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    article: Object
  },
  methods: {
    getDescription(text) {
      return text || "Oh! Oh! We think there was a problem fetching the description."
    },
    getImage(urlToImage) {
      return urlToImage || ""
    },
    getTitle(text) {
      return text || "Oops! We think there was a problem with the title for this article."
    }
  }
};
</script>

<style lang="scss" scoped>
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
