const { department } = require('inha-info');
const fs = require('fs');
const inhaTT = require('inha-timetable');
const path = require('path');

const AVAILABLE_COURSES_FILE = path.join(__dirname, '../static/available-courses.json');
const COURSES_FILE = path.join(__dirname, '../static/courses.json');
const RESTRICTED_COURSES_FILE = path.join(__dirname, '../static/restricted-courses.json');

const depts = department.getAll();
const deptICECode = inhaTT.getDeptCode('정보통신공학과');

Promise.all([
  ...Object.values(inhaTT.getAll()).map(deptCode => inhaTT.getTimeTable(deptCode, '필수')),
  inhaTT.getTimeTable(deptICECode, '영어'),
  inhaTT.getTimeTable(deptICECode, '핵심교양'),
  inhaTT.getTimeTable(deptICECode, '일반교양'),
]).then((categoryCourses) => {
  fs.writeFileSync(
    AVAILABLE_COURSES_FILE,
    JSON.stringify(categoryCourses
      .flat()
      .reduce((accumulator, course, index) => {
        const courseId = course.id;
        const duplicateCourse = accumulator.find(element => element.id === courseId);
        if (duplicateCourse) {
          duplicateCourse.departments.push(course.deptName);
        } else {
          course.departments = [course.deptName];
          delete course.dept;
          delete course.deptName;
          accumulator.push(course);
        }
        return accumulator;
      }, [])
      .map((course) => {
        if (course.departments.includes('전체')) {
          course.departments = ['전체']
        } else {
          course.departments.sort();
        }
        course.professors = course.professor
          .split(',')
          .map(professor => professor.trim());
        delete course.professor;
        return course;
      })
      .sort((a, b) => a.id.localeCompare(b.id)),
      null, 4),
  );
});

Promise.all(depts.map(department.getCourses)).then(deptCourses => fs.writeFileSync(
  COURSES_FILE,
  JSON.stringify(deptCourses.reduce((accumulator, courses, index) => {
    accumulator[depts[index].name] = courses;
    return accumulator;
  }, {}), null, 4),
));

Promise.all(depts.map(department.getRestrictedCourses)).then(deptCourses => fs.writeFileSync(
  RESTRICTED_COURSES_FILE,
  JSON.stringify(deptCourses.reduce((accumulator, courses, index) => {
    accumulator[depts[index].name] = courses;
    return accumulator;
  }, {}), null, 4),
));
