export const getVisibilityLeaves = (state) => {
  if (!state.leave.lists) return [];
  if (!state.leave.year && !state.leave.month) return state.leave.lists;
  let visibilityLeave = [...state.leave.lists];
  if (state.leave.year) {
    visibilityLeave = visibilityLeave.filter(leave => new Date(leave.leaveFrom).getFullYear() === state.leave.year);
  }
  if (state.leave.month) {
    visibilityLeave = visibilityLeave.filter(leave => new Date(leave.leaveFrom).getMonth() + 1 === state.leave.month);
  }
  return visibilityLeave;
};
