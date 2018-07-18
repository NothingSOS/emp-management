import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { updateProfileRequest } from '../../actions/profile';
import Modal from '../../components/Modal';
import AddCertificateProfileForm from '../forms/AddCertificateProfileForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const AddCertificateProfileModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add certificate profile"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddCertificateProfileForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddCertificateProfileModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addCertificateProfile')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, updateProfileRequest, values, 'addCertificateProfile'),
  onClick: () => dispatch(submit('addCertificateProfile'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCertificateProfileModal);
