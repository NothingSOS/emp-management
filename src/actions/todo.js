import * as actionTypes from '../constants/actionTypes';

export const addTodo = todo => ({
  type: actionTypes.ADD_TODO,
  todo
});
