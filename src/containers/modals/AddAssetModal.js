import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import { handleReduxFormSubmit } from '../../utils/helper';
import AddAssetForm from '../forms/AddAssetForm';
import { createAssetRequest } from '../../actions/masterTable';

const AddAssetModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add Asset"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddAssetForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddAssetModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addAsset')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createAssetRequest, values),
  onClick: () => dispatch(submit('addAsset'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAssetModal);
