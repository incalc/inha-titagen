<template>
  <v-card>
    <v-card-title class="headline">
      <span>Courses</span>
      <v-spacer/>
      <v-btn aria-label="Open User Dialog" icon @click="openUserDialog">
        <v-icon>account_balance</v-icon>
      </v-btn>
      <v-btn aria-label="Search Menu" icon @click="searchBoxVisible = !searchBoxVisible">
        <v-icon>search</v-icon>
      </v-btn>
    </v-card-title>
    <v-slide-y-transition>
      <awesome-search-box v-show="searchBoxVisible" @update="updateSearchData"/>
    </v-slide-y-transition>
    <v-divider/>
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
          v-model="user.courses[props.index]"
          class="grey lighten-3 pl-1"
          :headers="headersNested"
          :items="props.item.classes"
          :search="search"
          disable-initial-sort
          expand
          hide-actions
          select-all
          :custom-filter="customSearchFilterNested"
        >
          <template v-slot:items="propsNested">
            <tr @click="propsNested.expanded = !propsNested.expanded">
              <td>
                <v-checkbox
                  v-model="propsNested.selected"
                  class="custom"
                  color="primary"
                  hide-details
                  :label="propsNested.item.id.split('-')[1]"
                />
              </td>
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
                <awesome-timetable class="transparent" :courses="[propsNested.item]"/>
              </v-flex>
            </v-layout>
            <v-divider/>
          </template>
        </v-data-table>
      </template>
    </v-data-table>
    <awesome-user-dialog ref="userDialog" @result="updateUserData"/>
    <v-bottom-sheet inset>
      <template v-slot:activator>
        <v-btn aria-label="Open Generator Menu" color="primary" dark fab fixed bottom right>
          <v-icon>table_chart</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Generator
          <v-chip v-show="timetableError" color="error" disabled label text-color="white">No Result</v-chip>
          <v-spacer/>
          <v-btn color="primary" @click="calculateTimetable">Run</v-btn>
        </v-card-title>
        <v-divider/>
        <v-layout row wrap py-2>
          <v-flex sm6 xs12 py-2>
            <awesome-timetable class="mx-3" :courses="user.timetable"/>
          </v-flex>
          <v-flex sm6 xs12 py-2>
            <v-sheet class="custom mx-3" height="256">
              <v-list two-line>
                <v-list-tile v-for="course in user.courses.flat()" :key="course.id">
                  <v-list-tile-action>
                    <v-checkbox
                      color="primary"
                      readonly
                      :value="user.timetable.find(({ id }) => course.id === id)"
                    />
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ course.id }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ course.name }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-sheet>
          </v-flex>
        </v-layout>
      </v-card>
    </v-bottom-sheet>
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

const getSubgroups = (groups, subgroups = [], depth = -1, indexes = []) => {
  if (depth === -1) {
    depth = groups.length
  }
  if (depth > 0) {
    for (
      let i = 0, len = groups[groups.length - depth].length;
      i < len;
      i += 1
    ) {
      getSubgroups(groups, subgroups, depth - 1, [...indexes, i])
    }
  } else {
    const candidate = []
    for (let i = 0, len = groups.length; i < len; i += 1) {
      candidate.push(groups[i][indexes[i]])
    }
    subgroups.push(candidate)
  }
  return subgroups
}

const isFullArray = array => array.length > 0

const isUniqueArray = array =>
  array.length === Array.from(new Set(array)).length

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
      user: {
        courses: new Array(courses.length).fill([]),
        department: null,
        timetable: []
      },
      searchBoxVisible: false,
      timetableError: false,
      ...dataTable
    }
  },
  beforeCreate() {
    courses.forEach(course => {
      course.classes.forEach(clazz => {
        const props = [
          'name',
          'category',
          'credit',
          'grade',
          'listed',
          'restricted'
        ]
        clazz.id = `${course.id}-${clazz.id}`
        props.forEach(prop => {
          clazz[prop] = course[prop]
        })
      })
    })
  },
  methods: {
    calculateTimetable() {
      const selectedCourses = this.user.courses.filter(isFullArray)
      const candidates = getSubgroups(selectedCourses)
        .filter(candidate =>
          isUniqueArray(
            candidate
              .map(course =>
                course.time.split(',').filter(t => /^[월화수목금토]\d+/.test(t))
              )
              .flat()
          )
        )
        .map(candidate => {
          const dayNames = ['월', '화', '수', '목', '금', '토']
          const coursesByDay = dayNames.map(dayName =>
            candidate
              .filter(course => course.time.includes(dayName))
              .map(course => {
                const ts = course.time
                  .split(',')
                  .filter(t => t.includes(dayName))
                return {
                  ...course,
                  timeCaculated: {
                    start: Number(ts[0].match(/\d+/)[0]),
                    end: Number(ts[ts.length - 1].match(/\d+/)[0])
                  }
                }
              })
          )
          const schoolDays = coursesByDay.filter(isFullArray).length
          return [candidate, schoolDays]
        })
        .sort((a, b) => a[1] - b[1])
      if (isFullArray(candidates)) {
        this.user.timetable = candidates[0][0]
        this.timetableError = false
      } else {
        this.user.timetable = []
        this.timetableError = true
      }
    },
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
      this.user = Object.assign(this.user, user)
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

.custom.v-sheet {
  border: #eee 1px solid;
  overflow-y: auto;
}

.custom.v-input--checkbox .v-label {
  color: rgba(0, 0, 0, 0.87);
  font-size: 13px;
}
</style>
