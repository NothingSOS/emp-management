import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';

const ConfirmModal = ({ onClose, onConfirm, header, description }) => (
  <Modal
    header={header}
    onClose={onClose}
    onClick={onConfirm}
    submitting={false}
    buttonName="Yes"
    confirm
  >
    <p>{description}</p>
  </Modal>
);

ConfirmModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
});

export default connect(null, mapDispatchToProps)(ConfirmModal);
