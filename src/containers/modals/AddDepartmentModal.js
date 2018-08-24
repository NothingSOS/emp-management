import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import { handleReduxFormSubmit } from '../../utils/helper';
import AddDepartmentForm from '../forms/AddDepartmentForm';
import { createDepartmentRequest } from '../../actions/masterTable';

const AddDepartmentModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add Department"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddDepartmentForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddDepartmentModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addDepartment')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createDepartmentRequest, values),
  onClick: () => dispatch(submit('addDepartment'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDepartmentModal);
