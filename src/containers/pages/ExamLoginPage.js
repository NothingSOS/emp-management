import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Form, Button, Container, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { examLoginRequest } from '../../actions/examAuth';

const ExamLoginPage = ({ dispatch, message }) => {
  let id;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(examLoginRequest({
      id: id.value,
    }));
    id.value = '';
  };

  return (
    <div style={{ backgroundColor: '#5c97b5' }}>
      <Container textAlign="center">
        <Grid.Row centered columns={2}>
          <br />
          <br />
          <br />
          <br />
          <Grid.Column>
            <Icon circular inverted color="teal" name="book" size="massive" />
            <Header as="h1">Take Exam</Header>
          </Grid.Column>
          <br />
          <br />
          <Grid.Column>
            <Segment style={{ width: '30%', margin: 'auto' }} raised>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <br />
                  <label htmlFor="username">
                    <input
                      id="username"
                      placeholder="Username"
                      style={{ borderRadius: '15px' }}
                      ref={(node) => { id = node; }}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  {message !== ' ' && <div style={{ color: 'red' }}><strong>{message}</strong></div>}
                  <br />
                  <Button primary type="submit">Submit</Button>
                </Form.Field>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  message: state.examAuth.message
});

ExamLoginPage.propTypes = {
  message: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

ExamLoginPage.defaultProps = {
  message: ' '
};

export default connect(mapStateToProps, null)(ExamLoginPage);
