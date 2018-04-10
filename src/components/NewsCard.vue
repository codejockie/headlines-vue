<template>
  <v-card height="501px">
    <v-card-media :src="article.urlToImage" height="200px">
    </v-card-media>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ article.title }}</h3>
        <div>{{ article.description.substr(0, 150) }} ...</div>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn :href="article.url" target="_blank" flat color="info">View from source</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['article']
}
</script>

<style lang="scss" scoped>

</style>
