import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Icon } from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';
import { openModal } from '../actions/modal';
import { deleteProfileRequest } from '../actions/profile';
import * as modalNames from '../constants/modalNames';
import Can from './Can';

const ToeicProfileBox = ({ toeicsProfile, onAddClick, onDeleteClick, can }) => (
  <Segment.Group raised size="large">
    <Segment padded>
      <Grid>
        <Grid.Column>
          <Header as="h2">
            <Icon name="flag" />
            <Header.Content>
              Toeic
            </Header.Content>
          </Header>
        </Grid.Column>
        <Can activity="toeicAdd">
          <Grid.Column floated="right" computer={1} mobile={2}>
            <Icon name="add" link size="large" onClick={onAddClick} />
          </Grid.Column>
        </Can>
      </Grid>
    </Segment>
    {toeicsProfile.map(p => (<ProfileBox
      key={p.id}
      lists={[
        { key: 'score', title: 'Score', value: p.score },
        { key: 'date', title: 'Date', value: p.date }
      ]}
      onDeleteClick={() => onDeleteClick(p.id)}
      deleted={can.toeicDelete}
    />))}
  </Segment.Group>
);

ToeicProfileBox.propTypes = {
  toeicsProfile: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  can: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  can: state.accessControl.can
});

const mapDispatchToProps = dispatch => ({
  onAddClick: () => dispatch(openModal(modalNames.ADD_TOEIC_PROFILE)),
  onDeleteClick: profileId => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete toeic profile ?',
    onConfirm: () => dispatch(deleteProfileRequest('toeics', profileId))
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToeicProfileBox);
