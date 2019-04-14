<template>
  <v-container fluid>
    <v-layout row pb-2>
      <v-flex xs10 offset-xs1>
        <AwesomeCourseTable class="card__course-table" :courses="courses"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AwesomeCourseTable from '@/components/AwesomeCourseTable'

import availableCourses from '@/static/available-courses'

export default {
  components: {
    AwesomeCourseTable
  },
  data() {
    return {
      courses: availableCourses
    }
  }
}
</script>

<style scoped>
.card__course-table {
  margin-top: -80px;
}
</style>
