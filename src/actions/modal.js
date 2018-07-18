import * as actionTypes from '../constants/actionTypes';

export const openModal = (name, props) => ({
  type: actionTypes.OPEN_MODAL,
  payload: {
    name,
    props
  }
});

export const closeModal = () => ({
  type: actionTypes.CLOSE_MODAL,
});
