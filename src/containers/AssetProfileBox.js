import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Icon } from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';
import { openModal } from '../actions/modal';
import { deleteProfileRequest } from '../actions/profile';
import * as modalNames from '../constants/modalNames';

const AssetProfileBox = ({ assetsProfile, onAddClick, onDeleteClick }) => (
  <Segment.Group raised size="large">
    <Segment padded>
      <Grid>
        <Grid.Column>
          <Header as="h2">
            <Icon name="laptop" />
            <Header.Content>
              Asset
            </Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column floated="right" computer={1} mobile={2}>
          <Icon name="add" link size="large" onClick={onAddClick} />
        </Grid.Column>
      </Grid>
    </Segment>
    {assetsProfile.map(p => (<ProfileBox
      key={p.id}
      lists={[
        { key: 'assetName', title: 'Name', value: p.assetName },
        { key: 'serialNumber', title: 'Serial No.', value: p.serialNumber },
        { key: 'date', title: 'Date', value: p.assetDate },
        { key: 'description', title: 'Description', value: p.description }
      ]}
      onDeleteClick={() => onDeleteClick(p.id)}
    />))}
  </Segment.Group>
);

AssetProfileBox.propTypes = {
  assetsProfile: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onAddClick: id => dispatch(openModal(modalNames.ADD_ASSET_PROFILE, { id })),
  onDeleteClick: profileId => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete confirmation',
    description: 'Are you sure to delete asset profile?',
    onConfirm: () => dispatch(deleteProfileRequest('asset', profileId))
  }))
});

export default connect(null, mapDispatchToProps)(AssetProfileBox);
