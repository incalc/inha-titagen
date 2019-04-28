export const checkCourse = (courses, courseToCheck) =>
  courseToCheck
    ? courses.id.includes(courseToCheck) || courses.name.includes(courseToCheck)
    : true

export const checkDepartment = (departments, departmentToCheck) => {
  if (departmentToCheck) {
    const search = departmentToCheck.replace(/과$/, '')
    return (
      departments[0] === '전체' ||
      departments.some(department => department.includes(search))
    )
  }
  return true
}

export const checkGrade = (grade, gradeToCheck) =>
  gradeToCheck ? grade === '전체' || grade === gradeToCheck[0] : true

export const checkProfessor = (professors, professorToCheck) =>
  professorToCheck ? professors.includes(professorToCheck) : true
