<template>
  <v-toolbar>
    <v-toolbar-title>Top Headlines</v-toolbar-title>
    <v-container>
      <v-layout row wrap>
        <v-flex xs6>
          <v-select
            :items="items"
            v-model="newsSource"
            label="News Sources"
            single-line
            append-icon="fa-newspaper"
            auto-complete
            search-input.sync
          ></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs4>
          <v-select
            :items="items"
            v-model="language"
            label="Language"
            single-line
            append-icon="map"
            auto-complete
            search-input.sync
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Link One</v-btn>
      <v-btn flat>Link Two</v-btn>
      <v-btn flat>Link Three</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      newsSource: '',
      language: ''
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>
