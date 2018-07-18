import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Header, Icon } from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';
import { openModal } from '../actions/modal';
import * as modalNames from '../constants/modalNames';

const WorkProfileBox = ({ workProfile, onEditClick }) => {
  const lists = [
    { key: 'levelId', title: 'Level', value: workProfile.levelName },
    { key: 'departmentId', title: 'Department', value: workProfile.departmentName },
    { key: 'positionId', title: 'Position', value: workProfile.positionName },
    { key: 'contractId', title: 'Contract', value: workProfile.contractName },
    { key: 'startDate', title: 'Start date', value: workProfile.startDate },
    { key: 'endDate', title: 'End date', value: workProfile.endDate },
    { key: 'probationDate', title: 'Probation date', value: workProfile.probationDate }
  ];
  return (
    <Segment.Group raised size="large">
      <Segment padded>
        <Header as="h2">
          <Icon name="suitcase" />
          <Header.Content>
            Work
          </Header.Content>
        </Header>
      </Segment>
      <ProfileBox title="Work" icon="suitcase" lists={lists} onEditClick={onEditClick} />
    </Segment.Group>
  );
};

WorkProfileBox.defaultProps = {
  workProfile: null
};

WorkProfileBox.propTypes = {
  workProfile: PropTypes.object,
  onEditClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onEditClick: () => dispatch(openModal(modalNames.EDIT_WORK_PROFILE))
});

export default connect(null, mapDispatchToProps)(WorkProfileBox);
