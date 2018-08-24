import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon, Modal, Header, Segment, TransitionablePortal } from 'semantic-ui-react';
import { closeModal } from '../actions/modal';
import { clearProbationStore } from '../actions/profile';

class SavedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saved) {
      this.setState({ open: true });
      setTimeout(() => { this.closeModal(); }, 80000);
    }
  }

  openModal() {
    console.log('OPEN');
    this.setState({ open: true });
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Modal onClose={this.closeModal} open={this.state.open} size="mini" style={{ border: 'none', boxShadow: 'none', backgroundColor: 'rgba(255,255,255,0)' }}>
          <Segment textAlign="center">
            <Icon name="save" size="massive" fitted />
          </Segment>
        </Modal>
      </div>
    );
  }
}

SavedModal.propTypes = {
  saved: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  saved: state.profile.saved
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  clear: () => dispatch(clearProbationStore())
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedModal);
