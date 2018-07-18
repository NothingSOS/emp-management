import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Image } from 'semantic-ui-react';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';

const ProfilePictureModal = ({ profilePicture, onClick, onClose }) => (
  <Modal
    loading
    header="Profile Picture"
    buttons={[<Input type="file" />]}
    onClick={onClick}
    onClose={onClose}
    submitting={false}
  >
    <Image centered fluid src={profilePicture} />
  </Modal>
);

ProfilePictureModal.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(closeModal()),
  onClose: () => dispatch(closeModal())
});

export default connect(null, mapDispatchToProps)(ProfilePictureModal);
