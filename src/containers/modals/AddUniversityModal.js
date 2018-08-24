import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import { handleReduxFormSubmit } from '../../utils/helper';
import AddUniversityForm from '../forms/AddUniversityForm';
import { createUniversityRequest } from '../../actions/masterTable';

const AddUniversityModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add University"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddUniversityForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddUniversityModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addUniversity')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createUniversityRequest, values),
  onClick: () => dispatch(submit('addUniversity'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUniversityModal);
