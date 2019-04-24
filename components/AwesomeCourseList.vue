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
      <div v-show="searchBoxVisible">
        
      </div>
    </v-slide-y-transition>
    <v-data-table
      :headers="headers"
      :items="courses"
      :expand="true"
      :search="search"
      :rows-per-page-items="pageItems"
      :custom-filter="customFilter"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
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
          :expand="true"
          hide-actions
        >
          <template v-slot:items="propsNested">
            <tr @click="propsNested.expanded = !propsNested.expanded">
              <td>{{ propsNested.item.id }}</td>
              <td>{{ propsNested.item.professors.slice(0, 3).join(', ') }}</td>
              <td>
                <awesome-label
                  v-for="department in propsNested.item.departments"
                  :content="department"
                  :key="department"
                />
              </td>
            </tr>
          </template>
          <template v-slot:expand="propsNested">
            <v-layout justify-space-between pa-4>
              <v-flex xs6>
                <v-list class="transparent">
                  <awesome-list-tile
                    v-for="(professor, index) in propsNested.item.professors"
                    :icon="index > 0 ? 'none' : 'professor'"
                    :content="professor"
                    :key="professor"
                  />
                  <awesome-list-tile icon="time" :content="propsNested.item.time"/>
                  <awesome-list-tile icon="place" :content="propsNested.item.classroom"/>
                  <awesome-list-tile icon="rate" :content="propsNested.item.rate"/>
                  <awesome-list-tile v-if="propsNested.item.note" icon="info" :content="propsNested.item.note"/>
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

import courses from '@/static/courses'

export default {
  name: 'AwesomeCourseList',
  components: {
    AwesomeLabel,
    AwesomeListTile
  },
  data() {
    return {
      courses,
      search: '',
      searchBoxVisible: false,
      headers: [
        { text: 'Course ID', value: 'id', width: '15%' },
        { text: 'Name', value: 'name', width: '35%' },
        { text: 'Category', value: 'category', width: '20%' },
        { text: 'Credit', value: 'credit', width: '15%' },
        { text: 'Grade', value: 'grade', width: '15%' }
      ],
      headersNested: [
        { text: 'Course ID', value: 'id', width: '15%' },
        { text: 'Professors', value: 'professors', width: '35%' },
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
    customFilter(items, searches, filter) {
      if (searches.length > 0) {
        return items.filter(item => earches.every(search => Object.values(item).some(data => data.includes(search))))
      }
      return items
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
