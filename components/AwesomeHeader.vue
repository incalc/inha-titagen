<template>
  <v-toolbar color="primary flex" dark extended extension-height="60px" flat height="160px">
    <v-layout justify-center>
      <InhaLogo v-bind="logoTheme"/>
      <v-toolbar-title class="toolbar__title">
        <h1 class="display-2">Inha Univ.</h1>
        <h2 class="display-1">Time Table Generator</h2>
      </v-toolbar-title>
    </v-layout>
  </v-toolbar>
</template>

<script>
import InhaLogo from '@/components/InhaLogo'

export default {
  name: 'AwesomeHeader',
  components: {
    InhaLogo
  },
  data() {
    return {
      logoTheme: {
        strokeColor: 'white',
        skyColor: 'white',
        seaColor: 'white',
        textColor: '#005bac'
      }
    }
  }
}
</script>
