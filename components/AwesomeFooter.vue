<template>
  <v-footer dark height="auto">
    <v-card class="flex" flat tile>
      <v-card-title class="primary">
        <strong class="subheading">Inha Univ. Timetable Generator</strong>
        <v-spacer/>
        <a class="view-on-github" href="https://github.com/Astro36/inha-timetable-generator">
          View on <span class="github">GitHub</span>
        </a>
      </v-card-title>
      <v-card-actions
        class="grey darken-3 justify-center"
      >&copy; 2019 Seungjae Park. All rights reserved.</v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'AwesomeFooter'
}
</script>

<style scoped>
.view-on-github {
  color: white;
  text-decoration: none;
}

.github {
  font-weight: 700;
}
</style>
