export const masterTableToOptions = (masterTable = []) => {
  const options = [];
  masterTable.forEach((elem) => {
    const option = {};
    option.key = elem.id;
    option.text = elem.name;
    option.value = elem.id.toString();
    options.push(option);
  });
  return options;
};

export const getFacultiesByUniversityId = (faculties, universityId = '') => {
  if (faculties.length === 0) {
    return [];
  }
  return faculties.filter(faculty => faculty.universityId === universityId);
};

export const getMajorsByFacultyId = (majors, facultyId = '') => {
  if (majors.length === 0) {
    return [];
  }
  return majors.filter(major => major.facultyId === facultyId);
};

export const handleReduxFormSubmit = (dispatch, action, values, ...args) => (
  new Promise((resolve, reject) => (
    dispatch(action(values, resolve, reject, ...args))
  ))
);
