import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { createLeaveRequest } from '../../actions/leave';
import Modal from '../../components/Modal';
import CreateLeaveRequestForm from '../forms/CreateLeaveRequestForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const CreateLeaveRequestModal = ({ onClose, onSubmit, onClick, submitting }) => (
  <Modal
    header="Create leave request"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <CreateLeaveRequestForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

CreateLeaveRequestModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('createLeaveRequest')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createLeaveRequest, values, 'createLeaveRequest'),
  onClick: () => dispatch(submit('createLeaveRequest'))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateLeaveRequestModal);
