import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { updateProfileRequest } from '../../actions/profile';
import Modal from '../../components/Modal';
import EditGeneralProfileForm from '../forms/EditGeneralProfileForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const EditGeneralProfileModal = ({ onClose, onSubmit, onClick, submitting }) => (
  <Modal
    header="Edit general profile"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <EditGeneralProfileForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

EditGeneralProfileModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('editGeneralProfile')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, updateProfileRequest, values, 'editGeneralProfile'),
  onClick: () => dispatch(submit('editGeneralProfile'))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGeneralProfileModal);
