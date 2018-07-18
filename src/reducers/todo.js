import * as actionTypes from '../constants/actionTypes';

const initialState = [];

const todo = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [
        ...state,
        {
          id: (state === initialState ? 0 : state[state.length - 1].id + 1),
          name: action.todo
        }
      ];
    default:
      return state;
  }
};

export default todo;
