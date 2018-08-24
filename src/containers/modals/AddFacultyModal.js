import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import { handleReduxFormSubmit } from '../../utils/helper';
import AddFacultyForm from '../forms/AddFacultyForm';
import { createFacultyRequest } from '../../actions/masterTable';

const AddFacultyModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add Faculty"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddFacultyForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddFacultyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addFaculty')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createFacultyRequest, values),
  onClick: () => dispatch(submit('addFaculty'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFacultyModal);
