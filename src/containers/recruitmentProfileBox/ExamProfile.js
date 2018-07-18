import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Icon } from 'semantic-ui-react';
// import { openModal } from '../../actions/modal';
// import * as modalNames from '../../constants/modalNames';

const ExamProfile = ({ examProfile, onClick }) => (
  <Segment.Group raised size="large">
    <Segment padded>
      <Grid>
        <Grid.Column>
          <Header as="h2">
            Interview & Exam
          </Header>
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment>
      <Grid>
        <Grid.Row divided>
          <Grid.Column width={10}>
            <Header size="small">Interview Time <Icon name="clock" />: {examProfile.interviewTime !== null ? examProfile.interviewTime : '-'}</Header>
            <Header size="small">Interview Date <Icon name="calendar outline" />: {examProfile.interviewDate !== null ? examProfile.interviewDate : '-'}</Header>
            <Header size="small">Exam Time <Icon name="clock" />: {examProfile.examTime !== null ? examProfile.examTime : '-'}</Header>
            <Header size="small">Exam Date <Icon name="calendar outline" />: {examProfile.examDate !== null ? examProfile.examDate : '-'}</Header>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header size="small">Exam : <Icon name="file pdf outline" onClick={() => onClick()} /></Header>
            <Header size="small">Interview Result Note <Icon name="handshake outline" />:
              {
                examProfile.interviewResult !== null ?
                examProfile.interviewResult : '-'
              }
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </Segment.Group>
);

ExamProfile.propTypes = {
  examProfile: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(),
});

export default connect(null, mapDispatchToProps)(ExamProfile);
