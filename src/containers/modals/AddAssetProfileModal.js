import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { updateProfileRequest } from '../../actions/profile';
import Modal from '../../components/Modal';
import AddAssetProfileForm from '../forms/AddAssetProfileForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const AddAssetProfileModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add certificate profile"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddAssetProfileForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddAssetProfileModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addAssetProfile')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, updateProfileRequest, values, 'addAssetProfile'),
  onClick: () => dispatch(submit('addAssetProfile'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAssetProfileModal);
