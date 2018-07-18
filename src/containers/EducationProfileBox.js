import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Icon } from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';
import { openModal } from '../actions/modal';
import { deleteProfileRequest } from '../actions/profile';
import * as modalNames from '../constants/modalNames';

const EducationProfileBox = ({ educationsProfile, onEditClick, onAddClick, onDeleteClick }) => (
  <Segment.Group raised size="large">
    <Segment padded>
      <Grid>
        <Grid.Column>
          <Header as="h2">
            <Icon name="graduation" />
            <Header.Content>
              Education
            </Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column floated="right" computer={1} mobile={2}>
          <Icon name="add" link size="large" onClick={onAddClick} />
        </Grid.Column>
      </Grid>
    </Segment>
    {educationsProfile.map(p => (<ProfileBox
      key={p.id}
      lists={[
        { key: 'universityName', title: 'University', value: p.universityName },
        { key: 'degree', title: 'Degree', value: p.degreeName },
        { key: 'faculty', title: 'Faculty', value: p.facultyName },
        { key: 'major', title: 'Major', value: p.majorName },
        { key: 'program', title: 'Program', value: p.program },
        { key: 'honor', title: 'Honor', value: p.honor },
        { key: 'gpax', title: 'Gpax', value: p.gpax },
        { key: 'graduationDate', title: 'Graduation date', value: p.graduationDate },
      ]}
      onEditClick={() => onEditClick(p.id)}
      onDeleteClick={() => onDeleteClick(p.id)}
    />))}
  </Segment.Group>
);

EducationProfileBox.propTypes = {
  educationsProfile: PropTypes.array.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onEditClick: profileId => dispatch(openModal(modalNames.EDIT_EDUCATION_PROFILE, { id: profileId })),
  onAddClick: () => dispatch(openModal(modalNames.ADD_EDUCATION_PROFILE)),
  onDeleteClick: profileId => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete confirmation',
    description: 'Are you sure to delete this education profile?',
    onConfirm: () => dispatch(deleteProfileRequest('education', profileId))
  }))
});

export default connect(null, mapDispatchToProps)(EducationProfileBox);
