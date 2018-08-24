import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { updateProfileRequest } from '../../actions/profile';
import Modal from '../../components/Modal';
import AddToeicProfileForm from '../forms/AddToeicProfileForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const AddToeicProfileModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add toeic profile"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddToeicProfileForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddToeicProfileModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addToeicProfile')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, updateProfileRequest, values, 'addToeicProfile'),
  onClick: () => dispatch(submit('addToeicProfile'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToeicProfileModal);
