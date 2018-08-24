import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Icon } from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';
import { openModal } from '../actions/modal';
import { deleteProfileRequest } from '../actions/profile';
import * as modalNames from '../constants/modalNames';
import Can from './Can';

const CertificateProfileBox = ({ certificatesProfile, onAddClick, onDeleteClick, can }) => (
  <Segment.Group raised size="large">
    <Segment padded>
      <Grid>
        <Grid.Column>
          <Header as="h2">
            <Icon name="certificate" />
            <Header.Content>
              Certificate
            </Header.Content>
          </Header>
        </Grid.Column>
        <Can activity="hasCertificateAdd">
          <Grid.Column floated="right" computer={1} mobile={2}>
            <Icon name="add" link size="large" onClick={onAddClick} />
          </Grid.Column>
        </Can>
      </Grid>
    </Segment>
    {certificatesProfile.map(p => (<ProfileBox
      key={p.id}
      lists={[
        { key: 'name', title: 'Name', value: p.name },
        { key: 'institute', title: 'Institute', value: p.institute },
        { key: 'certificateDate', title: 'Certificate date', value: p.certificateDate },
        { key: 'score', title: 'Score', value: p.score }
      ]}
      onDeleteClick={() => onDeleteClick(p.id)}
      deleted={can.hasCertificateDelete}
    />))}
  </Segment.Group>
);

CertificateProfileBox.propTypes = {
  certificatesProfile: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  can: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  can: state.accessControl.can
});

const mapDispatchToProps = dispatch => ({
  onAddClick: () => dispatch(openModal(modalNames.ADD_CERTIFICATE_PROFILE)),
  onDeleteClick: profileId => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete certification profile ?',
    onConfirm: () => dispatch(deleteProfileRequest('certificates', profileId))
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(CertificateProfileBox);
