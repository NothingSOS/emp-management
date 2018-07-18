export const getVisibleProjects = (state) => {
  if (!state.project.lists) return [];
  const regExp = new RegExp(state.project.searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
  return state.project.lists
    .filter(project => regExp.test(project.id)
    || regExp.test(project.name)
    || regExp.test(project.customer)
    || regExp.test(project.quotationId))
    .sort((a, b) => {
      const direction = state.project.direction === 'ascending' ? 1 : -1;
      if (a[state.project.sortKey] < b[state.project.sortKey]) {
        return direction * -1;
      }
      else if (a[state.project.sortKey] > b[state.project.sortKey]) {
        return direction;
      }
      return 0;
    });
};
