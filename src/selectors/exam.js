export const getVisibleExams = (state) => {
  if (!state.exam.lists) return [];

  return state.exam.lists.filter(exam =>
    (state.exam.searchText === undefined || state.exam.searchText === '' || exam.exQuestion.replace(/<[^>]*>/g, '').toLowerCase().includes(state.exam.searchText.toLowerCase()))
    && (state.exam.searchCategory === undefined
      || state.exam.searchCategory === 'all categories'
      || (state.exam.searchCategory === exam.exCategory
        && (state.exam.searchSubCategory === undefined || state.exam.searchSubCategory === 'all sub-categories' || state.exam.searchSubCategory === exam.exSubcategory))));
};
