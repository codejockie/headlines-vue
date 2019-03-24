<template>
  <v-card height="400px">
    <v-img class="white--text" :src="article.urlToImage" height="200px">
      <v-container fill-height fluid>
        <v-layout fill-height>
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
      <v-btn :href="article.url" target="_blank" flat color="info">View from source</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['article'],
  methods: {
    getTitle(text) {
      if (!text) {
        return 'No title found for this article'
      }
      return `${text.substr(0, 50)}...`
    },
    getDescription(text) {
       if (!text) {
        return 'No description found for this article'
      }
      return `${text.substr(0, 100)}...`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
