import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal as SUIModal, Button } from 'semantic-ui-react';

const Modal = ({ header, buttonName, onClose, onClick, submitting, children, confirm, deleted, onDelete }) => (
  <SUIModal
    dimmer="blurring"
    closeIcon
    open
    onClose={onClose}
  >
    <SUIModal.Header>
      {header}
    </SUIModal.Header>
    <SUIModal.Content>
      {children}
    </SUIModal.Content>
    <SUIModal.Actions>
      {deleted && <Button floated="left" color="red" disabled={submitting} onClick={onDelete}>Delete</Button>}
      <Button color="blue" loading={submitting} disabled={submitting} onClick={onClick}>{buttonName}</Button>
      {confirm && <Button loading={submitting} disabled={submitting} onClick={onClose}>No</Button>}
    </SUIModal.Actions>
  </SUIModal>
);

Modal.defaultProps = {
  buttonName: 'Save',
  confirm: false,
  deleted: false,
  onDelete: undefined
};

Modal.propTypes = {
  header: PropTypes.string.isRequired,
  buttonName: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  confirm: PropTypes.bool,
  deleted: PropTypes.bool,
  onDelete: PropTypes.func
};

const mapStateToProps = state => ({
  note: state.form,
});

export default connect(mapStateToProps)(Modal);
