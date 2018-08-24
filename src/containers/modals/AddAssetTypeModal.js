import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import { handleReduxFormSubmit } from '../../utils/helper';
import AddAssetTypeForm from '../forms/AddAssetTypeForm';
import { createAssetTypeRequest } from '../../actions/masterTable';

const AddAssetTypeModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add Asset Type"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddAssetTypeForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddAssetTypeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addAssetType')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createAssetTypeRequest, values),
  onClick: () => dispatch(submit('addAssetType'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAssetTypeModal);
