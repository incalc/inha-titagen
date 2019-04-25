<template>
  <v-layout row wrap>
    <v-flex sm6 xs12 px-3>
      <v-autocomplete
        :items="departmentNames"
        label="Your Department"
        prepend-icon="account_balance"
        clearable
        v-model="searchDepartment"
      />
    </v-flex>
    <v-flex sm6 xs12 px-3>
      <v-autocomplete
        :items="['1학년', '2학년', '3학년', '4학년']"
        label="Your Grade"
        prepend-icon="person"
        clearable
        v-model="searchGrade"
      />
    </v-flex>
    <v-flex sm6 xs12 px-3>
      <v-autocomplete
        :items="courseNames"
        label="Course ID/Name"
        prepend-icon="chrome_reader_mode"
        clearable
        v-model="searchCourse"
      />
    </v-flex>
    <v-flex sm6 xs12 px-3>
      <v-autocomplete
        :items="professorNames"
        label="Professor Name"
        prepend-icon="school"
        clearable
        v-model="searchProfessor"
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
      professorNames: Array.from(
        new Set(
          courses
            .map(course => course.classes.map(clazz => clazz.professors))
            .flat(2)
        )
      ).sort(),
      searchCourse: '',
      searchDepartment: '',
      searchGrade: '',
      searchProfessor: ''
    }
  }
}
</script>


      <!-- <v-combobox
        v-model="search"
        :items="chipTexts"
        hide-selected
        multiple
        single-line
        hide-details
      >
        <template v-slot:selection="{ item, parent, selected }">
          <v-chip
            :selected="selected"
            :color="(currentChip(item) || { color: 'primary' }).color"
            text-color="white"
            close
            @input="parent.selectItem(item)"
          >{{ item }}</v-chip>
        </template>
        <template v-slot:item="{ parent, item }">
          <v-list-tile-avatar>
            <v-avatar :color="currentChip(item).color" size="32px">
              <v-icon dark>{{ currentChip(item).type }}</v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile-content>
        </template>
      </v-combobox> -->

      
      // chips: [
      //   ...Object.entries(departmentColors).map(([name, color]) => ({
      //     type: 'account_balance', // department
      //     color,
      //     content: name
      //   })),
      //   ...Array.from(new Set(this.courses.map(c => c.name)))
      //     .sort()
      //     .map(name => ({
      //       type: 'chrome_reader_mode', // course
      //       color: 'primary',
      //       content: name
      //     }))
      // ],


  // computed: {
  //   chipTexts() {
  //     return this.chips.map(item => item.content)
  //   }
  // },
      
    // currentChip(item) {
    //   return this.chips.find(chip => chip.content === item)
    // },