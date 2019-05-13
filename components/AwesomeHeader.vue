<template>
  <v-toolbar color="primary flex" dark extended extension-height="80px" flat height="140px">
    <v-layout justify-center align-center>
      <inha-titagen-logo v-bind="logoTheme"/>
      <v-toolbar-title class="display-2 font-weight-regular" style="overflow: visible">Inha TitaGen</v-toolbar-title>
    </v-layout>
  </v-toolbar>
</template>

<script>
import InhaTitagenLogo from '@/components/logo/InhaTitagenLogo'

export default {
  name: 'AwesomeHeader',
  components: {
    InhaTitagenLogo
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
