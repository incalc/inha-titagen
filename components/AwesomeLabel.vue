<template>
  <v-chip :color="color" label outline small>{{ content }}</v-chip>
</template>

<script>
import colors from '@/static/colors'

export default {
  name: 'AwesomeLabel',
  props: {
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    color() {
      const { content } = this
      return content in colors ? colors[content] : 'primary'
    }
  }
}
</script>
