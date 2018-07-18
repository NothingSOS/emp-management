import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';
import { getCertificateProfile } from '../../selectors/profile';

const validate = (values) => {
  const errors = {};
  errors.startDate = validator.required(values.startDate);
  errors.endDate = validator.required(values.endDate);
  return errors;
};

const EditCertificateProfileForm = ({ handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="name" as={Form.Select} component={Input} label="University" placeholder="University" disabled={submitting} />
    <Field name="institute" as={Form.Select} component={Input} label="Degree" placeholder="Degree" disabled={submitting} />
    <Field name="description" as={Form.Select} component={Input} label="Faculty" placeholder="Faculty" disabled={submitting} />
  </Form>
);

EditCertificateProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = (state, { id }) => ({
  initialValues: {
    name: getCertificateProfile(state, id).name,
    institute: getCertificateProfile(state, id).institute,
    description: getCertificateProfile(state, id).description,
  }
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'editEducationProfile',
    validate
  })
);

export default enhance(EditCertificateProfileForm);
