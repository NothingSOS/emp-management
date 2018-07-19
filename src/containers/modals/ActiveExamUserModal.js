import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal as SUIModal } from 'semantic-ui-react';
import { closeModal } from '../../actions/modal';

class ActiveExamUserModal extends Component {
  render() {
    return (
      <SUIModal
        dimmer="blurring"
        size="large"
        closeIcon
        open
        onClose={this.props.onClose}
      >
        <SUIModal.Header>
          Test
        </SUIModal.Header>
      </SUIModal>);
  }
}

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
});

export default connect(null, mapDispatchToProps)(ActiveExamUserModal);
