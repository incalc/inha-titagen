<template>
  <v-list-tile>
    <v-list-tile-avatar>
      <v-icon v-if="iconName !== 'none'" color="secondary">{{ iconName }}</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ content }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
const iconNames = {
  professor: 'school',
  rate: 'assessment',
  time: 'schedule'
}

export default {
  name: 'AwesomeListTile',
  props: {
    icon: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      const { icon } = this
      return icon in iconNames ? iconNames[icon] : icon
    }
  }
}
</script>
