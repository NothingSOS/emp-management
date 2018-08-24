import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import { updateProfileRequest, updateProbationStore, clearProbationStore } from '../../actions/profile';
import Modal from '../../components/EvaluationModal';
import A from '../pages/PerformanceReviewForm';
import Loader from '../../components/Loader';


class AddPerformance extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <div>
        {this.props.fetching ? <Loader /> :
        <Modal
          header={!this.props.profile.perfInfo ? 'Create Performance' : 'View Performance'}
          onClose={() => { this.props.onClose(); this.props.clear(); }}
          onClick={() => this.props.onSubmit(this.props.item, (!this.props.profile.perfInfo ? 'addPerformance' : 'updatePerformance'))}
          submitting={this.props.submitting}
          size="large"
          disable={!this.props.edited}
        >
          <A name={this.props.name} test={this.props.onChange} profile={this.props.profile} mode={!this.props.profile.perfInfo || (this.props.can.performanceAdd && !this.props.profile.perfInfo.emSignDate) ? 'edit' : 'view'} role={{ employee: this.props.id === this.props.profile.userId, supervisor: this.props.can.supSign, md: this.props.can.mdSign }} />
        </Modal>
        }
      </div>
    );
  }
}

AddPerformance.defaultProps = {
  submitting: false
};

AddPerformance.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  fetching: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  clear: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  edited: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  can: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  name: state.auth.name,
  id: state.auth.id,
  item: state.profile.item,
  modalName: state.modal.name,
  profile: state.profile,
  submitting: state.profile.submitting,
  edited: state.profile.edited,
  fetching: state.profile.proFetching,
  can: state.accessControl.can
});

const mapDispatchToProps = dispatch => ({
  clear: () => dispatch(clearProbationStore()),
  onClose: () => dispatch(closeModal()),
  onSubmit: (item, type) => (new Promise((resolve, reject) => (
    dispatch(updateProfileRequest(item, resolve, reject, type))
  ))),
  onChange: item => dispatch(updateProbationStore(item, 'performance'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPerformance);
