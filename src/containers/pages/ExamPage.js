import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchExamRequest, filterExams, deleteExamRequest } from '../../actions/exam';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Exam from '../../components/Exam';
import Loader from '../../components/Loader';
import { getVisibleExams } from '../../selectors/exam';

const ExamPage = ({ isFetching, onAddClick, onDeleteClick, onEditClick, onViewClick, onFilterChange, exams, examsFilter }) => (
  <div>
    {
      isFetching
        ? <Loader />
        : <Exam
          onAddClick={() => onAddClick(exams)}
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
          onFilterChange={onFilterChange}
          exams={exams}
          examsFilter={examsFilter}
          onViewClick={onViewClick}
        />
    }
  </div>
);

ExamPage.defaultProps = {
  isFetching: true
};

ExamPage.propTypes = {
  isFetching: PropTypes.bool,
  onAddClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onViewClick: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  exams: PropTypes.array.isRequired,
  examsFilter: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.exam.isFetching,
  exams: state.exam.lists,
  examsFilter: getVisibleExams(state)
});
const mapDispatchToProps = dispatch => ({
  fetchExam: () => dispatch(fetchExamRequest()),
  onFilterChange: (key, value) => dispatch(filterExams(key, value)),
  onAddClick: exams => dispatch(openModal(modalNames.ADD_NEW_EXAM, { exams })),
  onViewClick: thisExam => dispatch(openModal(modalNames.VIEW_EXAM, { thisExam })),
  onDeleteClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete question',
    description: 'Are you sure to delete this question ?',
    onConfirm: () => dispatch(deleteExamRequest({ id }), window.location.reload())
  })),
  onEditClick: (exams, thisExam) => dispatch(openModal(modalNames.EDIT_EXAM, { exams, thisExam }))
});
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchExam } = this.props;
      fetchExam();
    }
  })
);
export default enhance(ExamPage);

