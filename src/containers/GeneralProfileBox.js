import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Icon } from 'semantic-ui-react';
import { openModal } from '../actions/modal';
import * as modalNames from '../constants/modalNames';
import ProfilePicture from '../components/ProfilePicture';

const stylebox = {
  backgroundSize: 'contain 300px 100px',
  background: 'linear-gradient(to bottom right, DarkCyan  , rgb(92,151,181))',
};

const GeneralProfileBox = ({ image, generalProfile, onEditClick, onProfilePictureClick }) => (
  <Segment.Group raised size="large">
    <Segment padded inverted style={stylebox}>
      <ProfilePicture image={image} onClick={() => onProfilePictureClick(image)} />
    </Segment>
    <Segment padded textAlign="center">
      <Grid>
        <Grid.Column floated="right" computer={1} mobile={2}>
          <Icon name="edit" onClick={onEditClick} link size="large" />
        </Grid.Column>
      </Grid>
      <Header size="huge">{generalProfile.firstName} {generalProfile.lastName} ({generalProfile.nickName})</Header>
      <Header size="small">Citizen ID: {generalProfile.citizenId}</Header>
      <Header size="small">Mobile No: {generalProfile.mobileNumber}</Header>
      <Header size="small">Email: {generalProfile.email}</Header>
      <Header size="small">Facebook: {generalProfile.facebookId}</Header>
      <Header size="small">Line: {generalProfile.lineId}</Header>
    </Segment>
  </Segment.Group>
);

GeneralProfileBox.propTypes = {
  image: PropTypes.string.isRequired,
  generalProfile: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onProfilePictureClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onEditClick: () => dispatch(openModal(modalNames.EDIT_GENERAL_PROFILE)),
  onProfilePictureClick: profilePicture => dispatch(openModal(modalNames.PROFILE_PICTURE, {
    profilePicture
  }))
});

export default connect(null, mapDispatchToProps)(GeneralProfileBox);
