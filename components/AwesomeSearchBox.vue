<template>
  <v-layout row wrap>
    <v-flex sm6 xs12 px-3>
      <v-autocomplete
        v-model="selectedDepartment"
        :items="departmentNames"
        label="Department"
        prepend-icon="account_balance"
        clearable
      />
    </v-flex>
    <v-flex sm6 xs12 px-3>
      <v-autocomplete
        v-model="selectedCourse"
        :items="courseNames"
        label="Course ID/Name"
        prepend-icon="chrome_reader_mode"
        clearable
      />
    </v-flex>
    <v-flex sm6 xs12 px-3>
      <v-autocomplete
        v-model="selectedProfessor"
        :items="professorNames"
        label="Professor Name"
        prepend-icon="school"
        clearable
      />
    </v-flex>
    <v-flex sm6 xs12 px-3>
      <v-select
        v-model="selectedGrade"
        :items="gradeNames"
        label="Grade"
        prepend-icon="person"
        clearable
      />
    </v-flex>
  </v-layout>
</template>

<script>
import courses from '@/static/courses'

export default {
  name: 'AwesomeSearchBox',
  data() {
    return {
      courseNames: courses
        .map(course => [course.id, course.name])
        .flat()
        .sort(),
      departmentNames: Array.from(
        new Set(
          courses
            .map(course => course.classes.map(clazz => clazz.departments))
            .flat(2)
        )
      ).sort(),
      gradeNames: ['1학년', '2학년', '3학년', '4학년'],
      professorNames: Array.from(
        new Set(
          courses
            .map(course => course.classes.map(clazz => clazz.professors))
            .flat(2)
        )
      ).sort(),
      selectedCourse: '',
      selectedDepartment: '',
      selectedGrade: '',
      selectedProfessor: ''
    }
  },
  watch: {
    selectedCourse() {
      this.updateData()
    },
    selectedDepartment() {
      this.updateData()
    },
    selectedGrade() {
      this.updateData()
    },
    selectedProfessor() {
      this.updateData()
    }
  },
  methods: {
    updateData() {
      this.$emit('update', {
        course: this.selectedCourse,
        department: this.selectedDepartment,
        grade: this.selectedGrade,
        professor: this.selectedProfessor
      })
    }
  }
}
</script>
