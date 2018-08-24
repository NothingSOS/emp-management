import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Icon } from 'semantic-ui-react';
import ConfirmModal from './ConfirmModal';
import './css/ConfirmModal.css';

const ModalBasicExample = ({ open }) => (
  <Modal trigger={<Button>Basic Modal</Button>} basic size="small">
    <Modal.Header icon="archive" content="Save" />
    <Modal.Content>
      <p>
        Your inbox is getting full, would you like us to enable automatic archiving of old messages?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color="red" inverted onClick={() => { console.log(this); }}>
        <Icon name="remove" /> No
      </Button>
      <Button color="green" inverted>
        <Icon name="checkmark" /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
);

const EvaluationModal = ({ header, buttonName, onClose, onClick, submitting, children, confirm, size, disable, onChangePage, navButton, currentPage, totalPage, submit, onSubmit, disableSubmit }) => (
  <Modal
    dimmer="blurring"
    // size="small"
    size={size}
    closeIcon
    open
    onClose={onClose}
  >
    <Modal.Header>
      {header}
    </Modal.Header>
    <Modal.Content>
      {children}
    </Modal.Content>
    <Modal.Actions>
      {navButton ?
        <div className="navDiv">
          <Button className="back" icon="arrow left" color="blue" onClick={() => onChangePage(-1)} />
          <span>Page {currentPage + 1}/{totalPage}</span>
          <Button className="next" icon="arrow right" color="blue" onClick={() => onChangePage(1)} />
        </div> : ''}
      {submit ? <Button disabled={submitting || disable} loading={submitting} onClick={onClick} color="blue"> {disable ? <Icon name="check" fitted style={{ margin: '0 0' }} /> : 'Save'} </Button> : ''}
      <ConfirmModal submitting={submitting} onClickHandle={submit ? onSubmit : onClick} disable={submit ? disableSubmit : disable} buttonName={submit ? 'Send' : 'Save'} submit={submit} />
    </Modal.Actions>
  </Modal>
);
ModalBasicExample.defaultProps = {
  open: true
};
EvaluationModal.defaultProps = {
  buttonName: 'Save',
  disable: false,
  confirm: false,
  size: 'small'
};
//        {submit ? <ConfirmModal submitting={submitting} disable={disableSubmit} onClickHandle={onSubmit} buttonName="Submit"/> : ''}

EvaluationModal.propTypes = {
  header: PropTypes.string.isRequired,
  buttonName: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  confirm: PropTypes.bool,
  disable: PropTypes.bool,
  size: PropTypes.string,
  onChangePage: PropTypes.func.isRequired
};

export default EvaluationModal;
