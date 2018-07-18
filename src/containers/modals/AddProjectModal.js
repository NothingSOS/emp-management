import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { createProjectRequest } from '../../actions/project';
import Modal from '../../components/Modal';
import AddProjectForm from '../forms/AddProjectForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const AddProjectModal = ({ id, onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add project"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddProjectForm id={id} onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddProjectModal.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addProject')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createProjectRequest, values),
  onClick: () => dispatch(submit('addProject'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectModal);
