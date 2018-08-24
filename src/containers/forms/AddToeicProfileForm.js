import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';

const AddToeicProfileForm = ({ handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="score"
      as={Form.Input}
      component={Input}
      label="Score"
      placeholder="Score"
      disabled={submitting}
    />
    <Field
      name="date"
      as={Form.Input}
      component={Input}
      type="date"
      label="Date"
      placeholder="Date"
      disabled={submitting}
    />
  </Form>
);

AddToeicProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  initialValues: {
    userId: state.profile.userId
  }
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'addToeicProfile'
  })
);

export default enhance(AddToeicProfileForm);
