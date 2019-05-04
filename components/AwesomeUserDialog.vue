<template>
  <v-dialog v-model="isOpen" max-width="560px">
    <v-card>
      <v-card-title>Select Your Department</v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="selectedDepartment"
          :items="departmentNames"
          label="Your Department"
          prepend-icon="account_balance"
          clearable
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn flat @click="close">Close</v-btn>
        <v-btn color="primary" flat @click="updateResult">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import courses from '@/static/courses'

export default {
  name: 'AwesomeUserDialog',
  data() {
    return {
      departmentNames: Array.from(
        new Set(
          courses
            .map(course => course.classes.map(clazz => clazz.departments))
            .flat(2)
        )
      ).sort(),
      isOpen: false,
      selectedDepartment: null
    }
  },
  methods: {
    close() {
      this.isOpen = false
    },
    open() {
      this.isOpen = true
    },
    updateResult() {
      const { selectedDepartment } = this
      if (selectedDepartment) {
        this.$emit('result', { courses: [], department: selectedDepartment })
        this.close()
      } else {
      }
    }
  }
}
</script>
