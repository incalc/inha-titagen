<template>
  <v-app>
    <AwesomeHeader/>
    <v-content>
      <nuxt/>
    </v-content>
    <AwesomeFooter/>
  </v-app>
</template>

<script>
import AwesomeFooter from '@/components/AwesomeFooter'
import AwesomeHeader from '@/components/AwesomeHeader'

export default {
  components: {
    AwesomeFooter,
    AwesomeHeader
  }
}
</script>
