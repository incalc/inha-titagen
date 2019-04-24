const { department } = require('inha-info');
const inhaSugang = require('inha-timetable');

const depts = department.getAll();
const deptICECode = inhaSugang.getDeptCode('정보통신공학과');

/**
 * @returns {Array.<Object>>}
 */
const getAvailableCourses = () => new Promise(async (resolve) => {
  const coursesByCategory = await Promise.all([
    ...Object.values(inhaSugang.getAll()).map(deptCode => inhaSugang.getTimeTable(deptCode, '필수')),
    inhaSugang.getTimeTable(deptICECode, '영어'),
    inhaSugang.getTimeTable(deptICECode, '핵심교양'),
    inhaSugang.getTimeTable(deptICECode, '일반교양'),
  ]);
  resolve(coursesByCategory.flat());
});

/**
 * @returns {Array.<Object>}
 */
const getListedCourses = () => new Promise(async (resolve) => {
  const coursesByDepartment = await Promise.all(depts.map(department.getCourses));
  resolve(coursesByDepartment
    .map((course, index) => {
      course.department = depts[index];
      return course;
    }).flat());
});

/**
 * @returns {Array.<Object>}
 */
const getRestrictedCourses = () => new Promise(async (resolve) => {
  const coursesByDepartment = await Promise.all(depts.map(department.getRestrictedCourses));
  resolve(coursesByDepartment
    .map((course, index) => {
      course.department = depts[index];
      return course;
    }).flat());
});

module.exports = {
  getAvailableCourses,
  getListedCourses,
  getRestrictedCourses,
};
