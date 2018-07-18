export const getFacultiesByUniversityId = (state, universityId) => (
  state.masterTable.faculties.filter(faculty => faculty.universityId === universityId)
);

export const getMajorsByUniversityId = (state, universityId) => (
  state.masterTable.majors.filter(major => major.universityId === universityId)
);
