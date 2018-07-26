import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import {
  fetchTakeExamRequest,
  pageChange,
  onPickRadioAnswer,
  onPickCheckboxAnswer,
  onInputTextAreaAnswer,
  uploadAnswerListRequest,
  categoryChange,
} from '../../actions/takeExam';
import TakeExam from '../../components/TakeExam';
import Loader from '../../components/Loader';

const TakeExamPage = ({
  isFetching,
  examList,
  currentActivePage,
  onPageChange,
  activeCategory,
  pickedAnswer,
  answerList,
  onClickRadio,
  onClickCheckbox,
  onInputTextArea,
  onClickSave,
  onClickSubmit,
  id,
  onClickCategory,
  categoryList,
  saveStatus,
  startTime,
  onClickLogout,
  agreementStatus,
  rowId, }) =>
  ((agreementStatus === 'NotRead')
    ? <Redirect
      to={{
        pathname: '/takeexam_agreement'
      }}
    />
    : (isFetching ?
      <Loader /> :
      <div>
        <TakeExam
          examList={examList}
          currentActivePage={currentActivePage}
          onPageChange={onPageChange}
          activeCategory={activeCategory}
          pickedAnswer={pickedAnswer}
          answerList={answerList}
          onClickRadio={onClickRadio}
          onClickCheckbox={onClickCheckbox}
          onInputTextArea={onInputTextArea}
          onClickSave={onClickSave}
          onClickSubmit={onClickSubmit}
          rowId={rowId}
          id={id}
          onClickCategory={onClickCategory}
          categoryList={categoryList}
          saveStatus={saveStatus}
          startTime={startTime}
          onClickLogout={onClickLogout}
        />
      </div>)
  );

TakeExamPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  examList: PropTypes.array.isRequired,
  currentActivePage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
  pickedAnswer: PropTypes.array.isRequired,
  answerList: PropTypes.array.isRequired,
  onClickRadio: PropTypes.func.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
  onInputTextArea: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onClickSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  onClickCategory: PropTypes.func.isRequired,
  categoryList: PropTypes.array.isRequired,
  saveStatus: PropTypes.string.isRequired,
  startTime: PropTypes.instanceOf(moment).isRequired,
  onClickLogout: PropTypes.func.isRequired,
  agreementStatus: PropTypes.string.isRequired,
  rowId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.takeExam.isFetching,
  examList: state.takeExam.examList,
  currentActivePage: state.takeExam.currentActivePage,
  activeCategory: state.takeExam.activeCategory,
  subCategoryTitle: state.takeExam.subCategoryTitle,
  pickedAnswer: state.takeExam.pickedAnswer,
  answerList: state.takeExam.answerList,
  id: state.examAuth.id,
  categoryList: state.takeExam.categoryList,
  saveStatus: state.takeExam.saveStatus,
  startTime: state.takeExam.startTime,
  agreementStatus: state.examAuth.agreementStatus,
  rowId: state.takeExam.rowId,
});

const mapDispatchToProps = dispatch => ({
  fetchTakeExam: id => dispatch(fetchTakeExamRequest(id)),
  onPageChange: value => dispatch(pageChange(value)),
  onClickRadio: (choice, currentActivePage, pickedAnswer, exId) => dispatch(onPickRadioAnswer(choice, currentActivePage, pickedAnswer, exId)),
  onClickCheckbox: (choice, currentActivePage, pickedAnswer, exId) => dispatch(onPickCheckboxAnswer(choice, currentActivePage, pickedAnswer, exId)),
  onInputTextArea: (text, currentActivePage, exId) => dispatch(onInputTextAreaAnswer(text, currentActivePage, exId)),
  onClickCategory: category => dispatch(categoryChange(category)),
  onClickSave: (rowId, answerList, id) => dispatch(uploadAnswerListRequest(rowId, answerList, false, false, id)),
  onClickSubmit: (rowId, answerList, id) => dispatch(uploadAnswerListRequest(rowId, answerList, false, true, id)),
  onClickLogout: (rowId, answerList, id) => dispatch(uploadAnswerListRequest(rowId, answerList, true, false, id)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchTakeExam, id } = this.props;
      fetchTakeExam(id);
    }
  })
);

export default enhance(TakeExamPage);
