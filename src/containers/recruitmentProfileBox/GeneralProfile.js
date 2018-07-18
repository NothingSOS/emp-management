import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Icon } from 'semantic-ui-react';
// import { openModal } from '../../actions/modal';
// import * as modalNames from '../../constants/modalNames';

const imgPart = (element) => {
  let cvSrc = ``;
  let otherSrc1 = ``;
  let otherSrc2 = ``;
  let otherSrc3 = ``;
  let otherSrc4 = ``;
  let otherSrc5 = ``;
  if (element.type === 'cv') {
    cvSrc = `http://localhost:3000/static${element.filePath}${element.fileName}`;
  }
  else if (element.type === 'other1') {
    otherSrc1 = `http://localhost:3000/static${element.filePath}${element.fileName}`;
  }
  else if (element.type === 'other2') {
    otherSrc2 = `http://localhost:3000/static${element.filePath}${element.fileName}`;
  }
  else if (element.type === 'other3') {
    otherSrc3 = `http://localhost:3000/static${element.filePath}${element.fileName}`;
  }
  else if (element.type === 'other4') {
    otherSrc4 = `http://localhost:3000/static${element.filePath}${element.fileName}`;
  }
  else {
    otherSrc5 = `http://localhost:3000/static${element.filePath}${element.fileName}`;
  }
  return (
    <div key={element.fileName}>
      {cvSrc && <a href={cvSrc} rel="noopener noreferrer" target="_blank"><embed src={cvSrc} height="100" width="300" /><br /><Icon name="zoom" />View CV</a>}
      {otherSrc1 && <a href={otherSrc1} rel="noopener noreferrer" target="_blank"><embed src={otherSrc1} height="100" width="300" /><br /><Icon name="zoom" />View Other</a>}
      {otherSrc2 && <a href={otherSrc2} rel="noopener noreferrer" target="_blank"><embed src={otherSrc2} height="100" width="300" /><br /><Icon name="zoom" />View Other</a>}
      {otherSrc3 && <a href={otherSrc3} rel="noopener noreferrer" target="_blank"><embed src={otherSrc3} height="100" width="300" /><br /><Icon name="zoom" />View Other</a>}
      {otherSrc4 && <a href={otherSrc4} rel="noopener noreferrer" target="_blank"><embed src={otherSrc4} height="100" width="300" /><br /><Icon name="zoom" />View Other</a>}
      {otherSrc5 && <a href={otherSrc5} rel="noopener noreferrer" target="_blank"><embed src={otherSrc5} height="100" width="300" /><br /><Icon name="zoom" />View Other</a>}
    </div>
  );
};

const GeneralProfile = ({ generalProfile, files }) => (
  <Segment.Group raised size="large">
    <Segment padded>
      <Grid>
        <Grid.Row style={{ marginLeft: '10px' }}>
          <Header size="huge">{generalProfile.firstName} {generalProfile.lastName} ( {generalProfile.status} )</Header>
        </Grid.Row>
        <Grid.Row style={{ marginLeft: '20px', marginBottom: '5px' }}>
          <Header size="medium">{`${generalProfile.firstNameTh} ${generalProfile.lastNameTh} `}</Header>
        </Grid.Row>
        <hr style={{ width: '100%' }} />
        <Grid.Row divided>
          <Grid.Column width={10}>
            <Header size="small">Citizen ID <Icon name="id card" />:  {generalProfile.citizenId}</Header>
            <Header size="small">Mobile No <Icon name="phone" />: {generalProfile.mobileNumber}</Header>
            <Header size="small">Email <Icon name="mail" />: {generalProfile.email}</Header>
            <Header size="small">Registration Date <Icon name="calendar outline" />: {generalProfile.registrationDate}</Header>
            <Header size="small">Position <Icon name="clipboard" />: {generalProfile.position !== [] ? generalProfile.position.join('/ ') : '-'}</Header>
            <Header size="small">Signed-Position <Icon name="clipboard" />: {generalProfile.signedPosition !== null ? generalProfile.signedPosition : '-'}</Header>
          </Grid.Column>
          <Grid.Column width={6} verticalAlign="middle" >
            {files.map(file => imgPart(file))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </Segment.Group>
);

GeneralProfile.propTypes = {
  generalProfile: PropTypes.object.isRequired,
  files: PropTypes.array.isRequired
  // onEditClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onEditClick: () => dispatch(),
  //   onEditClick: () => dispatch(openModal(modalNames.EDIT_GENERAL_PROFILE)),
});

export default connect(null, mapDispatchToProps)(GeneralProfile);
