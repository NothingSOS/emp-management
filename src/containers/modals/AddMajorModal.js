import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import { handleReduxFormSubmit } from '../../utils/helper';
import AddMajorForm from '../forms/AddMajorForm';
import { createMajorRequest } from '../../actions/masterTable';

const AddMajorModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add Major"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddMajorForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddMajorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addMajor')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createMajorRequest, values),
  onClick: () => dispatch(submit('addMajor'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMajorModal);
