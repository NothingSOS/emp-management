import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  data: [],
  activeItem: 'All',
  searchText: '',
  direction: 'ascending',
  sortKey: 'status',
  checkStatus: {},
  date: '',
  time: '',
  positions: [],
  signedPosition: {},
  isUseDate: false,
  buttonLoad: false,
};

const Recruitment = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECRUITMENT_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.RECRUITMENT_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.data,
      };
    case actionTypes.RECRUITMENT_FETCH_FAILURE:
      return {
        ...state,
        isFetching: true,
        messege: action.payload.messege,
      };
    case actionTypes.RECRUITMENT_FETCH_POSITION_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.RECRUITMENT_FETCH_POSITION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        positions: action.payload.data.map(position => position.name),
      };
    case actionTypes.RECRUITMENT_FETCH_POSITION_FAILURE:
      return {
        ...state,
        isFetching: true,
        messege: action.payload.messege,
      };
    case actionTypes.RECRUITMENT_CHANGE_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.payload.activeItem,
        checkStatus: {},
        date: '',
        time: '',
        searchText: '',
        isUseDate: false,
      };
    case actionTypes.FILTER_RECRUITMENT:
      return {
        ...state,
        searchText: action.payload.searchText
      };
    case actionTypes.SORT_RECRUITMENT:
      return {
        ...state,
        sortKey: action.payload.sortKey,
        direction: action.payload.direction
      };
    case actionTypes.CHECK_RECRUITMENT_STATUS:
      return {
        ...state,
      };

    case actionTypes.CHANGE_RECRUITMENT_STATUS: {
      let isThatStatus = false;
      const listKey = Object.keys(state.checkStatus);
      listKey.forEach((item) => {
        if (state.checkStatus[item] === 'Approve' || state.checkStatus[item] === 'Sign Contract' || state.checkStatus[item] === 'Complete' || state.checkStatus[item] === 'Interview' || state.checkStatus[item] === 'Exam') {
          if (!(item === action.payload.key && action.payload.status === state.checkStatus[action.payload.key])) {
            isThatStatus = true;
          }
        }
      });
      if (action.payload.status === state.checkStatus[action.payload.key]) {
        if (isThatStatus) {
          return {
            ...state,
            isUseDate: true,
            checkStatus: {
              ...state.checkStatus,
              [action.payload.key]: '',
            }
          };
        }
        return {
          ...state,
          isUseDate: false,
          checkStatus: {
            ...state.checkStatus,
            [action.payload.key]: '',
          }
        };
      }
      return {
        ...state,
        isUseDate: (isThatStatus && !(state.checkStatus[action.payload.key] === 'Approve' || state.checkStatus[action.payload.key] === 'Sign Contract' || state.checkStatus[action.payload.key] === 'Complete' || state.checkStatus[action.payload.key] === 'Interview' || state.checkStatus[action.payload.key] === 'Exam')) || (action.payload.status === 'Approve' || action.payload.status === 'Sign Contract' || action.payload.status === 'Complete' || action.payload.status === 'Interview' || action.payload.status === 'Exam'),
        checkStatus: {
          ...state.checkStatus,
          [action.payload.key]: action.payload.status,
        }
      };
    }
    case actionTypes.RECRUITMENT_SET_SELECT_POSITION:
      return {
        ...state,
        signedPosition: {
          ...state.signedPosition,
          [action.payload.key]: action.payload.value,
        }
      };
    case actionTypes.CLEAR_CHECKSTATUS:
      return {
        ...state,
        checkStatus: {},
        isUseDate: false,
      };
    case actionTypes.CLEAR_POSITION:
      return {
        ...state,
        position: {},
        signedPosition: {},
      };
    case actionTypes.CLEAR_DATETIME:
      return {
        ...state,
        date: '',
        time: '',
      };
    case actionTypes.RECRUITMENT_CREATE_REQUEST:
      return {
        ...state,
        form: action.payload.form
      };
    case actionTypes.RECRUITMENT_CREATE_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case actionTypes.RECRUITMENT_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.RECRUITMENT_UPDATE_INTERVIEW_DATETIME_REQUEST:
    case actionTypes.RECRUITMENT_UPDATE_EXAM_DATETIME_REQUEST:
    case actionTypes.RECRUITMENT_UPDATE_SIGN_DATETIME_REQUEST:
    case actionTypes.RECRUITMENT_UPDATE_COMPLETE_DATETIME_REQUEST:
    case actionTypes.RECRUITMENT_UPDATE_REJECT_DATE_REQUEST:
    case actionTypes.RECRUITMENT_UPDATE_CANCEL_DATE_REQUEST:
    case actionTypes.RECRUITMENT_UPDATE_BLACKLIST_DATE_REQUEST:
      return {
        ...state,
      };
    case actionTypes.RECRUITMENT_UPDATE_INTERVIEW_DATETIME_SUCCESS:
    case actionTypes.RECRUITMENT_UPDATE_EXAM_DATETIME_SUCCESS:
    case actionTypes.RECRUITMENT_UPDATE_SIGN_DATETIME_SUCCESS:
    case actionTypes.RECRUITMENT_UPDATE_COMPLETE_DATETIME_SUCCESS:
    case actionTypes.RECRUITMENT_UPDATE_REJECT_DATE_SUCCESS:
    case actionTypes.RECRUITMENT_UPDATE_CANCEL_DATE_SUCCESS:
    case actionTypes.RECRUITMENT_UPDATE_BLACKLIST_DATE_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case actionTypes.RECRUITMENT_UPDATE_INTERVIEW_DATETIME_FAILURE:
    case actionTypes.RECRUITMENT_UPDATE_EXAM_DATETIME_FAILURE:
    case actionTypes.RECRUITMENT_UPDATE_SIGN_DATETIME_FAILURE:
    case actionTypes.RECRUITMENT_UPDATE_COMPLETE_DATETIME_FAILURE:
    case actionTypes.RECRUITMENT_UPDATE_REJECT_DATE_FAILURE:
    case actionTypes.RECRUITMENT_UPDATE_CANCEL_DATE_FAILURE:
    case actionTypes.RECRUITMENT_UPDATE_BLACKLIST_DATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.RECRUITMENT_UPDATE_NOTE_REQUEST:
      return {
        ...state,
        note: action.payload.values
      };
    case actionTypes.RECRUITMENT_UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case actionTypes.RECRUITMENT_UPDATE_NOTE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.RECRUITMENT_UPDATE_INTERVIEW_RESULT_REQUEST:
      return {
        ...state,
        note: action.payload.values
      };
    case actionTypes.RECRUITMENT_UPDATE_INTERVIEW_RESULT_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case actionTypes.RECRUITMENT_UPDATE_INTERVIEW_RESULT_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.RECRUITMENT_SETDATE:
      return {
        ...state,
        date: action.payload.value
      };
    case actionTypes.RECRUITMENT_SETTIME:
      return {
        ...state,
        time: action.payload.value
      };
    case actionTypes.RECRUITMENT_UPDATE_SIGNED_POSITION_REQUEST:
      return {
        ...state,
        position: action.payload.form
      };
    case actionTypes.RECRUITMENT_UPDATE_SIGNED_POSITION_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case actionTypes.RECRUITMENT_UPDATE_SIGNED_POSITION_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.RECRUITMENT_SET_UP_MODAL:
      return {
        ...state,
        buttonLoad: true
      };
    case actionTypes.RECRUITMENT_SET_UP_MODAL_COMPLETE:
      return {
        ...state,
        buttonLoad: false,
        dataModal: action.payload.data,
        modalSubmit: false
      };
    case actionTypes.RECRUITMENT_ACTIVATE_EXAM_USER_REQUEST:
      return {
        ...state,
        modalSubmit: true
      };
    case actionTypes.RECRUITMENT_ACTIVATE_EXAM_USER_SUCCESS:
      return {
        ...state,
        modalSubmit: false
      };
    default:
      return state;
  }
};

export default Recruitment;
