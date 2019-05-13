<template>
  <v-app>
    <awesome-header/>
    <v-content>
      <nuxt/>
    </v-content>
    <awesome-footer/>
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
