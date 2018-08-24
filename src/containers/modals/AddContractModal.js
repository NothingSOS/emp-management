import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import { handleReduxFormSubmit } from '../../utils/helper';
import AddContractFrom from '../forms/AddContractForm';
import { createContractRequest } from '../../actions/masterTable';

const AddContractModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add Contract"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddContractFrom onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddContractModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addContract')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createContractRequest, values),
  onClick: () => dispatch(submit('addContract'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddContractModal);
