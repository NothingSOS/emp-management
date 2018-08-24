import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Icon } from 'semantic-ui-react';
import { openModal } from '../actions/modal';
import * as modalNames from '../constants/modalNames';
import ProfilePicture from '../components/ProfilePicture';
import Can from '../containers/Can';

const stylebox = {
  backgroundSize: 'contain 300px 100px',
  background: 'linear-gradient(to bottom right, DarkCyan  , rgb(92,151,181))',
};

const GeneralProfileBox = ({ generalProfile, onEditClick, onProfilePictureClick, onEditProfilePictureClick, userId, profileId, can }) => (
  <Segment.Group raised size="large">
    <Segment padded inverted style={stylebox}>
      <ProfilePicture
        image={generalProfile.picture}
        onProfilePictureClick={() => onProfilePictureClick(generalProfile.picture)}
        onEditProfilePictureClick={onEditProfilePictureClick}
        editted={can.employeeInfoEditAll || (userId === profileId)}
      />
    </Segment>
    <Segment padded textAlign="center">
      {(userId === profileId || can.employeeInfoEditAll) &&
        <Grid>
          <Grid.Column floated="right" computer={1} mobile={2}>
            <Icon name="edit" onClick={onEditClick} link size="large" />
          </Grid.Column>
        </Grid>}
      <Header size="huge">{generalProfile.firstName} {generalProfile.lastName} ({generalProfile.nickName})<Icon color={generalProfile.gender === 'Male' ? 'blue' : 'pink'} name={generalProfile.gender === 'Male' ? 'mars' : 'venus'} /></Header>
      <Header size="huge">{generalProfile.firstNameTh} {generalProfile.lastNameTh}</Header>
      <Header size="small">ID: {generalProfile.userId}</Header>
      <Can activity="employeeInfoViewAll">
        <Header size="small">Citizen ID: {generalProfile.citizenId}</Header>
      </Can>
      <Can activity="employeeInfoViewAll">
        <Header size="small">Birth date: {moment(generalProfile.birthday).format('DD/MM/YYYY')}</Header>
      </Can>
      <Header size="small">Mobile No: {generalProfile.mobileNumber}</Header>
      <Header size="small">Email: {generalProfile.email}</Header>
      <Header size="small">Facebook: {generalProfile.facebookId}</Header>
      <Header size="small">Line: {generalProfile.lineId}</Header>
    </Segment>
  </Segment.Group>
);

GeneralProfileBox.propTypes = {
  generalProfile: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onProfilePictureClick: PropTypes.func.isRequired,
  onEditProfilePictureClick: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  profileId: PropTypes.number.isRequired,
  can: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.id,
  profileId: state.profile.userId,
  can: state.accessControl.can
});

const mapDispatchToProps = dispatch => ({
  onEditClick: () => dispatch(openModal(modalNames.EDIT_GENERAL_PROFILE)),
  onProfilePictureClick: profilePicture => dispatch(openModal(modalNames.VIEW_PROFILE_PICTURE, {
    profilePicture
  })),
  onEditProfilePictureClick: () => dispatch(openModal(modalNames.EDIT_PROFILE_PICTURE))
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneralProfileBox);
