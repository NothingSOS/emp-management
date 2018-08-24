import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { rejectErpRequest } from '../../actions/erpapprove';
import Modal from '../../components/Modal';
import ApproveRejectForm from '../forms/ApproveRejectForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const ApproveRejectModal = ({ id, onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Reject Confirmation"
    buttonName="Reject"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    Please provide rejection note
    <ApproveRejectForm id={id} onSubmit={onSubmit} />
  </Modal>
);

ApproveRejectModal.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('rejectApprove')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, rejectErpRequest, values),
  onClick: () => dispatch(submit('ApproveReject'))
});

export default connect(mapStateToProps, mapDispatchToProps)(ApproveRejectModal);
