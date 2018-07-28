export const getVisibleRecruitment = (state) => {
  if (!state.recruitment.data) return [];
  const regExp = new RegExp(state.recruitment.searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
  return state.recruitment.data
    .filter(data => regExp.test(data.firstName)
      || regExp.test(data.lastName)
      || regExp.test(data.firstNameTh)
      || regExp.test(data.lastNameTh)
      || regExp.test(data.email)
      || regExp.test(data.position)
      || regExp.test(data.mobileNumber)
      || regExp.test(data.citizenId)
      || regExp.test(data.registrationDate)
      || regExp.test(data.signDate)
      || regExp.test(data.interviewDate)
      || regExp.test(data.blacklistDate)
      || regExp.test(data.firstDate)
      || regExp.test(data.cancelDate))
    .sort((a, b) => {
      const direction = state.recruitment.direction === 'ascending' ? 1 : -1;
      if (a[state.recruitment.sortKey] < b[state.recruitment.sortKey]) {
        return direction * -1;
      }
      else if (a[state.recruitment.sortKey] > b[state.recruitment.sortKey]) {
        return direction;
      }
      return 0;
    });
};

export const getFilterRecruitment = (data, status) => {
  if (!data) return [];
  return data
    .filter(row => row.status === status);
};

export const getRecruitmentByCitizen = (data, citizenId) => {
  if (!data) return [];
  return data.find(row => row.citizenId === citizenId);
};

export const getFilterRecruitmentTwoParam = (data, status, status2) => {
  if (!data) return [];
  return data
    .filter(row => row.status === status
      || row.status === status2);
};

// may be move to validator after merging
export const validateDate = (date) => {
  const regEx = new RegExp('([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))');
  return regEx.test(date);
};

export const validateTime = (time) => {
  const regEx = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
  return regEx.test(time);
};

