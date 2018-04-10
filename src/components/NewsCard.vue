<template>
  <v-card height="400px">
    <v-card-media :src="article.urlToImage" height="200px">
    </v-card-media>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ getTitle(article.title) }}</h3>
        <div>{{ getDescription(article.description) }}</div>
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
