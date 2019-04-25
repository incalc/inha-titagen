<template>
  <v-card>
    <v-card-title>
      Courses
      <v-spacer/>
      <v-btn icon @click="searchBoxVisible = !searchBoxVisible">
        <v-icon>search</v-icon>
      </v-btn>
    </v-card-title>
    <v-slide-y-transition>
      <awesome-search-box v-show="searchBoxVisible" ref="searchBox"/>
    </v-slide-y-transition>
    <v-data-table
      :headers="headers"
      :items="courses"
      :rows-per-page-items="pageItems"
      :search="search()"
      expand
      :custom-filter="customSearchFilter"
    >
      <template v-slot:items="props">
        <tr
          :class="{ 'green lighten-5': isRequired(props.item), 'red lighten-5': isRistricted(props.item) }"
          @click="props.expanded = !props.expanded"
        >
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.category }}</td>
          <td>{{ props.item.credit }}</td>
          <td>{{ props.item.grade }}</td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-data-table
          class="grey lighten-3 pl-1"
          :headers="headersNested"
          :items="props.item.classes"
          :search="search()"
          expand
          hide-actions
          :custom-filter="customSearchFilterNested"
        >
          <template v-slot:items="propsNested">
            <tr @click="propsNested.expanded = !propsNested.expanded">
              <td>{{ propsNested.item.id }}</td>
              <td>{{ formatNames(propsNested.item.professors) }}</td>
              <td>
                <awesome-label
                  v-for="department in propsNested.item.departments"
                  :key="department"
                  :content="department"
                />
              </td>
            </tr>
          </template>
          <template v-slot:expand="propsNested">
            <v-layout justify-space-between py-2>
              <v-flex xs6>
                <v-list class="transparent">
                  <awesome-list-tile
                    v-for="(professor, index) in propsNested.item.professors"
                    :key="professor"
                    :icon="index > 0 ? 'none' : 'professor'"
                    :content="professor"
                  />
                  <awesome-list-tile icon="time" :content="propsNested.item.time"/>
                  <awesome-list-tile icon="place" :content="propsNested.item.classroom"/>
                  <awesome-list-tile icon="rate" :content="propsNested.item.rate"/>
                  <awesome-list-tile
                    v-if="propsNested.item.note"
                    icon="info"
                    :content="propsNested.item.note"
                  />
                </v-list>
              </v-flex>
              <v-flex d-flex>TimeTable</v-flex>
            </v-layout>
          </template>
        </v-data-table>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import AwesomeLabel from '@/components/AwesomeLabel'
import AwesomeListTile from '@/components/AwesomeListTile'
import AwesomeSearchBox from '@/components/AwesomeSearchBox'

import courses from '@/static/courses'

export default {
  name: 'AwesomeCourseList',
  components: {
    AwesomeLabel,
    AwesomeListTile,
    AwesomeSearchBox
  },
  data() {
    return {
      courses,
      searchBoxVisible: false,
      headers: [
        { text: 'Course ID', value: 'id', width: '10%' },
        { text: 'Name', value: 'name', width: '40%' },
        { text: 'Category', value: 'category', width: '20%' },
        { text: 'Credit', value: 'credit', width: '15%' },
        { text: 'Grade', value: 'grade', width: '15%' }
      ],
      headersNested: [
        { text: 'Course ID', value: 'id', width: '10%' },
        { text: 'Professors', value: 'professors', width: '40%' },
        { text: 'Departments', value: 'departments', width: '50%' }
      ],
      pageItems: [
        25,
        50,
        100,
        { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }
      ]
    }
  },
  methods: {
    customSearchFilter(items, searches, filter) {
      if (searches) {
        return items.filter(item => {
          const { course, grade, professor } = searches
          const validCourse = course
            ? item.id.includes(course) || item.name.includes(course)
            : true
          const validGrade = grade
            ? item.grade === '전체' || item.grade === grade[0]
            : true
          const validProfessor = professor
            ? item.classes.some(clazz => clazz.professors.includes(professor))
            : true
          return validCourse && validGrade && validProfessor
        })
      }
      return items
    },
    customSearchFilterNested(items, searches, filter) {
      if (searches) {
        return items.filter(item => {
          const { professor } = searches
          return professor ? item.professors.includes(professor) : true
        })
      }
      return items
    },
    formatNames(names) {
      const formatNames = names.slice(0, 3).join(', ')
      if (names.length > 3) {
        return `${formatNames} 외 ${names.length - 3}명`
      }
      return formatNames
    },
    isRequired(course) {
      const department = this.$refs.searchBox.searchDepartment
      return (
        department &&
        course.category.includes('필수') &&
        (course.listed.some(listedDepartment =>
          listedDepartment.includes(department.replace(/과$/, ''))
        ) ||
          course.listed.includes('전체'))
      )
    },
    isRistricted(course) {
      const department = this.$refs.searchBox.searchDepartment
      return (
        department &&
        course.restricted.some(restrictedDepartment =>
          restrictedDepartment.includes(department.replace(/과$/, ''))
        )
      )
    },
    search() {
      const searchBox = this.$refs.searchBox
      if (searchBox) {
        return {
          course: searchBox.searchCourse,
          grade: searchBox.searchGrade,
          professor: searchBox.searchProfessor
        }
      }
      return null
    }
  }
}
</script>

<style>
tbody table thead tr {
  height: 48px !important;
}

tbody table tr {
  background-color: #f8f8f8;
}
</style>
