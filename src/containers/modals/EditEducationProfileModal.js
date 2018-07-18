import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { updateProfileRequest } from '../../actions/profile';
import Modal from '../../components/Modal';
import EditEducationProfileForm from '../forms/EditEducationProfileForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const EditEducationProfileModal = ({ id, onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Edit education profile"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <EditEducationProfileForm id={id} onSubmit={values => onSubmit(values)} />
  </Modal>
);


EditEducationProfileModal.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('editEducationProfile')(state),
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, updateProfileRequest, values, 'editEducationProfile'),
  onClick: () => dispatch(submit('editEducationProfile'))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEducationProfileModal);
