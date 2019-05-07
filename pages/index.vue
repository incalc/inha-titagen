<template>
  <v-container fluid>
    <v-layout row pb-2>
      <v-flex sm10 offset-sm1 xs12>
        <awesome-course-list class="card__course-table"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AwesomeCourseList from '@/components/AwesomeCourseList'

export default {
  components: {
    AwesomeCourseList
  }
}
</script>

<style scoped>
.card__course-table {
  margin-top: -96px;
}
</style>
