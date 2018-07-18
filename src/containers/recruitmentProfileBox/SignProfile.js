import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Icon } from 'semantic-ui-react';

const SignProfile = ({ signProfile }) => (
  <Segment.Group raised size="large">
    <Segment padded>
      <Grid>
        <Grid.Column>
          <Header as="h2">
            Sign-Contract
          </Header>
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment>
      <Grid>
        <Grid.Row divided>
          <Grid.Column width={10}>
            <Header size="small">Sign Time <Icon name="clock" />: {signProfile.signTime !== null ? signProfile.signTime : '-'}</Header>
            <Header size="small">Sign Date <Icon name="calendar outline" />: {signProfile.signDate !== null ? signProfile.signDate : '-'}</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </Segment.Group>
);

SignProfile.propTypes = {
  signProfile: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(),
});

export default connect(null, mapDispatchToProps)(SignProfile);
