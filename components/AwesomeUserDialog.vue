<template>
  <v-dialog v-model="isOpen" max-width="560px" scrollable>
    <v-card>
      <v-card-title>Select your department</v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="selectedDepartment"
          :items="departmentNames"
          label="Department"
          prepend-icon="account_balance"
          clearable
        />
        <p>
          If you select a department, you can check
          <v-chip color="green" disabled label outline small>Required</v-chip>and
          <v-chip color="red" disabled label outline small>Restricted</v-chip> courses.
        </p>
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
import courses from '@/data/courses'

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
        this.$emit('result', { department: selectedDepartment })
        this.close()
      } else {
      }
    }
  }
}
</script>
