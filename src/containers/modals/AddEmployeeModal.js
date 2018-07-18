import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import AddEmployeeForm from '../forms/AddEmployeeForm';
import { createEmployeeRequest } from '../../actions/employee';
import { handleReduxFormSubmit } from '../../utils/helper';

const AddEmployeeModal = ({ onClose, onClick, onSubmit }) => (
  <Modal
    header="Add new employee"
    onClose={onClose}
    onClick={onClick}
    submitting={false}
  >
    <AddEmployeeForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddEmployeeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createEmployeeRequest, values),
  onClick: () => dispatch(submit('addEmployee'))
});

export default connect(null, mapDispatchToProps)(AddEmployeeModal);
