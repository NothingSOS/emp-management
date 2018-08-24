import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import { handleReduxFormSubmit } from '../../utils/helper';
import AddCertificateForm from '../forms/AddCertificateForm';
import { createCertificateRequest } from '../../actions/masterTable';

const AddCertificateModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add Certificate"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddCertificateForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddCertificateModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addCertificate')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createCertificateRequest, values),
  onClick: () => dispatch(submit('addCertificate'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCertificateModal);
