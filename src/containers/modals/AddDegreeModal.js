import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import { handleReduxFormSubmit } from '../../utils/helper';
import AddDegreeForm from '../forms/AddDegreeForm';
import { createDegreeRequest } from '../../actions/masterTable';

const AddDegreeModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add Degree"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddDegreeForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddDegreeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addDegree')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createDegreeRequest, values),
  onClick: () => dispatch(submit('addDegree'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDegreeModal);
