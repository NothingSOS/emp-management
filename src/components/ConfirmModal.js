import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { closeModal } from '../actions/modal';
import { clearProbationStore } from '../actions/profile';

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.confirmed) {
      this.setState({ open: false });
    }
  }

  openModal() {
    this.setState({ open: true });
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        {this.props.button ? <Button disabled={this.props.submitting || this.props.disable} onClick={this.openModal} color={this.props.submit ? 'green' : 'blue'}> {this.props.buttonName} </Button> : <Button color="grey" onClick={() => { this.props.closeModal(); this.props.clear(); }}> Close </Button>}
        <Modal
          size="mini"
          open={this.state.open}
          onClose={this.closeModal}
        >
          <Modal.Header icon="archive" content="Confirmation" />
          <Modal.Content>
            <p>
              {this.props.submit ? <span>Once submitted, you will not be able to edit<br /></span> : ''}
              Are you sure ?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.closeModal}>
              <Icon name="remove" /> No
            </Button>
            <Button onClick={this.props.onClickHandle} color="green" loading={this.props.submitting} disabled={this.props.submitting}>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  button:
    state.accessControl.can.mdSign && ((state.profile.evaInfo && state.profile.evaInfo.mdSignDate) || (state.profile.perfInfo && state.profile.perfInfo.mdSignDate)) ? false :
      state.accessControl.can.supSign && !state.accessControl.can.mdSign && ((state.profile.evaInfo && state.profile.evaInfo.supSignDate) || (state.profile.perfInfo && state.profile.perfInfo.supSignDate)) ? false :
        !(state.accessControl.can.emSign && ((state.profile.evaInfo && state.profile.evaInfo.emSignDate) || (state.profile.perfInfo && state.profile.perfInfo.emSignDate))),
  confirmed: state.profile.confirmed
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  clear: () => dispatch(clearProbationStore())
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
