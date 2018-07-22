import moment from 'moment';
import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  id: null,
  examList: [],
  currentActivePage: 1,
  activeCategory: '',
  categoryList: [],
  answerList: [],
  progressResult: [],
  saveStatus: ' ',
  testDate: 'YYYY-MM-DD',
  today: '',
};

const TakeExam = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TAKE_EXAM_FETCH_REQUEST:
      return {
        ...state,
        id: action.payload.id,
        isFetching: true,
        examList: [],
        currentActivePage: 1,
        activeCategory: '',
        categoryList: [],
        answerList: [],
        progressResult: [],
        saveStatus: ' '
      };
    case actionTypes.TAKE_EXAM_FETCH_SUCCESS: {
      const initialAnswerList = [];
      // 123
      for (let i = 0; i < action.payload.examList.length; i += 1) {
        initialAnswerList.push({ answer: [], question: action.payload.examList[i].exId });
      }

      return {
        ...state,
        examList: action.payload.examList,
        isFetching: false,
        activeCategory: action.payload.examList[0].exCategory,
        answerList: (state.progressResult === null
          || state.progressResult.length === 0) ?
          initialAnswerList :
          state.progressResult,
        startTime: action.payload.startTime,
        today: moment().format('YYYY-MM-DD'),
      };
    }
    case actionTypes.TAKE_EXAM_FETCH_FAILURE:
      return {
        ...state,
        message: action.payload.message,
        isFetching: false,
      };
    case actionTypes.TAKE_EXAM_FETCH_PROGRESS:
      return {
        ...state,
        progressResult: action.payload.progressResult,
      };
    case actionTypes.TAKE_EXAM_FETCH_CATEGORYLIST:
      return {
        ...state,
        categoryList: action.payload.categoryList,
      };
    case actionTypes.TAKE_EXAM_FETCH_SUB_CATEGORYLIST:
      return {
        ...state,
        subCategoryList: action.payload.subCategoryList,
      };
    case actionTypes.TAKE_EXAM_PAGINATION_CHANGE:
      return {
        ...state,
        currentActivePage: action.payload.value,
      };
    case actionTypes.TAKE_EXAM_ON_PICK_RADIO: {
      // 123
      const tempAns = state.answerList.slice();
      for (let i = 0; i < tempAns.length; i += 1) {
        if (tempAns[i].question === action.payload.exId) {
          tempAns[i].answer = [action.payload.choice];
        }
      }
      return {
        ...state,
        answerList: tempAns
      };
    }
    case actionTypes.TAKE_EXAM_ON_PICK_CHECKBOX: {
      // 123
      const tempAns = state.answerList.slice();
      for (let i = 0; i < tempAns.length; i += 1) {
        if (tempAns[i].question === action.payload.exId) {
          const addChoice = tempAns[i].answer.slice().push(action.payload.choice);
          tempAns[i].answer = [...new Set(addChoice)];
        }
      }
      return {
        ...state,
        answerList: tempAns
      };
    }
    case actionTypes.TAKE_EXAM_ON_INPUT_TEXTAREA: {
      // 123
      const tempAns = [...state.answerList].slice();
      for (let i = 0; i < tempAns.length; i += 1) {
        if (tempAns[i].question === action.payload.exId) {
          tempAns[i].answer = [action.payload.text];
        }
      }
      return {
        ...state,
        answerList: tempAns,
      };
    }
    case actionTypes.TAKE_EXAM_UPLOAD_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.TAKE_EXAM_UPLOAD_SUCCESS: {
      const date = new Date();
      return {
        ...state,
        progress: action.payload.progress,
        isFetching: false,
        saveStatus: ('Save answers complete @ ')
          .concat(date.getHours()).concat(':')
          .concat(date.getMinutes()).concat(':')
          .concat(date.getSeconds())
      };
    }
    case actionTypes.TAKE_EXAM_UPLOAD_FAILURE:
      return {
        ...state,
        message: action.payload.message,
        saveStatus: 'Save answers error !'
      };
    case actionTypes.TAKE_EXAM_CHECK_PROGRESS_REQUEST:
      return {
        ...state,
        // nothing to update state yet
      };
    case actionTypes.TAKE_EXAM_CHECK_PROGRESS_SUCCESS:
      return {
        ...state,
        progressResult: action.payload.progressResult,
      };
    case actionTypes.TAKE_EXAM_CHECK_PROGRESS_FAILURE:
      return {
        ...state,
        message: action.payload.message,
      };
    case actionTypes.TAKE_EXAM_CATEGORY_CHANGE:
      return {
        ...state,
        currentActivePage: 1,
        activeCategory: action.payload.category,
      };
    case actionTypes.TAKE_EXAM_FINISH_EXAM_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.TAKE_EXAM_FINISH_EXAM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        id: null,
        examList: [],
        currentActivePage: 1,
        activeCategory: '',
        categoryList: [],
        // 123
        answerList: [],
        progressResult: [],
        saveStatus: ' ',
      };
    case actionTypes.TAKE_EXAM_FINISH_EXAM_FAILURE:
      return {
        ...state,
        message: action.payload.message,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default TakeExam;
