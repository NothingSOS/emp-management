import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import { updateProfileRequest, updateProbationStore, clearProbationStore } from '../../actions/profile';
import Modal from '../../components/EvaluationModal';
import A from '../pages/ProbationForm';
import Loader from '../../components/Loader';

class AddProbation extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.type = (this.props.profile.evaInfo == null ? 'addProbation' : 'updateProbation');
  }
  render() {
    return (
      <div>
        {this.props.fetching ? <Loader /> :
        <Modal
          header={this.props.profile.evaInfo == null ? 'Create Probation' : 'View Probation'}
          onClose={() => { this.props.onClose(); this.props.clear(); }}
          onClick={() => this.props.onSubmit(this.props.item, (this.props.profile.evaInfo == null ? 'addProbation' : 'updateProbation'))}
          submitting={this.props.submitting}
          size="large"
          disable={!this.props.edited}
        >
          <A
            name={this.props.name}
            test={this.props.onChange}
            profile={this.props.profile}
            mode={!this.props.profile.evaInfo || (this.props.can.probationAdd && !this.props.profile.evaInfo.emSignDate) ? 'edit' : 'view'}
            role={{ employee: this.props.id === this.props.profile.userId, supervisor: this.props.can.supSign, md: this.props.can.mdSign }}
          />
        </Modal>
        }
      </div>
    );
  }
}

AddProbation.defaultProps = {
  submitting: false,
};

AddProbation.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  profile: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  clear: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  can: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  edited: PropTypes.bool.isRequired
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
  onChange: item => dispatch(updateProbationStore(item, 'probation'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProbation);
