import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';

const SignupPage = ({ dispatch }) => {
  let id;
  let username;
  let password;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({
      user: {
        id: id.value,
        username: username.value,
        password: password.value
      }
    }));
    id.value = '';
    username.value = '';
    password.value = '';
  };

  return (
    <Grid centered columns={3} verticalAlign="middle" style={{ height: '80vh' }}>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label htmlFor="id">ID
                  <input id="id" placeholder="ID" ref={(node) => { id = node; }} />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="username">Username
                  <input id="username" placeholder="Username" ref={(node) => { username = node; }} />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="password">Password
                  <input id="password" type="password" placeholder="Password" ref={(node) => { password = node; }} />
                </label>
              </Form.Field>
              <Button type="submit">Submit</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

SignupPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(SignupPage);
