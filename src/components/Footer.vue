<template>
  <v-footer class="pa-3" fixed>
    <v-spacer></v-spacer>
    <div class="text-xs-center" id="creator">
      Made with
      <v-btn flat icon color="pink">
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn
        href="https://github.com/codejockie"
        color="info"
        target="_blank"
        flat
        dark
        external
        noreferrer
      >{{ creator }}</v-btn>
    </div>
    <div id="copyright">&copy; {{ copyright }}</div>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      copyright: new Date().getFullYear(),
      creator: "codejockie"
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
