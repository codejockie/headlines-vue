<template>
  <v-footer class="pa-3" fixed>
    <v-spacer></v-spacer>
    <div class="text-xs-center" id="creator">
      Made with <v-icon>fas fa-heart</v-icon> by <v-btn href="https://github.com/codejockie" target="_blank" flat color="info" dark>codejockie</v-btn>
    </div>
    <div id="copyright">&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>

</style>
