import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import { handleReduxFormSubmit } from '../../utils/helper';
import AddLevelForm from '../forms/AddLevelForm';
import { createLevelRequest } from '../../actions/masterTable';

const AddLevelModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add Level"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddLevelForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddLevelModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addLevel')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createLevelRequest, values),
  onClick: () => dispatch(submit('addLevel'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLevelModal);
