<template>
  <v-footer class="pa-3" fixed>
    <div class="text-xs-center" id="creator">
      Made with
      <v-btn flat icon color="pink">
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn
        :href="link.url"
        color="info"
        target="_blank"
        flat
        external
        icon
        noreferrer
        v-for="(link) in links"
        :key="link.icon"
      >
        <v-icon dark :color="link.colour">{{ link.icon }}</v-icon>
      </v-btn>
    </div>
    <v-spacer></v-spacer>
    <div id="copyright">&copy; {{ copyright }}</div>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      copyright: new Date().getFullYear(),
      creator: "codejockie",
      links: [
        {
          colour: "green",
          icon: "mdi-github-circle",
          url: "https://github.com/codejockie"
        },
        {
          colour: "primary",
          icon: "mdi-twitter-circle",
          url: "https://twitter.com/codejockie"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
