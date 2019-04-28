<template>
  <section class="table">
    <div class="times">
      <div class="time"></div>
      <div v-for="i in 15" :key="i" class="time">{{ i + 8 }}시</div>
    </div>
    <div v-for="dayName in dayNames" :key="dayName" class="cols">
      <div
        v-for="time in scheduleByDay[dayName]"
        :key="time"
        class="cell secondary"
        :style="{ top : 16 + (time.match(/\d+/)[0] - 1) * 8 + 'px'}"
      ></div>
      <div class="day">{{ dayName }}</div>
      <div v-for="i in 15" :key="i" class="time"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AwesomeTimetable',
  props: {
    schedule: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dayNames: ['월', '화', '수', '목', '금', '토']
    }
  },
  computed: {
    scheduleByDay() {
      const { dayNames } = this
      const schedule = this.schedule.split(',')
      return dayNames
        .map(dayName => schedule.filter(time => time[0] === dayName))
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
}

.times,
.cols {
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
  box-sizing: border-box;
}

.cell {
  position: absolute;
  width: 100%;
  height: 8px;
}
</style>
