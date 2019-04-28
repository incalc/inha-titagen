<template>
  <v-card>
    <v-card-title>
      Courses
      <v-spacer/>
      <v-btn icon @click="openUserDialog">
        <v-icon>account_balance</v-icon>
      </v-btn>
      <v-btn icon @click="timetableVisible = !timetableVisible">
        <v-icon>table_chart</v-icon>
      </v-btn>
      <v-btn icon @click="searchBoxVisible = !searchBoxVisible">
        <v-icon>search</v-icon>
      </v-btn>
    </v-card-title>
    <v-slide-y-transition>
      <awesome-search-box v-show="searchBoxVisible" @update="updateSearchData"/>
    </v-slide-y-transition>
    <v-data-table
      :headers="headers"
      :items="courses"
      :rows-per-page-items="pageItems"
      :search="search"
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
          :search="search"
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
            <v-layout row wrap>
              <v-flex sm6 xs12 py-2>
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
              <v-flex sm6 xs12 px-3 py-2>
                <awesome-timetable class="transparent" :schedule="propsNested.item.time"/>
              </v-flex>
            </v-layout>
          </template>
        </v-data-table>
      </template>
    </v-data-table>
    <awesome-user-dialog ref="userDialog" @result="updateUserData"/>
  </v-card>
</template>

<script>
import AwesomeLabel from '@/components/AwesomeLabel'
import AwesomeListTile from '@/components/AwesomeListTile'
import AwesomeSearchBox from '@/components/AwesomeSearchBox'
import AwesomeTimetable from '@/components/AwesomeTimetable'
import AwesomeUserDialog from '@/components/AwesomeUserDialog'
import {
  checkCourse,
  checkDepartment,
  checkGrade,
  checkProfessor
} from '@/lib/checker'
import { dataTable } from '@/static/components'
import courses from '@/static/courses'

export default {
  name: 'AwesomeCourseList',
  components: {
    AwesomeLabel,
    AwesomeListTile,
    AwesomeSearchBox,
    AwesomeTimetable,
    AwesomeUserDialog
  },
  data() {
    return {
      courses,
      search: null,
      user: { department: null },
      searchBoxVisible: false,
      timetableVisible: false,
      ...dataTable
    }
  },
  mounted() {
    this.openUserDialog()
  },
  methods: {
    customSearchFilter(items, search, filter) {
      if (search) {
        return items.filter(item => {
          const { course, department, grade, professor } = search
          return (
            checkCourse(item, course) &&
            item.classes.some(clazz =>
              checkDepartment(clazz.departments, department)
            ) &&
            checkGrade(item.grade, grade) &&
            item.classes.some(clazz =>
              checkProfessor(clazz.professors, professor)
            )
          )
        })
      }
      return items
    },
    customSearchFilterNested(items, search, filter) {
      if (search) {
        return items.filter(item => {
          const { department, professor } = search
          return (
            checkDepartment(item.departments, department) &&
            checkProfessor(item.professors, professor)
          )
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
      const { user } = this
      return (
        user.department &&
        course.category.includes('필수') &&
        checkDepartment(course.listed, user.department)
      )
    },
    isRistricted(course) {
      const { user } = this
      return (
        user.department && checkDepartment(course.restricted, user.department)
      )
    },
    openUserDialog() {
      this.$refs.userDialog.open()
    },
    updateSearchData(search) {
      this.search = search
    },
    updateUserData(user) {
      this.user = user
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
