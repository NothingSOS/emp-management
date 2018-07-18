import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { editExamRequest } from '../../actions/exam';
import Modal from '../../components/Modal';
import EditExamForm from '../forms/EditExamForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const EditExamModal = ({ onClose, onSubmit, onClick, submitting, exams, thisExam }) => (
  <Modal
    header="Edit question"
    buttonName="SAVE"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <EditExamForm exams={exams} thisExam={thisExam} onSubmit={values => onSubmit(values)} />
  </Modal>
);

EditExamModal.propTypes = {
  exams: PropTypes.array.isRequired,
  thisExam: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('editExam')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => ((localStorage.getItem('examQuestion') !== '<p></p>' && localStorage.getItem('examQuestion') !== undefined) ? handleReduxFormSubmit(dispatch, editExamRequest, values, 'editExam') : 'invalid'),
  onClick: () => dispatch(submit('editExam'))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExamModal);
