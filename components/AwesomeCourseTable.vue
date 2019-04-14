<template>
  <v-card>
    <v-card-title>
      Courses
      <v-spacer/>
      <v-combobox
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
      </v-combobox>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="courses"
      :expand="expand"
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
          <td style="white-space: pre-line;">
            <AwesomeLabel
              v-for="department in props.item.departments"
              :content="department"
              :key="department"
            />
            <br>
          </td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-layout justify-space-between pa-4>
          <v-flex xs6>
            <v-list>
              <AwesomeListTile
                v-for="(professor, index) in props.item.professors"
                :icon="index > 0 ? 'none' : 'professor'"
                :content="professor"
                :key="professor"
              />
              <AwesomeListTile icon="time" :content="props.item.time"/>
              <AwesomeListTile icon="place" :content="props.item.classroom"/>
              <AwesomeListTile icon="rate" :content="props.item.rate"/>
              <AwesomeListTile v-if="props.item.note" icon="info" :content="props.item.note"/>
            </v-list>
          </v-flex>
          <v-flex d-flex>TimeTable</v-flex>
        </v-layout>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import AwesomeLabel from '@/components/AwesomeLabel'
import AwesomeListTile from '@/components/AwesomeListTile'

import departmentColors from '@/static/department-colors'

export default {
  name: 'AwesomeCourseTable',
  components: {
    AwesomeLabel,
    AwesomeListTile
  },
  props: {
    courses: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chips: [
        ...Object.entries(departmentColors).map(([name, color]) => ({
          type: 'account_balance', // department
          color,
          content: name
        })),
        ...Array.from(new Set(this.courses.map(c => c.name)))
          .sort()
          .map(name => ({
            type: 'chrome_reader_mode', // course
            color: 'primary',
            content: name
          }))
      ],
      search: '',
      expand: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Category', value: 'category' },
        { text: 'Credit', value: 'credit' },
        { text: 'Grade', value: 'grade' },
        { text: 'Departments', value: 'departments', width: '1' }
      ],
      pageItems: [
        25,
        50,
        100,
        { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }
      ]
    }
  },
  computed: {
    chipTexts() {
      return this.chips.map(item => item.content)
    }
  },
  methods: {
    currentChip(item) {
      return this.chips.find(chip => chip.content === item)
    },
    customFilter(items, searches, filter) {
      if (searches.length > 0) {
        return items.filter(item =>
          searches.every(search =>
            Object.values(item).some(data => data.includes(search))
          )
        )
      }
      return items
    }
  }
}
</script>
