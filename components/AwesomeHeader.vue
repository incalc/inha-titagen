<template>
  <v-toolbar color="primary flex" dark extended extension-height="60px" flat height="160px">
    <v-layout justify-center>
      <inha-timetable-logo v-bind="logoTheme"/>
      <v-toolbar-title class="toolbar__title">
        <h1 class="display-2">Inha Univ.</h1>
        <h2 class="display-1">Timetable Generator</h2>
      </v-toolbar-title>
    </v-layout>
  </v-toolbar>
</template>

<script>
import InhaTimetableLogo from '@/components/InhaTimetableLogo'

export default {
  name: 'AwesomeHeader',
  components: {
    InhaTimetableLogo
  },
  data() {
    return {
      logoTheme: {
        backgroundColor: '#005bac',
        strokeColor: 'white',
        skyColor: 'white',
        seaColor: 'white'
      }
    }
  }
}
</script>
