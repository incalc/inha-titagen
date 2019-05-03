<template>
  <section class="table">
    <div class="times">
      <div class="time"></div>
      <div v-for="i in 15" :key="i" class="time">{{ i + 8 }}시</div>
    </div>
    <div v-for="dayName in dayNames" :key="dayName" class="days">
      <div class="day">{{ dayName }}</div>
      <div v-for="i in 15" :key="i" class="time"></div>
      <div
        v-for="course in coursesByDay[dayName]"
        :key="course"
        class="course primary"
        :style="{ top : `${16 + (course.timeCaculated.start - 1) * 8}px`, height: `${(course.timeCaculated.end - course.timeCaculated.start + 1) * 8}px`}"
      >{{ course.name }}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AwesomeTimetable',
  props: {
    courseClasses: {
      type: Array,
      default: []
      // required: true
    }
  },
  data() {
    return {
      dayNames: ['월', '화', '수', '목', '금', '토']
    }
  },
  computed: {
    coursesByDay() {
      const { dayNames, courseClasses } = this
      return dayNames
        .map(dayName =>
          courseClasses
            .filter(courseClass => courseClass.time.includes(dayName))
            .map(courseClass => {
              const ts = courseClass.time
                .split(',')
                .filter(t => t.includes(dayName))
              return {
                ...courseClass,
                timeCaculated: {
                  start: Number(ts[0].match(/\d+/)[0]),
                  end: Number(ts[ts.length - 1].match(/\d+/)[0])
                }
              }
            })
        )
        .reduce((acc, cur, idx) => {
          acc[dayNames[idx]] = cur
          return acc
        }, {})
    }
  }
}
</script>

<style scoped>
.table {
  display: flex;
  text-align: center;
  border-collapse: collapse;
}

.times,
.days {
  position: relative;
  flex: 1;
  border: #eee 1px solid;
}

.time,
.day {
  height: 16px;
  border-bottom: #eee 1px solid;
  box-sizing: border-box;
  font-size: 10px;
  line-height: 16px;
}

.time:last-child {
  height: 15px;
  border: none;
}

.course {
  display: flex;
  position: absolute;
  width: 100%;
  color: white;
  font-size: 6px;
  align-items: center;
  justify-content: center;
}
</style>
