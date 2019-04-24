const fs = require('fs');
const path = require('path');
const utils = require('../lib/utils');

(async () => {
  const availableCourses = await utils.getAvailableCourses();
  const listedCourses = await utils.getListedCourses();
  const restrictedCourses = await utils.getRestrictedCourses();
  const courses = {};
  for (let i = 0, len = availableCourses.length; i < len; i += 1) {
    const availableCourse = availableCourses[i];
    const [courseId, classId] = availableCourse.id.split('-');
    if (courseId in courses) {
      const course = courses[courseId];
      const courseClass = course.classes.find(courseClass => courseClass.id === classId);
      if (courseClass) {
        const { departments } = courseClass;
        if (!departments.includes('전체') && !departments.includes(availableCourse.deptName)) {
          if (availableCourse.deptName === '전체') {
            courseClass.departments = ['전체'];
          } else {
            departments.push(availableCourse.deptName);
            departments.sort();
          }
        }
      } else {
        course.classes.push({
          id: classId,
          professors: availableCourse.professor
            .split(',')
            .map(professor => professor.trim()),
          time: availableCourse.time,
          classroom: availableCourse.classroom,
          rate: availableCourse.rate,
          note: availableCourse.note,
          departments: [availableCourse.deptName],
        });
      }
    } else {
      courses[courseId] = {
        id: courseId,
        name: availableCourse.name,
        grade: availableCourse.grade,
        credit: availableCourse.credit,
        category: availableCourse.category,
        classes: [{
          id: classId,
          professors: availableCourse.professor
            .split(',')
            .map(professor => professor.trim()),
          time: availableCourse.time,
          classroom: availableCourse.classroom,
          rate: availableCourse.rate,
          note: availableCourse.note,
          departments: [availableCourse.deptName],
        }],
        listed: (() => {
          const matchCourse = listedCourses.find(listedCourse => listedCourse.id === courseId);
          return matchCourse ? matchCourse.department : [];
        })(),
        restricted: (() => {
          const matchCourse = restrictedCourses.find(restrictedCourse => restrictedCourse.id === courseId);
          return matchCourse ? matchCourse.department : [];
        })(),
      };
    }
  }
  fs.writeFileSync(path.join(__dirname, '../static/courses.json'), JSON.stringify(Object.values(courses), null, 4));
})();
