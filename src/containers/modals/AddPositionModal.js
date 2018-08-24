import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import { handleReduxFormSubmit } from '../../utils/helper';
import AddPositionForm from '../forms/AddPositionForm';
import { createPositionRequest } from '../../actions/masterTable';

const AddPositionModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add Position"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddPositionForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddPositionModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addPosition')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createPositionRequest, values),
  onClick: () => dispatch(submit('addPosition'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPositionModal);
